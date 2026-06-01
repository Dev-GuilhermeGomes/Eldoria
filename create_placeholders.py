#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create placeholder images for chapters without actual images
os.chdir("./frontend/public")

for chapter_num in range(5, 13):  # Create for chapters 5-12
    filename = f"capitulo{chapter_num}.png"
    
    if os.path.exists(filename):
        print(f"✅ {filename} already exists, skipping")
        continue
    
    # Create image
    img = Image.new('RGB', (400, 600), color=(30, 30, 30))  # Dark background
    draw = ImageDraw.Draw(img)
    
    # Add text - yellow color (#f5d884)
    yellow = (245, 216, 132)
    text = f"ELDORIA\n\nCapítulo {chapter_num}"
    
    # Try to use a nice font, fallback to default
    try:
        font = ImageFont.truetype("arial.ttf", 60)
        small_font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
        small_font = font
    
    # Calculate text position
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (400 - text_width) // 2
    y = (600 - text_height) // 2
    
    # Draw background rectangle
    draw.rectangle([(50, 150), (350, 450)], outline=yellow, width=3)
    
    # Draw text
    draw.text((x, y), text, fill=yellow, font=font)
    
    # Add footer
    footer = "Leitura Calma, Design Quente"
    draw.text((50, 520), footer, fill=yellow, font=small_font)
    
    # Save image
    img.save(filename)
    print(f"✅ Created {filename}")

print("\n✅ All placeholder images created!")
