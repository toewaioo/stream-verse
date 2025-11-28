from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, path):
    img = Image.new('RGB', (size, size), color = '#050505')
    d = ImageDraw.Draw(img)
    
    # Draw a simple "C" for Cineverse
    # Calculate text size roughly
    font_size = int(size * 0.6)
    try:
        # Try to use a default font, otherwise just draw a circle
        # font = ImageFont.truetype("arial.ttf", font_size)
        # d.text((size/4, size/5), "C", fill=(100, 100, 255), font=font)
        pass
    except IOError:
        pass
        
    # Draw a circle/neon accent
    margin = size * 0.1
    d.ellipse([margin, margin, size - margin, size - margin], outline ="#8A2BE2", width=int(size*0.05))
    
    # Draw a "play" triangle
    triangle_points = [
        (size * 0.4, size * 0.3),
        (size * 0.4, size * 0.7),
        (size * 0.7, size * 0.5)
    ]
    d.polygon(triangle_points, fill="#8A2BE2")

    img.save(path)

os.makedirs('public/images/icons', exist_ok=True)
create_icon(192, 'public/images/icons/icon-192x192.png')
create_icon(512, 'public/images/icons/icon-512x512.png')
print("Icons created successfully")
