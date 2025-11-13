#!/usr/bin/env python3
"""
Script to update all HTML pages with:
1. Enhanced loading screen with floating particles and circular progress
2. Consistent navigation across all pages
3. Consistent hero sections matching index.html style
"""

import re
from pathlib import Path

# Enhanced loading screen HTML
ENHANCED_LOADING_HTML = '''   <body>
       <!-- Loading Screen -->
       <div class="loading-screen" id="loadingScreen">
           <div class="loading-particles"></div>
           <img src="hlpfl-logo-full.svg" alt="HLPFL Logo" class="loading-logo">
           <div class="loading-circle-container">
               <svg class="loading-circle" viewBox="0 0 200 200">
                   <defs>
                       <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" style="stop-color:#c87941;stop-opacity:1" />
                           <stop offset="100%" style="stop-color:#e09560;stop-opacity:1" />
                       </linearGradient>
                   </defs>
                   <circle class="loading-circle-bg" cx="100" cy="100" r="90"></circle>
                   <circle class="loading-circle-progress" id="loadingCircleProgress" cx="100" cy="100" r="90"></circle>
               </svg>
               <div class="loading-orbit">
                   <div class="loading-dot"></div>
                   <div class="loading-dot"></div>
                   <div class="loading-dot"></div>
               </div>
               <div class="loading-percentage" id="loadingPercentage">0%</div>
           </div>
           <div class="loading-text">LOADING EXPERIENCE</div>
       </div>'''

# Link to enhanced CSS
ENHANCED_CSS_LINK = '<link rel="stylesheet" href="enhanced-loading.css">'

# Enhanced loading script
ENHANCED_LOADING_SCRIPT = '<script src="enhanced-loading.js"></script>'

def update_index_html():
    """Update index.html with enhanced loading screen"""
    file_path = Path('index.html')
    content = file_path.read_text()
    
    # Add CSS link before </head>
    if 'enhanced-loading.css' not in content:
        content = content.replace('</head>', f'       {ENHANCED_CSS_LINK}\n   </head>')
    
    # Replace loading screen HTML
    loading_pattern = r'<body>\s*<!-- Loading Screen -->\s*<div class="loading-screen"[^>]*>.*?</div>'
    content = re.sub(loading_pattern, ENHANCED_LOADING_HTML, content, flags=re.DOTALL)
    
    # Replace old loading script with new one
    old_script_pattern = r'// Loading Screen\s*let progress = 0;.*?}, 200\);'
    if re.search(old_script_pattern, content, re.DOTALL):
        content = re.sub(old_script_pattern, '', content, flags=re.DOTALL)
    
    # Add enhanced loading script before </body>
    if 'enhanced-loading.js' not in content:
        content = content.replace('</body>', f'   {ENHANCED_LOADING_SCRIPT}\n   </body>')
    
    file_path.write_text(content)
    print(f"✓ Updated {file_path}")

def update_page_loading(file_path):
    """Update loading screen for other pages"""
    content = file_path.read_text()
    
    # Add CSS link before </head>
    if 'enhanced-loading.css' not in content:
        content = content.replace('</head>', f'       {ENHANCED_CSS_LINK}\n   </head>')
    
    # Replace loading screen HTML
    loading_pattern = r'<body>\s*<!-- Loading Screen -->\s*<div class="loading-screen"[^>]*>.*?</div>'
    content = re.sub(loading_pattern, ENHANCED_LOADING_HTML, content, flags=re.DOTALL)
    
    # Replace old loading script with new one
    old_script_pattern = r'// Loading Screen\s*let progress = 0;.*?}, 200\);'
    if re.search(old_script_pattern, content, re.DOTALL):
        content = re.sub(old_script_pattern, '', content, flags=re.DOTALL)
    
    # Add enhanced loading script before </body>
    if 'enhanced-loading.js' not in content:
        content = content.replace('</body>', f'   {ENHANCED_LOADING_SCRIPT}\n   </body>')
    
    file_path.write_text(content)
    print(f"✓ Updated {file_path}")

