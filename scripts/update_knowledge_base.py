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

def extract_text_from_block(block: dict) -> tuple[str, str, str]:
    block_type = block["type"]

    # Skip images
    if block_type not in TEXT_BLOCK_TYPES:
        return "", "", ""
    
    rich_text = block[block_type].get("rich_text", [])
    text = "".join(rt["plain_text"] for rt in rich_text)

    if block_type in HEADINGS:
        return text, "", ""

    if block_type == "paragraph":
        return "", "", text

    # If it not a paragraph on its own, add to previous, i.e. combine all list items, quotes and every thing else into 1 paragraph
    return "", block_type, text

# Helper to flush paragraph into all_text_chunks_in_page array
def flush_paragraph(cur_para, cur_para_block_ids, header):
       if not cur_para:
           return None
       return {
           "chunk_id": ":".join(cur_para_block_ids),
           "text": f"{header}\n" + " ".join(cur_para)
       }

def get_all_text_from_page(page_id: str, most_recent_header="Root") -> list[str]:
    all_text_chunks_in_page = []
    cur_para = []
    cur_para_block_ids = []
    blocks = list_all_block_children(page_id)

    for block in blocks:
        header, block_type, text = extract_text_from_block(block)

        # If it is a header, update the last header 
        if header:
            # flush previous paragraph
            if cur_para:
                all_text_chunks_in_page.append(flush_paragraph(cur_para=cur_para, cur_para_block_ids=cur_para_block_ids, header=most_recent_header))
        
                cur_para = []
                cur_para_block_ids = []

            most_recent_header = header
        else:
            # If text not empty
            if text.strip():
                # If it is not a paragraph block, cache text
                if block_type:
                    cur_para.append(text)
                    cur_para_block_ids.append(block["id"])
                    continue
                
                # If it is a para block and prev cache not empty, flush cache
                elif cur_para: 
                    all_text_chunks_in_page.append(flush_paragraph(cur_para=cur_para, cur_para_block_ids=cur_para_block_ids, header=most_recent_header))
                    
                    cur_para = []
                    cur_para_block_ids = []


                all_text_chunks_in_page.append({
                    "chunk_id": block["id"],
                    "text": f"{most_recent_header}\n{text}"
                    })

        # recurse if this block has children
        if block.get("has_children"):
            all_text_chunks_in_page.extend(get_all_text_from_page(block["id"], most_recent_header=most_recent_header))

    if cur_para:
        all_text_chunks_in_page.append(flush_paragraph(cur_para=cur_para, cur_para_block_ids=cur_para_block_ids, header=most_recent_header))
        
        cur_para = []
        cur_para_block_ids = []

    return all_text_chunks_in_page

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
        page_text = get_all_text_from_page(page_id=page_id, most_recent_header=title)

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

            # Check if chunk exists in old_chunk
            # print(f"Checking: {chunk['chunk_id']}")
            hashed_text = hash_text(text=chunk["text"])
            old_chunk = old_chunks.get(chunk["chunk_id"], "")

            # reuse old embedding
            if old_chunk and old_chunk["text_hash"] == hashed_text:
                # print("Chunk exists and unchanged: Skipping Embed")
                embedding = old_chunk["embedding"]

            else:
                # print("No chunk found or changed")
                embedding = embed_text(chunk)

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
