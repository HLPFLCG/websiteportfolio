"""
Enhance footer with logo and better organization
"""

# Read all HTML files
files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

# New enhanced footer HTML
new_footer = """    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-section footer-brand">
                <div class="footer-logo">
                    <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#C87941;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#E89A6A;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#footerLogoGradient)" stroke-width="8"/>
                        <text x="100" y="120" font-family="Arial, sans-serif" font-size="80" font-weight="bold" 
                              fill="url(#footerLogoGradient)" text-anchor="middle">H</text>
                    </svg>
                </div>
                <h3>HLPFL</h3>
                <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                    Affordable, high-quality websites for first-time founders. 100% US-based work from Grand Rapids, MI.
                </p>
                <div class="footer-social">
                    <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
                    <a href="#" class="social-link" aria-label="LinkedIn">in</a>
                    <a href="#" class="social-link" aria-label="GitHub">⚡</a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Services</h3>
                <ul>
                    <li><a href="services.html">Web Development</a></li>
                    <li><a href="services.html">Web Design</a></li>
                    <li><a href="services.html">E-commerce</a></li>
                    <li><a href="services.html">SEO Optimization</a></li>
                    <li><a href="services.html">Maintenance</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Get In Touch</h3>
                <ul>
                    <li><a href="mailto:hello@hlpfl.dev">hello@hlpfl.dev</a></li>
                    <li>Grand Rapids, MI</li>
                    <li>24-hour response time</li>
                </ul>
                <a href="contact.html" class="footer-cta">Start Your Project →</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 HLPFL. All rights reserved.</p>
            <div class="footer-links">
                <a href="#" style="color: var(--primary);">Privacy Policy</a>
                <span style="color: var(--text-muted);">•</span>
                <a href="#" style="color: var(--primary);">Terms of Service</a>
                <span style="color: var(--text-muted);">•</span>
                <a href="#" style="color: var(--primary);">Cookie Policy</a>
            </div>
        </div>
    </footer>"""

# Enhanced footer CSS
footer_css = """
        /* Enhanced Footer Styles */
        footer {
            background: var(--dark-light);
            padding: 4rem 2rem 2rem;
            border-top: 1px solid rgba(200, 121, 65, 0.2);
        }
        
        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
        }
        
        .footer-brand {
            display: flex;
            flex-direction: column;
        }
        
        .footer-logo {
            margin-bottom: 1rem;
        }
        
        .footer-logo svg {
            width: 80px;
            height: 80px;
        }
        
        .footer-section h3 {
            color: var(--primary);
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section ul li {
            margin-bottom: 0.75rem;
        }
        
        .footer-section a {
            color: var(--text-muted);
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .footer-section a:hover {
            color: var(--primary);
            transform: translateX(5px);
        }
        
        .footer-social {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .social-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(200, 121, 65, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 1.25rem;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-3px) !important;
        }
        
        .footer-cta {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .footer-cta:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 30px rgba(200, 121, 65, 0.4);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .footer-links {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        @media (max-width: 968px) {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .footer-bottom {
                flex-direction: column;
                text-align: center;
            }
        }
"""

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add footer CSS before </style>
    style_close_pos = content.rfind('</style>')
    if style_close_pos != -1:
        # Check if footer styles already exist
        if 'Enhanced Footer Styles' not in content:
            content = content[:style_close_pos] + footer_css + '\n    ' + content[style_close_pos:]
            print(f"  ✓ Added enhanced footer CSS")
    
    # Replace footer HTML
    import re
    footer_pattern = r'<!-- Footer -->.*?</footer>'
    if re.search(footer_pattern, content, re.DOTALL):
        content = re.sub(footer_pattern, new_footer.strip(), content, flags=re.DOTALL)
        print(f"  ✓ Updated footer HTML")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Footer enhancement complete!")
print("="*50)
print("\nEnhancements:")
print("- Added HLPFL logo to footer")
print("- Reorganized footer sections")
print("- Added social media links")
print("- Added 'Start Your Project' CTA button")
print("- Improved footer bottom with policy links")
print("- Enhanced hover effects")
print("- Better responsive design")