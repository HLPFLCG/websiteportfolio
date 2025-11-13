"""
Fix footer CTA button styling to ensure text is visible
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update footer-cta CSS to ensure text is visible
    old_cta_css = '''        .footer-cta {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
        }'''
    
    new_cta_css = '''        .footer-cta {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white !important;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            font-size: 1rem;
        }'''
    
    if old_cta_css in content:
        content = content.replace(old_cta_css, new_cta_css)
        print(f"  ✓ Updated footer-cta CSS")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Footer CTA button styling fixed!")
print("="*50)