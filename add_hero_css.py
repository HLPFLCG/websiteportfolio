#!/usr/bin/env python3
"""Add hero-section.css to all HTML pages"""

from pathlib import Path

def add_hero_css(file_path):
    """Add hero-section.css link to HTML file"""
    content = file_path.read_text()
    
    # Check if already added
    if 'hero-section.css' in content:
        print(f"  ⊙ {file_path.name} already has hero-section.css")
        return
    
    # Add CSS link before </head>
    css_link = '<link rel="stylesheet" href="hero-section.css">'
    content = content.replace('</head>', f'       {css_link}\n   </head>')
    
    file_path.write_text(content)
    print(f"  ✓ Added hero-section.css to {file_path.name}")

def main():
    print("Adding hero-section.css to all pages...\n")
    
    pages = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']
    
    for page in pages:
        page_path = Path(page)
        if page_path.exists():
            add_hero_css(page_path)
    
    print("\n✅ Hero CSS added to all pages!")

if __name__ == '__main__':
    main()