def update_navigation(file_path, active_page):
    """Update navigation to be consistent across all pages"""
    content = file_path.read_text()
    
    # Standard navigation HTML
    nav_html = f'''       <header id="header">
           <nav>
               <a href="index.html"><img src="hlpfl-symbol.svg" alt="HLPFL" class="logo"></a>
               <ul class="nav-links">
                   <li><a href="index.html"{'class="active"' if active_page == 'home' else ''}>Home</a></li>
                   <li><a href="services.html"{'class="active"' if active_page == 'services' else ''}>Services</a></li>
                   <li><a href="portfolio.html"{'class="active"' if active_page == 'portfolio' else ''}>Portfolio</a></li>
                   <li><a href="about.html"{'class="active"' if active_page == 'about' else ''}>About</a></li>
                   <li><a href="contact.html"{'class="active"' if active_page == 'contact' else ''}>Contact</a></li>
               </ul>
               <a href="contact.html" class="cta-button">Contact</a>
               <button class="mobile-menu-toggle">☰</button>
           </nav>
       </header>'''
    
    # Replace header/nav section
    header_pattern = r'<header[^>]*>.*?</header>'
    content = re.sub(header_pattern, nav_html, content, flags=re.DOTALL)
    
    file_path.write_text(content)
    print(f"✓ Updated navigation for {file_path}")

def update_hero_section(file_path, page_name):
    """Update hero sections to match index.html style"""
    content = file_path.read_text()
    
    hero_configs = {
        'about.html': {
            'white_text': 'About',
            'copper_text': 'HLPFL',
            'description': "We're on a mission to make professional web development accessible to every first-time founder, regardless of budget.",
            'scroll_target': '#story'
        },
        'services.html': {
            'white_text': 'Our',
            'copper_text': 'Services',
            'description': 'Comprehensive web development solutions tailored for first-time founders. From simple landing pages to complex e-commerce platforms.',
            'scroll_target': '#services'
        },
        'portfolio.html': {
            'white_text': 'Our',
            'copper_text': 'Portfolio',
            'description': 'Explore our successful projects and see how we\'ve helped businesses grow with custom web solutions.',
            'scroll_target': '#portfolio'
        },
        'contact.html': {
            'white_text': 'Get In',
            'copper_text': 'Touch',
            'description': 'Ready to start your project? Let\'s have a conversation about your vision and how we can help bring it to life.',
            'scroll_target': '#contact-form'
        }
    }
    
    if page_name in hero_configs:
        config = hero_configs[page_name]
        
        # Hero section HTML matching index.html style
        hero_html = f'''       <!-- Hero Section -->
       <section class="hero" id="home">
           <div class="hero-content reveal">
               <h1>
                   <span class="white-text">{config['white_text']}</span>
                   <span class="copper_text">{config['copper_text']}</span>
               </h1>
               <p>{config['description']}</p>
           </div>
           <div class="scroll-indicator" onclick="document.querySelector('{config['scroll_target']}').scrollIntoView({{behavior: 'smooth'}})">
               <span class="scroll-text">SCROLL</span>
               <div class="scroll-arrow"></div>
           </div>
       </section>'''
        
        # Replace page-header with hero section
        page_header_pattern = r'<!-- Page Header -->.*?</div>\s*</div>'
        if re.search(page_header_pattern, content, re.DOTALL):
            content = re.sub(page_header_pattern, hero_html, content, flags=re.DOTALL)
        
        file_path.write_text(content)
        print(f"✓ Updated hero section for {file_path}")

def main():
    print("Starting website updates...\n")
    
    # Update index.html
    print("1. Updating index.html...")
    update_index_html()
    
    # Update other pages
    pages = {
        'about.html': 'about',
        'services.html': 'services',
        'portfolio.html': 'portfolio',
        'contact.html': 'contact'
    }
    
    print("\n2. Updating other pages...")
    for page_file, active_page in pages.items():
        page_path = Path(page_file)
        if page_path.exists():
            print(f"\n   Processing {page_file}...")
            update_page_loading(page_path)
            update_navigation(page_path, active_page)
            update_hero_section(page_path, page_file)
    
    print("\n✅ All updates completed successfully!")

if __name__ == '__main__':
    main()