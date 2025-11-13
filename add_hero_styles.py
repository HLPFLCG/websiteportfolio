#!/usr/bin/env python3
"""Add hero section CSS to all pages"""

from pathlib import Path

HERO_CSS = '''
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
            padding: 8rem 2rem 4rem;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(200, 121, 65, 0.15) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        
        .hero-content {
            max-width: 1200px;
            position: relative;
            z-index: 2;
            text-align: left;
        }
        
        .hero h1 {
            font-size: clamp(3.5rem, 8vw, 7rem);
            font-weight: 700;
            margin-bottom: 2rem;
            line-height: 1.1;
        }
        
        .hero h1 .white-text {
            color: var(--text);
            display: block;
        }
        
        .hero h1 .copper-text {
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: block;
        }
        
        .hero p {
            font-size: clamp(1.1rem, 2vw, 1.35rem);
            color: var(--text-muted);
            margin-bottom: 3rem;
            max-width: 650px;
            line-height: 1.7;
        }
        
        .hero-cta {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        .scroll-indicator {
            position: absolute;
            bottom: 3rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .scroll-indicator:hover {
            transform: translateX(-50%) translateY(5px);
        }
        
        .scroll-text {
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            color: var(--text-muted);
            font-weight: 500;
        }
        
        .scroll-arrow {
            width: 24px;
            height: 24px;
            border-left: 2px solid var(--text-muted);
            border-bottom: 2px solid var(--text-muted);
            transform: rotate(-45deg);
            animation: scrollBounce 2s infinite;
        }
        
        @keyframes scrollBounce {
            0%, 100% { transform: rotate(-45deg) translateY(0); }
            50% { transform: rotate(-45deg) translateY(10px); }
        }
'''

def add_hero_css_to_page(page_path):
    """Add hero CSS to a page if it doesn't have it"""
    content = page_path.read_text()
    
    # Check if hero CSS already exists
    if '.hero {' in content:
        print(f"  ⊙ {page_path.name} already has hero CSS")
        return
    
    # Find where to insert (after header styles, before section styles)
    # Look for "/* Section Styles */" or similar
    insert_marker = '        /* Section Styles */'
    
    if insert_marker in content:
        content = content.replace(insert_marker, HERO_CSS + '\n' + insert_marker)
    else:
        # Try another marker
        insert_marker = '        section {'
        if insert_marker in content:
            content = content.replace(insert_marker, HERO_CSS + '\n' + insert_marker)
    
    page_path.write_text(content)
    print(f"  ✓ Added hero CSS to {page_path.name}")

def main():
    print("Adding hero section CSS to all pages...\n")
    
    pages = ['about.html', 'services.html', 'portfolio.html', 'contact.html']
    
    for page in pages:
        page_path = Path(page)
        if page_path.exists():
            add_hero_css_to_page(page_path)
    
    print("\n✅ Hero CSS added to all pages!")

if __name__ == '__main__':
    main()