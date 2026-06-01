#!/usr/bin/env python3
import os
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

def extract_text_from_docx(docx_path):
    """Extract text from a docx file"""
    try:
        # docx files are zip archives
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            xml_content = zip_ref.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # Namespace for Word documents
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # Extract all text elements
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

# List of docx files
outputs_dir = Path("./outputs")
docx_files = sorted(outputs_dir.glob("*.docx"))

# Extract first paragraph (or excerpt) from each file
for docx_file in docx_files:
    text = extract_text_from_docx(docx_file)
    # Get first 300 characters as excerpt
    excerpt = text[:300] if text else "No content found"
    print(f"\n{'='*60}")
    print(f"File: {docx_file.name}")
    print(f"{'='*60}")
    print(excerpt)
    if len(text) > 300:
        print("...")
