"""
Enhance loading screen with black/orange background and floating particles
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

# Enhanced loading screen CSS
loading_css = """
        /* Enhanced Loading Screen */
        #loadingScreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000 0%, #1a0a00 50%, #000000 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        #loadingScreen.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        /* Floating Particles Background */
        .loading-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        
        .particle {
            position: absolute;
            background: radial-gradient(circle, rgba(200, 121, 65, 0.8) 0%, rgba(200, 121, 65, 0) 70%);
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) scale(1);
                opacity: 0;
            }
        }
        
        /* Loading Content */
        .loading-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }
        
        .loading-logo {
            width: 300px;
            height: auto;
            filter: drop-shadow(0 0 30px rgba(200, 121, 65, 0.5));
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% {
                filter: drop-shadow(0 0 30px rgba(200, 121, 65, 0.5));
            }
            50% {
                filter: drop-shadow(0 0 50px rgba(200, 121, 65, 0.8));
            }
        }
        
        .loading-bar-container {
            width: 300px;
            height: 8px;
            background: rgba(200, 121, 65, 0.2);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 20px rgba(200, 121, 65, 0.3);
        }
        
        .loading-bar {
            height: 100%;
            background: linear-gradient(90deg, 
                var(--primary) 0%, 
                var(--primary-light) 50%, 
                var(--primary) 100%);
            background-size: 200% 100%;
            border-radius: 10px;
            transition: width 0.3s ease;
            animation: shimmer 1.5s linear infinite;
            box-shadow: 0 0 20px rgba(200, 121, 65, 0.6);
        }
        
        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }
        
        .loading-percentage {
            margin-top: 1rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-shadow: 0 0 20px rgba(200, 121, 65, 0.5);
        }
"""

# JavaScript to create particles
particles_js = """
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.querySelector('.loading-particles');
            if (!particlesContainer) return;
            
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 2px and 8px
                const size = Math.random() * 6 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random horizontal position
                particle.style.left = Math.random() * 100 + '%';
                
                // Random animation duration between 10s and 20s
                const duration = Math.random() * 10 + 10;
                particle.style.animationDuration = duration + 's';
                
                // Random delay
                const delay = Math.random() * 5;
                particle.style.animationDelay = delay + 's';
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Initialize particles
        createParticles();
"""

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add enhanced loading CSS
    if 'Enhanced Loading Screen' not in content:
        style_close_pos = content.rfind('</style>')
        if style_close_pos != -1:
            content = content[:style_close_pos] + loading_css + '\n    ' + content[style_close_pos:]
            print(f"  ✓ Added enhanced loading screen CSS")
    
    # Update loading screen HTML to include particles container
    old_loading = '<div id="loadingScreen">'
    new_loading = '''<div id="loadingScreen">
        <div class="loading-particles"></div>
        <div class="loading-content">'''
    
    if old_loading in content and '<div class="loading-particles"></div>' not in content:
        content = content.replace(old_loading, new_loading)
        
        # Close the loading-content div before closing loadingScreen
        # Find the closing of loadingScreen and add closing div
        loading_screen_close = content.find('</div>', content.find('id="loadingScreen"'))
        if loading_screen_close != -1:
            # Insert closing div for loading-content
            content = content[:loading_screen_close] + '    </div>\n    ' + content[loading_screen_close:]
        
        print(f"  ✓ Updated loading screen HTML structure")
    
    # Add particles JavaScript
    if 'createParticles' not in content:
        # Find the loading screen script section
        script_pos = content.find('// Loading Screen')
        if script_pos != -1:
            # Insert particles JS after the loading screen comment
            insert_pos = content.find('\n', script_pos) + 1
            content = content[:insert_pos] + particles_js + '\n' + content[insert_pos:]
            print(f"  ✓ Added particles JavaScript")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Loading screen enhancement complete!")
print("="*50)
print("\nEnhancements:")
print("- Black/orange gradient background")
print("- Floating particles animation")
print("- Enhanced logo glow effect")
print("- Shimmer effect on progress bar")
print("- Improved visual appeal")