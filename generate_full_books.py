#!/usr/bin/env python3
"""
Script to generate complete books.ts with all chapters, characters, and images.
Extracts content from outputs/*.docx files and creates TypeScript data structure.
"""

import os
import json
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime
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

def extract_chapter_number_and_title(filename):
    """Extract chapter number and title from filename"""
    # Remove .docx extension
    name = filename.replace('.docx', '')
    
    # Split by underscore
    parts = name.split('_')
    
    # Remove 'Eldoria' if it's the first part
    if parts[0] == 'Eldoria':
        parts = parts[1:]
    
    # Extract chapter number from Capitulo1, Cap15, etc.
    chapter_num = None
    title_start_idx = 0
    
    for idx, part in enumerate(parts):
        if part.startswith('Capitulo'):
            chapter_str = part.replace('Capitulo', '')
            if chapter_str.isdigit():
                chapter_num = int(chapter_str)
                title_start_idx = idx + 1
                break
        elif part.startswith('Cap'):
            chapter_str = part.replace('Cap', '')
            if chapter_str.isdigit():
                chapter_num = int(chapter_str)
                title_start_idx = idx + 1
                break
    
    if chapter_num is None:
        return None, filename
    
    # Get title from remaining parts, filtering out noise
    stop_words = ['Completo', 'final', 'da', 'parte', 'Por', 'Parte', '']
    title_parts = [p for p in parts[title_start_idx:] if p not in stop_words]
    title = ' '.join(title_parts).replace('(1)', '').strip()
    
    return chapter_num, title

