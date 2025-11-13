#!/usr/bin/env python3
import re
from pathlib import Path

def get_nav_html(active_page):
    nav = '''    <!-- Header -->
    <header id="header">
        <nav>
            <a href="index.html"><img src="hlpfl-symbol.svg" alt="HLPFL" class="logo"></a>
            <ul class="nav-links">
                <li><a href="index.html"''' + (' class="active"' if active_page == 'home' else '') + '''>Home</a></li>
                <li><a href="services.html"''' + (' class="active"' if active_page == 'services' else '') + '''>Services</a></li>
                <li><a href="portfolio.html"''' + (' class="active"' if active_page == 'portfolio' else '') + '''>Portfolio</a></li>
                <li><a href="about.html"''' + (' class="active"' if active_page == 'about' else '') + '''>About</a></li>
                <li><a href="contact.html"''' + (' class="active"' if active_page == 'contact' else '') + '''>Contact</a></li>
            </ul>
            <a href="contact.html" class="cta-button">Contact</a>
            <button class="mobile-menu-toggle">☰</button>
        </nav>
    </header>'''
    return nav

def fix_nav(page, active):
    content = Path(page).read_text()
    pattern = r'<!-- (?:Header|Navigation) -->.*?</(?:header|nav)>\s*(?=\n\s*<!--)'
    content = re.sub(pattern, get_nav_html(active), content, flags=re.DOTALL)
    Path(page).write_text(content)
    print(f"Fixed {page}")

fix_nav('portfolio.html', 'portfolio')
fix_nav('contact.html', 'contact')
print("Done!")
