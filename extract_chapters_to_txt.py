#!/usr/bin/env python3
"""
Script to extract chapter content and save as .txt files for the frontend
"""

import os
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
import re

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

def extract_chapter_number(filename):
    """Extract chapter number from filename"""
    name = filename.replace('.docx', '')
    parts = name.split('_')
    
    if parts[0] == 'Eldoria':
        parts = parts[1:]
    
    for part in parts:
        if part.startswith('Capitulo'):
            chapter_str = part.replace('Capitulo', '')
            if chapter_str.isdigit():
                return int(chapter_str)
        elif part.startswith('Cap'):
            chapter_str = part.replace('Cap', '')
            if chapter_str.isdigit():
                return int(chapter_str)
    
    return None

# Extract all chapters
outputs_dir = Path("./outputs")
chapters_dir = Path("./frontend/public/chapters")
chapters_dir.mkdir(parents=True, exist_ok=True)

docx_files = sorted(outputs_dir.glob("*.docx"), key=lambda x: extract_chapter_number(x.name) or 999)

print(f"Extracting {len(docx_files)} chapters to {chapters_dir}...\n")

for docx_file in docx_files:
    chapter_num = extract_chapter_number(docx_file.name)
    
    if chapter_num is None:
        print(f"⚠️  Skipping {docx_file.name} - couldn't parse chapter number")
        continue
    
    # Extract text
    text = extract_text_from_docx(docx_file)
    
    if not text:
        print(f"⚠️  Empty content for chapter {chapter_num}")
        continue
    
    # Save to file
    output_file = chapters_dir / f"eldoria_cap{chapter_num:02d}.txt"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text)
    
    # Count words
    word_count = len(text.split())
    print(f"✅ Cap {chapter_num}: {output_file.name} ({word_count} words)")

print(f"\n✅ All chapters extracted to {chapters_dir}/")
