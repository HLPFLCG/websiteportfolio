"""
Add cookie consent banner to all pages
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

# Cookie banner CSS
cookie_css = """
        /* Cookie Consent Banner */
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--dark-light);
            border-top: 2px solid var(--primary);
            padding: 1.5rem 2rem;
            z-index: 9998;
            transform: translateY(100%);
            transition: transform 0.4s ease;
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
        }
        
        .cookie-banner.show {
            transform: translateY(0);
        }
        
        .cookie-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .cookie-text {
            flex: 1;
            min-width: 300px;
        }
        
        .cookie-text p {
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 0.5rem;
        }
        
        .cookie-text a {
            color: var(--primary);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .cookie-text a:hover {
            color: var(--primary-light);
        }
        
        .cookie-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .cookie-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            font-size: 1rem;
        }
        
        .cookie-btn-accept {
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
        }
        
        .cookie-btn-accept:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(200, 121, 65, 0.4);
        }
        
        .cookie-btn-decline {
            background: transparent;
            border: 2px solid rgba(200, 121, 65, 0.3);
            color: var(--text-muted);
        }
        
        .cookie-btn-decline:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
        
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                text-align: center;
            }
            
            .cookie-actions {
                width: 100%;
                justify-content: center;
            }
            
            .cookie-btn {
                flex: 1;
            }
        }
"""

# Cookie banner HTML
cookie_html = """
    <!-- Cookie Consent Banner -->
    <div class="cookie-banner" id="cookieBanner">
        <div class="cookie-content">
            <div class="cookie-text">
                <p>
                    <strong>🍪 We use cookies</strong> to enhance your browsing experience and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies. 
                    <a href="#" onclick="event.preventDefault();">Learn more</a>
                </p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept All</button>
                <button class="cookie-btn cookie-btn-decline" onclick="declineCookies()">Decline</button>
            </div>
        </div>
    </div>
"""

# Cookie banner JavaScript
cookie_js = """
        // Cookie Consent Banner
        function showCookieBanner() {
            const banner = document.getElementById('cookieBanner');
            const consent = localStorage.getItem('cookieConsent');
            
            if (!consent) {
                setTimeout(() => {
                    banner.classList.add('show');
                }, 1000);
            }
        }
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
        }
        
        function declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieBanner();
        }
        
        function hideCookieBanner() {
            const banner = document.getElementById('cookieBanner');
            banner.classList.remove('show');
        }
        
        // Show banner on page load
        showCookieBanner();
"""

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add cookie CSS
    if 'Cookie Consent Banner' not in content:
        style_close_pos = content.rfind('</style>')
        if style_close_pos != -1:
            content = content[:style_close_pos] + cookie_css + '\n    ' + content[style_close_pos:]
            print(f"  ✓ Added cookie banner CSS")
    
    # Add cookie HTML before closing body tag
    if 'id="cookieBanner"' not in content:
        body_close_pos = content.rfind('</body>')
        if body_close_pos != -1:
            content = content[:body_close_pos] + cookie_html + '\n' + content[body_close_pos:]
            print(f"  ✓ Added cookie banner HTML")
    
    # Add cookie JavaScript
    if 'showCookieBanner' not in content:
        script_close_pos = content.rfind('</script>')
        if script_close_pos != -1:
            content = content[:script_close_pos] + cookie_js + '\n    ' + content[script_close_pos:]
            print(f"  ✓ Added cookie banner JavaScript")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Cookie banner added successfully!")
print("="*50)
print("\nFeatures:")
print("- Appears 1 second after page load")
print("- Stores user preference in localStorage")
print("- Accept/Decline buttons")
print("- Responsive design")
print("- Smooth slide-up animation")
print("- Only shows once per user")