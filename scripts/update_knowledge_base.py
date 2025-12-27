import json
import os
import dotenv
from openai import OpenAI
from notion_client import Client

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

def extract_text_from_block(block: dict) -> str:
    block_type = block["type"]

    if block_type not in TEXT_BLOCK_TYPES:
        return ""

    rich_text = block[block_type].get("rich_text", [])
    return "".join(rt["plain_text"] for rt in rich_text)

def get_all_text_from_block(block_id: str) -> list[str]:
    texts = []
    blocks = list_all_block_children(block_id)

    for block in blocks:
        text = extract_text_from_block(block)
        if text.strip():
            texts.append(text)

        # recurse if this block has children
        if block.get("has_children"):
            texts.extend(get_all_text_from_block(block["id"]))

    return texts

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

        page_text = get_all_text_from_block(page_id)

        combined_text = "\n".join(page_text)

        corpus.append({
            "id": page_id,
            "title": title,
            "text": combined_text,
        })

    return corpus

def embed_text(text: str):
    return client.embeddings.create(
        model=MODEL,
        input=text
    ).data[0].embedding

def main():
    # with open(INPUT, "r") as f:
    #     chunks = json.load(f)

    output = []

    corpus = build_raw_corpus(DB_ID)
    print(corpus)
    
    with open(OUTPUT, "w") as f:
        json.dump(corpus, f, indent=4)

    return 

    for chunk in corpus:
        print(f"Embedding: {chunk['id']}")
        embedding = embed_text(chunk["text"])

        output.append({
            "id": chunk["id"],
            "text": chunk["text"],
            "title": chunk["title"],
            "embedding": embedding
        })

    with open(OUTPUT, "w") as f:
        json.dump(output, f, indent=4)

    print(f" Wrote {len(output)} embeddings to {OUTPUT}")

if __name__ == "__main__":
    main()
