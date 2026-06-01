from PIL import Image, ImageDraw, ImageFont
import os

def create_chapter_image(chapter_num, part_title, output_path):
    width, height = 310, 390
    img = Image.new('RGB', (width, height), color='#2a2a2a')
    draw = ImageDraw.Draw(img)
    
    try:
        title_font = ImageFont.truetype("arial.ttf", 40)
        chapter_font = ImageFont.truetype("arial.ttf", 36)
        part_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        chapter_font = ImageFont.load_default()
        part_font = ImageFont.load_default()
    
    gold = '#f5d884'
    
    # Border
    border_width = 3
    draw.rectangle(
        [(border_width, border_width), (width - border_width, height - border_width)],
        outline=gold,
        width=border_width
    )
    
    # Title
    title_text = "ELDORIA"
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text(((width - title_width) // 2, 50), title_text, font=title_font, fill=gold)
    
    # Chapter
    chapter_text = f"Capítulo {chapter_num}"
    chapter_bbox = draw.textbbox((0, 0), chapter_text, font=chapter_font)
    chapter_width = chapter_bbox[2] - chapter_bbox[0]
    draw.text(((width - chapter_width) // 2, 150), chapter_text, font=chapter_font, fill=gold)
    
    # Part title
    if part_title:
        part_text = part_title
        part_bbox = draw.textbbox((0, 0), part_text, font=part_font)
        part_width = part_bbox[2] - part_bbox[0]
        draw.text(((width - part_width) // 2, 260), part_text, font=part_font, fill=gold)
    
    img.save(output_path)
    print(f"✅ Created {output_path}")

# Create images for chapters 17, 18, 19
output_dir = r"C:\Users\guilh\site de livros\frontend\public"

chapters_to_create = [
    (17, "O Nether"),
    (18, "O Nether"),
    (19, "O Nether"),
]

for chapter_num, part_title in chapters_to_create:
    output_path = os.path.join(output_dir, f"capitulo{chapter_num}.png")
    create_chapter_image(chapter_num, part_title, output_path)

print("\n✅ All chapter images created successfully!")