# Define chapters data with character info
chapters_config = {
    1: {
        'main_character': 'Belos',
        'class': 'Paladino',
        'powers': ['Lâmina Sagrada', 'Escudo de Luz', 'Resistência Divina'],
        'description': 'Um Paladino marcado pelo destino, guerreiro de luz contra as trevas do Nether.',
        'image': 'Belos.png'
    },
    2: {
        'main_character': 'Hugo',
        'class': 'Mago do Fogo',
        'powers': ['Fogo Ardente', 'Combustão Mágica'],
        'description': 'Um mago da Chama com poderes inatos de fogo.',
        'image': None
    },
    3: {
        'main_character': 'Kael',
        'class': 'Guerreiro Sombrio',
        'powers': ['Lâmina Silenciosa', 'Movimento nas Sombras'],
        'description': 'Um guerreiro das sombras, treinado como ladrão mas com honra.',
        'image': None
    },
    4: {
        'main_character': 'Sophie',
        'class': 'Vidente',
        'powers': ['Resistência Espiritual', 'Conexão com Magia Antiga'],
        'description': 'Uma prisioneira em Valdrim, símbolo da esperança.',
        'image': 'Sophie.png'
    },
    5: {
        'main_character': 'Kira',
        'class': 'Mistério',
        'powers': ['Silêncio Mágico', 'Percepção Oculta'],
        'description': 'Uma rapariga envolta em mistério e silêncio.',
        'image': None
    },
    6: {
        'main_character': 'O Grupo Reunido',
        'class': 'Coletivo',
        'powers': ['Peso do Grupo', 'Convergência de Destinos'],
        'description': 'Sete pessoas convergindo num propósito comum na Floresta do Crepúsculo.',
        'image': None
    },
    7: {
        'main_character': 'O Espelho da Floresta',
        'class': 'Força da Natureza',
        'powers': ['Reflexão de Verdade', 'Exposição Espiritual'],
        'description': 'A manifestação que reflete os medos mais profundos.',
        'image': None
    },
    8: {
        'main_character': 'A Cicatriz de Luz',
        'class': 'Cicatriz Mágica',
        'powers': ['Cicatrização Divina', 'Luz Purificadora'],
        'description': 'Marca deixada pela batalha anterior que guia o caminho.',
        'image': None
    },
    9: {
        'main_character': 'Natiles',
        'class': 'Aprendiz de Magia',
        'powers': ['Aprendizado Mágico', 'Potencial Latente'],
        'description': 'Uma jovem com potencial mágico extraordinário buscando seu lugar.',
        'image': None
    },
    10: {
        'main_character': 'A Solidão do Peso',
        'class': 'Conceito Abstrato',
        'powers': ['Pressão Emocional', 'Teste de Vontade'],
        'description': 'O peso da responsabilidade que cada um carrega.',
        'image': None
    },
    11: {
        'main_character': 'O Deus Esquecido',
        'class': 'Entidade Divina',
        'powers': ['Memória Eterna', 'Conhecimento Ancestral'],
        'description': 'Uma divindade cujos segredos moldam o destino de Eldoria.',
        'image': None
    },
    12: {
        'main_character': 'O Guardião da Saída',
        'class': 'Protetor',
        'powers': ['Guardiania Interdimensional', 'Controle do Portal'],
        'description': 'Aquele que vigia o caminho de volta.',
        'image': None
    },
    13: {
        'main_character': 'O Portal Mágico',
        'class': 'Estrutura Mágica',
        'powers': ['Transporte Dimensional', 'Abertura do Aether'],
        'description': 'A porta entre mundos que leva ao Aether.',
        'image': None
    },
    14: {
        'main_character': 'Os Herdeiros',
        'class': 'Coletivo Mágico',
        'powers': ['Herança Divina', 'Poder Geracional'],
        'description': 'Aqueles que herdam o poder dos antigos.',
        'image': None
    },
    15: {
        'main_character': 'Os Aprendizes Despertam',
        'class': 'Despertar',
        'powers': ['Ascensão Mágica', 'Realização de Potencial'],
        'description': 'O momento em que os aprendizes descobrem seu verdadeiro poder.',
        'image': None
    },
    16: {
        'main_character': 'O Fugitivo',
        'class': 'Perseguido',
        'powers': ['Fuga Rápida', 'Enganar Inimigos'],
        'description': 'Aquele que deve fugir do Aether antes que seja demasiado tarde.',
        'image': None
    },
    17: {
        'main_character': 'A Prisão de Cinzas',
        'class': 'Ambiente Hostil',
        'powers': ['Aprisionamento', 'Corrupção do Nether'],
        'description': 'A barreira cinzenta que separa o mundo dos vivos da corrupção.',
        'image': None
    },
    18: {
        'main_character': 'A Fissura Dimensional',
        'class': 'Catástrofe',
        'powers': ['Divisão de Mundos', 'Abertura do Abismo'],
        'description': 'A rotura que ameaça unir os dois mundos.',
        'image': None
    },
    19: {
        'main_character': 'A Verdade Revelada',
        'class': 'Revelação',
        'powers': ['Exposição da Realidade', 'Verdade Absoluta'],
        'description': 'O momento em que todos os segredos são finalmente expostos.',
        'image': None
    },
    20: {
        'main_character': 'O Após a Verdade',
        'class': 'Reflexão',
        'powers': ['Compreensão Profunda', 'Ressignificação'],
        'description': 'Aquilo que persiste após a verdade ter sido dita.',
        'image': None
    },
    21: {
        'main_character': 'Eldoria Completa',
        'class': 'Conclusão Épica',
        'powers': ['Renascimento do Mundo', 'Novo Começo'],
        'description': 'O destino final de Eldoria e seus heróis.',
        'image': None
    }
}

# Extract all chapters
outputs_dir = Path("./outputs")
docx_files = sorted(outputs_dir.glob("*.docx"))

books_data = []
chapter_map = {}

print(f"Processing {len(docx_files)} chapter files...\n")

