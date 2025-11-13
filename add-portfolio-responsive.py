with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the responsive section and add portfolio-grid
old_responsive = '.testimonials-grid,\n               .pricing-grid {'
new_responsive = '.testimonials-grid,\n               .pricing-grid,\n               .portfolio-grid {'

content = content.replace(old_responsive, new_responsive)

with open('portfolio.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Added portfolio-grid to responsive styles")