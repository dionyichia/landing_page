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

def get_all_text_from_page(page_id: str, most_recent_header="Root") -> list[str]:
    texts = []
    cur_para = []
    blocks = list_all_block_children(page_id)

    most_recent_header = "Root"

    for block in blocks:
        header, block_type, text = extract_text_from_block(block)

        # If it is a header, update the last header 
        if header:
            # flush previous paragraph
            if cur_para:
                texts.append(f"{most_recent_header}\n" + " ".join(cur_para))
                cur_para = []

            most_recent_header = header
        else:
            # If text not empty
            if text.strip():
                # If it is not a paragraph block, cache text
                if block_type:
                    cur_para.append(text)
                    continue
                
                # If it is a para block and prev cache not empty, flush cache
                elif cur_para: 
                    texts.append(f"{most_recent_header}\n" + " ".join(cur_para))
                    cur_para = []

                texts.append(f"{most_recent_header}\n{text}")

        # recurse if this block has children
        if block.get("has_children"):
            texts.extend(get_all_text_from_page(block["id"], most_recent_header=most_recent_header))

    if cur_para:
        texts.append(f"{most_recent_header}\n" + " ".join(cur_para))

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

        # List of texts
        page_text = get_all_text_from_page(page_id=page_id, most_recent_header=title)

        corpus.append({
            "id": page_id,
            "title": title,
            "text": page_text,
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

    for page in corpus:
        for chunk in page["text"]:
            print(f"Embedding: {page['id']}")
            embedding = 1 ## embed_text(chunk)

            output.append({
                "page_id": page["id"],
                "text": chunk,
                "title": page["title"],
                "embedding": embedding
            })

    with open(OUTPUT, "w") as f:
        json.dump(output, f, indent=4)

    print(f" Wrote {len(output)} embeddings to {OUTPUT}")

if __name__ == "__main__":
    main()
