"""
Remove 'Ready to work together' CTA sections from non-contact pages
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html']

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find and remove the "Ready to Launch" or "Ready to work together" section
    import re
    
    # Pattern to match the CTA section
    patterns = [
        r'<section[^>]*>[\s\S]*?Ready to Launch Your Website\?[\s\S]*?</section>',
        r'<section[^>]*>[\s\S]*?Ready to work together[\s\S]*?</section>',
        r'<section[^>]*>[\s\S]*?Ready to Get Started\?[\s\S]*?</section>',
    ]
    
    removed = False
    for pattern in patterns:
        if re.search(pattern, content, re.IGNORECASE):
            content = re.sub(pattern, '', content, flags=re.IGNORECASE)
            removed = True
            break
    
    if removed:
        print(f"  ✓ Removed CTA section")
    else:
        print(f"  - No CTA section found")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Content update complete!")
print("="*50)
print("\nRemoved 'Ready to work together' sections from:")
print("- index.html")
print("- about.html")
print("- services.html")
print("- portfolio.html")
print("\nContact page retains its CTA as expected.")