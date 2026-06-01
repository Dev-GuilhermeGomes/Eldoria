from PIL import Image, ImageDraw, ImageFont
import os

# Create chapter images 5, 6, 7
def create_chapter_image(chapter_num, output_path):
    # Image dimensions
    width, height = 310, 390
    
    # Create image with dark background
    img = Image.new('RGB', (width, height), color='#2a2a2a')
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fallback to default
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        chapter_font = ImageFont.truetype("arial.ttf", 42)
    except:
        title_font = ImageFont.load_default()
        chapter_font = ImageFont.load_default()
    
    # Colors
    gold = '#f5d884'
    
    # Draw border
    border_width = 3
    draw.rectangle(
        [(border_width, border_width), (width - border_width, height - border_width)],
        outline=gold,
        width=border_width
    )
    
    # Draw "ELDORIA" text
    eldoria_text = "ELDORIA"
    eldoria_bbox = draw.textbbox((0, 0), eldoria_text, font=title_font)
    eldoria_width = eldoria_bbox[2] - eldoria_bbox[0]
    eldoria_x = (width - eldoria_width) // 2
    eldoria_y = 60
    draw.text((eldoria_x, eldoria_y), eldoria_text, font=title_font, fill=gold)
    
    # Draw "Capítulo X" text
    chapter_text = f"Capítulo {chapter_num}"
    chapter_bbox = draw.textbbox((0, 0), chapter_text, font=chapter_font)
    chapter_width = chapter_bbox[2] - chapter_bbox[0]
    chapter_x = (width - chapter_width) // 2
    chapter_y = 200
    draw.text((chapter_x, chapter_y), chapter_text, font=chapter_font, fill=gold)
    
    # Save image
    img.save(output_path)
    print(f"✅ Created {output_path}")

# Create images for chapters 5, 6, 7
output_dir = r"C:\Users\guilh\site de livros\frontend\public"
for chapter in [5, 6, 7]:
    output_path = os.path.join(output_dir, f"capitulo{chapter}.png")
    create_chapter_image(chapter, output_path)

print("\n✅ All chapter images created successfully!")
