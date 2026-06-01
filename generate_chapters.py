#!/usr/bin/env python3
import os
import zipfile
import xml.etree.ElementTree as ET
import json
from pathlib import Path

def extract_text_from_docx(docx_path):
    """Extract full text from a docx file"""
    try:
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            xml_content = zip_ref.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for paragraph in root.findall('.//w:p', namespace):
                texts = []
                for text_elem in paragraph.findall('.//w:t', namespace):
                    if text_elem.text:
                        texts.append(text_elem.text)
                if texts:
                    paragraphs.append(''.join(texts))
            
            return '\n\n'.join(paragraphs).strip()
    except Exception as e:
        print(f"Error reading {docx_path}: {e}")
        return ""

# Extract all chapters
outputs_dir = Path("./outputs")
docx_files = sorted(outputs_dir.glob("*.docx"))

# Create TypeScript data file
ts_content = "// Auto-generated from Eldoria chapters\n"
ts_content += "// Images are stored in /public/\n\n"
ts_content += "export interface Chapter {\n"
ts_content += "  id: string;\n"
ts_content += "  title: string;\n"
ts_content += "  number: number;\n"
ts_content += "  content: string;\n"
ts_content += "  excerpt: string;\n"
ts_content += "  image?: string;\n"
ts_content += "}\n\n"

# Get chapter data from docx files
chapters_data = []

for idx, docx_file in enumerate(docx_files, 1):
    text = extract_text_from_docx(docx_file)
    
    # Extract chapter title and number from filename
    filename = docx_file.stem.replace("Eldoria_Capitulo", "").replace("_Completo", "")
    
    # Parse chapter number
    try:
        chapter_num = int(filename.split('_')[0])
    except:
        chapter_num = idx
    
    # Extract title from filename (remove number and parentheses)
    title_parts = filename.split('_')[1:]
    chapter_title = ' '.join(title_parts).replace('(1)', '').strip()
    
    # Get excerpt (first 400 chars)
    excerpt = text[:400].replace('\n\n', ' ').strip()
    if len(text) > 400:
        excerpt += "..."
    
    # Determine image filename
    image_name = f"capitulo{chapter_num}.png"
    
    chapter_id = f"eldoria_cap{chapter_num:02d}"
    
    chapters_data.append({
        "id": chapter_id,
        "title": chapter_title,
        "number": chapter_num,
        "excerpt": excerpt,
        "image": image_name,
        "content_preview": text[:500]  # First 500 chars for preview
    })
    
    print(f"Chapter {chapter_num}: {chapter_title}")
    print(f"  Image: {image_name}")
    print(f"  Excerpt: {excerpt[:100]}...")
    print()

# Generate TypeScript file content
ts_content += "export const eldoriaChapters: Chapter[] = [\n"

for chapter in chapters_data:
    chapter_num = chapter["number"]
    ts_content += f'''  {{
    id: "{chapter['id']}",
    title: "{chapter['title']}",
    number: {chapter['number']},
    content: `{chapter['content_preview'].replace(chr(96), '')}...`,
    excerpt: `{chapter['excerpt'].replace(chr(96), '')}`,
    image: "/{chapter['image']}",
  }},
'''

ts_content += "];\n"

# Save to file
output_file = Path("./frontend/src/data/eldoriaChapters.ts")
output_file.parent.mkdir(parents=True, exist_ok=True)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"\n✅ Generated {output_file}")
print(f"Total chapters extracted: {len(chapters_data)}")
