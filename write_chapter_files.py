#!/usr/bin/env python3
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

outputs_dir = Path('./outputs')
out_public = Path('./frontend/public/chapters')
out_public.mkdir(parents=True, exist_ok=True)

namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

def extract_text(docx_path: Path) -> str:
    with zipfile.ZipFile(docx_path, 'r') as z:
        xml = z.read('word/document.xml')
        root = ET.fromstring(xml)
        paragraphs = []
        for p in root.findall('.//w:p', namespace):
            texts = []
            for t in p.findall('.//w:t', namespace):
                if t.text:
                    texts.append(t.text)
            if texts:
                paragraphs.append(''.join(texts))
        return '\n\n'.join(paragraphs).strip()

for docx_file in sorted(outputs_dir.glob('Eldoria_*.docx')):
    stem = docx_file.stem
    # try to extract chapter number
    # filenames like Eldoria_Capitulo10_O_Peso_da_Solidao
    parts = stem.split('_')
    chap_part = None
    for p in parts:
        if p.lower().startswith('capitulo') or p.lower().startswith('cap'):
            chap_part = p
            break
    # fallback: take first numeric group in stem
    num = None
    if chap_part:
        digits = ''.join([c for c in chap_part if c.isdigit()])
        if digits:
            num = int(digits)
    if num is None:
        # try parts[1]
        try:
            num = int(parts[1])
        except:
            num = 0

    # create filename with zero-padded
    out_name = f"eldoria_cap{num:02d}.txt"
    text = extract_text(docx_file)
    out_path = out_public / out_name
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Wrote {out_path}")

print('Done writing chapter files.')
