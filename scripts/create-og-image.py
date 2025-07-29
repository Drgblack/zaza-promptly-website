#!/usr/bin/env python3
"""
Create OG image for social media sharing
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_og_image():
    # Create a 1200x630 image for Open Graph
    width, height = 1200, 630
    
    # Create gradient background (matching Zaza brand colors)
    img = Image.new('RGB', (width, height), color='#ffffff')
    draw = ImageDraw.Draw(img)
    
    # Create gradient from pink to purple
    for y in range(height):
        ratio = y / height
        r = int(255 * (1 - ratio) + 147 * ratio)  # Pink to purple red
        g = int(105 * (1 - ratio) + 51 * ratio)   # Pink to purple green  
        b = int(180 * (1 - ratio) + 153 * ratio)  # Pink to purple blue
        
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add logo area in center-left
    logo_area = Image.new('RGBA', (200, 200), (255, 255, 255, 255))
    logo_draw = ImageDraw.Draw(logo_area)
    
    # Draw simplified Z logo
    logo_draw.rounded_rectangle([20, 20, 180, 180], radius=40, fill=(255, 255, 255, 255))
    
    # Draw Z letter
    try:
        font_large = ImageFont.truetype("arial.ttf", 100)
    except:
        font_large = ImageFont.load_default()
    
    logo_draw.text((100, 100), "Z", anchor="mm", fill=(147, 51, 153), font=font_large)
    
    # Paste logo
    img.paste(logo_area, (100, 215), logo_area)
    
    # Add text
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        subtitle_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Main title
    draw.text((350, 250), "Zaza Promptly", fill='white', font=title_font)
    
    # Subtitle
    draw.text((350, 320), "AI-Powered Feedback Generation for Teachers", fill='white', font=subtitle_font)
    
    # Call to action
    draw.text((350, 380), "Save hours writing student comments", fill='white', font=subtitle_font)
    
    return img

def create_apple_touch_icon():
    """Create Apple Touch Icon from logo"""
    # Create 180x180 icon
    size = 180
    img = Image.new('RGB', (size, size), color='#9333ea')  # Purple background
    draw = ImageDraw.Draw(img)
    
    # Add rounded rectangle background
    draw.rounded_rectangle([10, 10, size-10, size-10], radius=30, fill='white')
    
    # Add Z letter
    try:
        font = ImageFont.truetype("arial.ttf", 80)
    except:
        font = ImageFont.load_default()
    
    draw.text((size//2, size//2), "Z", anchor="mm", fill=(147, 51, 153), font=font)
    
    return img

if __name__ == "__main__":
    # Create OG image
    og_image = create_og_image()
    og_image.save('/workspaces/zaza-websites-claudecode/public/og-image.png')
    print("Created og-image.png")
    
    # Create Apple Touch Icon
    apple_icon = create_apple_touch_icon()
    apple_icon.save('/workspaces/zaza-websites-claudecode/public/apple-touch-icon.png')
    print("Created apple-touch-icon.png")
    
    # Create different favicon sizes
    favicon_sizes = [16, 32, 96, 192]
    for size in favicon_sizes:
        favicon = apple_icon.resize((size, size), Image.Resampling.LANCZOS)
        favicon.save(f'/workspaces/zaza-websites-claudecode/public/favicon-{size}x{size}.png')
        print(f"Created favicon-{size}x{size}.png")