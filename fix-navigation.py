import re

# List of HTML files to update
files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the duplicate CTA button Contact link that appears after nav-links
    # Pattern: </ul> followed by <a href="contact.html" class="cta-button">Contact</a>
    pattern = r'(\s*</ul>\s*)<a href="contact\.html" class="cta-button">Contact</a>'
    replacement = r'\1'
    
    content = re.sub(pattern, replacement, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filename}")

print("\nNavigation fix complete!")