for idx, docx_file in enumerate(docx_files, 1):
    text = extract_text_from_docx(docx_file)
    
    # Extract chapter info from filename
    chapter_num, chapter_title = extract_chapter_number_and_title(docx_file.name)
    
    if chapter_num is None:
        print(f"⚠️  Skipping {docx_file.name} - couldn't parse chapter number")
        continue
    
    # Get excerpt (first meaningful text)
    excerpt = text[:300].replace('\n\n', ' ').strip()
    if len(text) > 300:
        excerpt += "..."
    
    # Generate image filename
    image_name = f"capitulo{chapter_num}.png"
    
    # Get character info if available
    char_config = chapters_config.get(chapter_num, {})
    main_character = char_config.get('main_character', f'Personagem {chapter_num}')
    char_class = char_config.get('class', 'Personagem')
    char_powers = char_config.get('powers', [])
    char_description = char_config.get('description', f'Personagem principal do capítulo {chapter_num}')
    char_image = char_config.get('image')
    
    # Escape quotes in text
    excerpt_escaped = excerpt.replace("'", "\\'").replace('"', '\\"')
    
    book_entry = {
        '_id': f'eldoria_{chapter_num:02d}',
        'number': chapter_num,
        'title': f'Capítulo {chapter_num}: {chapter_title}',
        'cover_image': f'/{image_name}',
        'main_character': main_character,
        'character_class': char_class,
        'character_powers': char_powers,
        'character_description': char_description,
        'character_image': f'/{char_image}' if char_image else None,
        'excerpt': excerpt_escaped,
        'text_preview': text[:500].replace("'", "\\'").replace('"', '\\"')
    }
    
    books_data.append(book_entry)
    chapter_map[chapter_num] = book_entry
    
    print(f"✅ Cap {chapter_num}: {chapter_title} ({main_character})")

# Generate TypeScript content
ts_content = """// Auto-generated book data integrating Eldoria chapters with images and actual content
// Generated from outputs/*.docx files and images/ folder

export interface Character {
  _id: string;
  name: string;
  description: string;
  history: string;
  powers: string[];
  class: string;
  imagePath?: string;
  iconicQuote?: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  synopsis: string;
  coverImage: string;
  characters: Character[];
  views: number;
  rating: number;
  publishedDate: string;
  pages: number;
  genres: string[];
  excerpt: string;
  content?: string;
}

export const books: Book[] = [
"""

# Add each book to the TypeScript array
for book in books_data:
    views = 15000 - (book['number'] * 500)
    rating = 4.9 - (book['number'] * 0.05)
    pages = 40 + (book['number'] * 2)
    
    ts_content += f"""  {{
    _id: '{book['_id']}',
    title: '{book['title']}',
    author: 'Eldoria',
    synopsis: 'Capítulo {book['number']} da saga Eldoria. Principal: {book['main_character']}, um {book['character_class']}.',
    coverImage: '{book['cover_image']}',
    characters: [{{
      _id: 'eldoria_{book['main_character'].lower().replace(' ', '_')}',
      name: '{book['main_character']}',
      description: '{book['character_description']}',
      history: 'Personagem central do capítulo {book['number']} de Eldoria.',
      powers: {json.dumps(book['character_powers'])},
      class: '{book['character_class']}'{', imagePath: "' + book['character_image'] + '"' if book['character_image'] else ''}
    }}],
    views: {views},
    rating: {rating:.1f},
    publishedDate: '2024-06-01',
    pages: {pages},
    genres: ['Fantasia Épica', 'Ação', 'Aventura'],
    excerpt: '{book['excerpt']}'
  }},
"""

# Remove trailing comma from last entry
ts_content = ts_content.rstrip(',\n') + '\n'

ts_content += """];

export const getBookById = (id?: string) => books.find((book) => book._id === id);

export const getMoreFromAuthor = (book: Book) =>
  books.filter((candidate) => candidate.author === book.author && candidate._id !== book._id);
"""

# Write to file
output_path = Path("./frontend/src/data/books.ts")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"\n✅ books.ts generated with {len(books_data)} chapters!")
print(f"📁 Location: {output_path}")
print(f"Total chapters: {len(books_data)} (First {min(7, len(books_data))} of {len(books_data)})")
