"""
Restore index.html with all Phase 2 enhancements
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Enhanced Loading Screen CSS (black/orange with particles)
enhanced_loading_css = """
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

# Find where to insert (before closing </style>)
style_close = content.rfind('</style>')
if style_close != -1 and 'Enhanced Loading Screen' not in content:
    content = content[:style_close] + enhanced_loading_css + '\n    ' + content[style_close:]
    print("✓ Added enhanced loading screen CSS")

# Save
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Index.html restored with enhancements")
print("✓ Ready to commit and deploy")