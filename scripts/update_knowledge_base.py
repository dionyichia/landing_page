import json
import os
import dotenv
from openai import OpenAI
from notion_client import Client
import hashlib

dotenv.load_dotenv()

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
notion = Client(auth=os.environ["NOTION_TOKEN"])

DB_ID = '2d30de09c096810a8ad4cf85991c5104'

INPUT = "scripts/raw_inputs.json"
OUTPUT = "src/knowledge/notion_embeddings.json"

MODEL = "text-embedding-3-small"

TEXT_BLOCK_TYPES = {
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "to_do",
    "callout",
    "toggle",
    "code",
}

HEADINGS = {"heading_1", "heading_2", "heading_3"}
LISTS = {"bulleted_list_item","numbered_list_item"}

MAX_TOKENS = 350 # Max chunk size

def extract_text_from_block(block: dict) -> tuple[str, str, str]:
    block_type = block["type"]

    # Skip images
    if block_type not in TEXT_BLOCK_TYPES:
        return "", "", ""
    
    rich_text = block[block_type].get("rich_text", [])
    text = "".join(rt["plain_text"] for rt in rich_text)

    if block_type in HEADINGS:
        return text, block_type, ""

    if block_type == "paragraph":
        return "", "", text

    # If it not a paragraph on its own, add to previous, i.e. combine all list items, quotes and every thing else into 1 paragraph
    return "", block_type, text

# Helper to flush paragraph into chunks array
def flush_paragraph(buffer, buffer_block_ids, header_stack):
    if not buffer:
        return None

    header_path = " > ".join(h for _, h in header_stack)

    return {
        "chunk_id": ":".join(buffer_block_ids),
        "text": f"{header_path}\n" + " ".join(buffer),
        "headers": header_path
    }

def update_header_stack(header_stack, level, text):
    while header_stack and header_stack[-1][0] >= level:
        header_stack.pop()
    header_stack.append((level, text))

def estimate_tokens(text: str) -> int:
    return max(1, len(text) // 4)

def get_all_text_from_page(page_id: str, page_title: str = "Untitled Page", header_stack: list = None) -> list[dict]:
    chunks = []
    buffer = []
    buffer_block_ids = []
    buffer_tokens = 0

    if header_stack is None:
        header_stack = [(0, page_title)]

    blocks = list_all_block_children(page_id)

    for block in blocks:
        header, block_type, text = extract_text_from_block(block)

        # Chunk by header: If it is a header, flush buffer, update the last header 
        if header:
            # Update header stack
            if buffer:
                chunk = flush_paragraph(buffer, buffer_block_ids, header_stack)
                if chunk:
                    chunks.append(chunk)
                buffer, buffer_block_ids, buffer_tokens = [], [], 0

            header_level = int(block_type.split('_')[1])  # e.g. 1, 2, 3
            update_header_stack(header_stack, header_level, header)
            continue

        # If text not empty
        if text.strip():
            buffer.append(text)
            buffer_block_ids.append(block["id"])
            buffer_tokens += estimate_tokens(text)
        
        # SIZE-based flush
        if buffer_tokens >= MAX_TOKENS:
            chunk = flush_paragraph(buffer, buffer_block_ids, header_stack)
            if chunk:
                chunks.append(chunk)
            buffer, buffer_block_ids, buffer_tokens = [], [], 0

        # recurse if this block has children
        if block.get("has_children"):            
            child_chunks = get_all_text_from_page(block["id"], header_stack=header_stack)
            chunks.extend(child_chunks)

    if buffer:
        chunk = flush_paragraph(buffer, buffer_block_ids, header_stack)
        if chunk:
            chunks.append(chunk)

    return chunks

def list_all_block_children(block_id: str):
    blocks = []
    cursor = None

    while True:
        resp = notion.blocks.children.list(
            block_id=block_id,
            start_cursor=cursor,
            page_size=100
        )

        blocks.extend(resp["results"])

        if not resp["has_more"]:
            break
        cursor = resp["next_cursor"]

    return blocks

def get_primary_data_source_id(database_id: str) -> str:
    resp = notion.databases.retrieve(database_id=database_id)

    data_sources = resp.get("data_sources", [])
    if not data_sources:
        raise RuntimeError("No data sources found for this database")

    return data_sources[0]["id"]

def query_all_pages(data_source_id: str):
    pages = []
    cursor = None

    while True:
        resp = notion.data_sources.query(
            data_source_id=data_source_id,
            start_cursor=cursor,
            page_size=100,
        )

        pages.extend(resp["results"])

        if not resp["has_more"]:
            break
        cursor = resp["next_cursor"]

    return pages

def build_raw_corpus(database_id: str):
    corpus = []

    data_source_id = get_primary_data_source_id(database_id)
    pages = query_all_pages(data_source_id)

    for page in pages:
        page_id = page["id"]

        title = (
            page["properties"]["Name"]["title"][0]["plain_text"]
            if page["properties"]["Name"]["title"]
            else "Untitled"
        )

        print(f"Reading page: {title}")

        # List of dictionary of text blocks
        page_text = get_all_text_from_page(page_id=page_id, page_title=title)

        corpus.append({
            "page_id": page_id,
            "title": title,
            "text": page_text,
        })

    return corpus

def embed_text(text: str):
    return client.embeddings.create(
        model=MODEL,
        input=text
    ).data[0].embedding

def hash_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

def main():

    # Load old embeddings
    try:
        with open(OUTPUT) as f:
            old_data = json.load(f)
            old_chunks = {c["chunk_id"]: c for c in old_data}
    except: 
        old_chunks = {}

    output = []
    corpus = build_raw_corpus(DB_ID)

    for page in corpus:
        for chunk in page["text"]:

            # If chunk is an empty string
            if not chunk["text"]:
                continue

            # Check if chunk exists in old_chunk
            # print(f"Checking: {chunk['chunk_id']}")
            # print(chunk["text"])
            hashed_text = hash_text(text=chunk["text"])
            old_chunk = old_chunks.get(chunk["chunk_id"], "")

            # reuse old embedding
            if old_chunk and old_chunk["text_hash"] == hashed_text:
                # print("Chunk exists and unchanged: Skipping Embed")
                embedding = old_chunk["embedding"]

            else:
                # print("No chunk found or changed")
                embedding = embed_text(chunk["text"])

            output.append({
                "chunk_id": chunk["chunk_id"],
                "title": page["title"],
                "text": chunk["text"],
                "embedding": embedding,
                "text_hash": hashed_text,
            })

    with open(OUTPUT, "w") as f:
        json.dump(output, f, indent=4)

    print(f" Wrote {len(output)} embeddings to {OUTPUT}")

if __name__ == "__main__":
    main()
