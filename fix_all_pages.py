#!/usr/bin/env python3
"""Fix all pages to match index.html exactly"""

import re
from pathlib import Path

def revert_to_simple_loading():
    """Revert to simple loading bar on all pages"""
    pages = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']
    
    simple_loading_html = '''    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <img src="hlpfl-logo-full.svg" alt="HLPFL Logo" class="loading-logo">
        <div class="loading-bar-container">
            <div class="loading-bar" id="loadingBar"></div>
        </div>
        <div class="loading-percentage" id="loadingPercentage">0%</div>
    </div>'''
    
    for page in pages:
        path = Path(page)
        if path.exists():
            content = path.read_text()
            
            # Remove enhanced loading CSS link
            content = content.replace('<link rel="stylesheet" href="enhanced-loading.css">', '')
            content = content.replace('<link rel="stylesheet" href="hero-section.css">', '')
            
            # Replace loading screen HTML
            loading_pattern = r'<!-- Loading Screen -->.*?</div>\s*(?=\n\s*<!-- )'
            content = re.sub(loading_pattern, simple_loading_html, content, flags=re.DOTALL)
            
            # Remove enhanced loading script
            content = content.replace('<script src="enhanced-loading.js"></script>', '')
            
            path.write_text(content)
            print(f"✓ Fixed {page}")

def fix_hero_sections():
    """Fix hero sections to match index.html"""
    
    hero_configs = {
        'about.html': {
            'white': 'About',
            'copper': 'HLPFL',
            'desc': "We're on a mission to make professional web development accessible to every first-time founder, regardless of budget.",
            'scroll': '#story'
        },
        'services.html': {
            'white': 'Our',
            'copper': 'Services',
            'desc': 'Comprehensive web development solutions tailored for first-time founders. From simple landing pages to complex e-commerce platforms.',
            'scroll': '#services'
        },
        'portfolio.html': {
            'white': 'Our',
            'copper': 'Portfolio',
            'desc': "Explore our successful projects and see how we've helped businesses grow with custom web solutions.",
            'scroll': '#portfolio'
        },
        'contact.html': {
            'white': 'Get In',
            'copper': 'Touch',
            'desc': "Ready to start your project? Let's have a conversation about your vision and how we can help bring it to life.",
            'scroll': '#contact-form'
        }
    }
    
    for page_name, config in hero_configs.items():
        path = Path(page_name)
        if path.exists():
            content = path.read_text()
            
            # Create hero HTML matching index.html exactly
            hero_html = f'''    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content reveal">
            <h1>
                <span class="white-text">{config['white']}</span>
                <span class="copper-text">{config['copper']}</span>
            </h1>
            <p>{config['desc']}</p>
        </div>
        <div class="scroll-indicator" onclick="document.querySelector('{config['scroll']}').scrollIntoView({{behavior: 'smooth'}})">
            <span class="scroll-text">SCROLL</span>
            <div class="scroll-arrow"></div>
        </div>
    </section>'''
            
            # Replace hero/page-header section
            hero_pattern = r'<!-- (?:Hero Section|Page Header) -->.*?</section>'
            content = re.sub(hero_pattern, hero_html, content, flags=re.DOTALL)
            
            path.write_text(content)
            print(f"✓ Fixed hero section in {page_name}")

def main():
    print("Fixing all pages to match index.html...\n")
    
    print("1. Reverting to simple loading screen...")
    revert_to_simple_loading()
    
    print("\n2. Fixing hero sections...")
    fix_hero_sections()
    
    print("\n✅ All pages fixed!")

if __name__ == '__main__':
    main()