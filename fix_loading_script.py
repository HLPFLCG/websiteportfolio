#!/usr/bin/env python3
"""Add loading screen JavaScript to all pages"""

from pathlib import Path
import re

LOADING_SCRIPT = '''        // Loading Screen
        let progress = 0;
        const loadingBar = document.getElementById('loadingBar');
        const loadingPercentage = document.getElementById('loadingPercentage');
        const loadingScreen = document.getElementById('loadingScreen');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 500);
            }
            loadingBar.style.width = progress + '%';
            loadingPercentage.textContent = Math.floor(progress) + '%';
        }, 200);

'''

def fix_page(page_path):
    """Add loading script to page"""
    content = page_path.read_text()
    
    # Check if loading script already exists
    if "const loadingBar = document.getElementById('loadingBar')" in content:
        print(f"  ⊙ {page_path.name} already has loading script")
        return
    
    # Find the script tag and add loading script at the beginning
    script_pattern = r'(<script>\s*)'
    replacement = r'\1' + LOADING_SCRIPT
    content = re.sub(script_pattern, replacement, content)
    
    page_path.write_text(content)
    print(f"  ✓ Added loading script to {page_path.name}")

def main():
    print("Adding loading screen JavaScript to all pages...\n")
    
    pages = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']
    
    for page in pages:
        page_path = Path(page)
        if page_path.exists():
            fix_page(page_path)
    
    print("\n✅ Loading scripts added to all pages!")

if __name__ == '__main__':
    main()