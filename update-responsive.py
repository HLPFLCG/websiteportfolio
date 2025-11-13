with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add services-grid to the responsive styles
old_text = '.testimonials-grid,\n               .pricing-grid {'
new_text = '.testimonials-grid,\n               .pricing-grid,\n               .services-grid {'

content = content.replace(old_text, new_text)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated responsive styles for services-grid")