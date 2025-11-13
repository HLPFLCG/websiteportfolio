"""
Add subtle animations and easter eggs to the website
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

# Animations and Easter Eggs CSS
animations_css = """
        /* Subtle Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Logo hover animation */
        .logo:hover {
            animation: bounce 0.6s ease;
        }
        
        /* Button ripple effect */
        .cta-button, .btn-primary, .form-submit {
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::after, .btn-primary::after, .form-submit::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .cta-button:active::after, .btn-primary:active::after, .form-submit:active::after {
            width: 300px;
            height: 300px;
        }
        
        /* Konami Code Easter Egg */
        .konami-active {
            animation: rainbow 3s linear infinite;
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        /* Secret Developer Mode */
        .dev-mode-active * {
            outline: 1px solid rgba(200, 121, 65, 0.3) !important;
        }
        
        /* Shake animation for errors */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s;
        }
        
        /* Floating animation for icons */
        @keyframes float-icon {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .service-icon, .value-icon, .contact-method-icon {
            animation: float-icon 3s ease-in-out infinite;
        }
        
        /* Stagger animation delays for icons */
        .service-icon:nth-child(1), .value-icon:nth-child(1) {
            animation-delay: 0s;
        }
        
        .service-icon:nth-child(2), .value-icon:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .service-icon:nth-child(3), .value-icon:nth-child(3) {
            animation-delay: 0.4s;
        }
"""

# Easter Eggs JavaScript
easter_eggs_js = """
        // Easter Eggs and Animations
        
        // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join('') === konamiSequence.join('')) {
                activateKonamiMode();
            }
        });
        
        function activateKonamiMode() {
            document.body.classList.add('konami-active');
            
            // Create confetti effect
            for (let i = 0; i < 50; i++) {
                createConfetti();
            }
            
            setTimeout(() => {
                document.body.classList.remove('konami-active');
            }, 5000);
            
            console.log('🎮 Konami Code Activated! You found the secret!');
        }
        
        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Add fall animation for confetti
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Developer Mode (Press 'D' 3 times quickly)
        let dPresses = 0;
        let dTimer;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' || e.key === 'D') {
                dPresses++;
                clearTimeout(dTimer);
                
                if (dPresses === 3) {
                    toggleDevMode();
                    dPresses = 0;
                }
                
                dTimer = setTimeout(() => {
                    dPresses = 0;
                }, 1000);
            }
        });
        
        function toggleDevMode() {
            document.body.classList.toggle('dev-mode-active');
            const isActive = document.body.classList.contains('dev-mode-active');
            console.log(isActive ? '🔧 Developer Mode: ON' : '🔧 Developer Mode: OFF');
        }
        
        // Logo click counter (10 clicks = surprise)
        let logoClicks = 0;
        const logo = document.querySelector('.logo');
        
        if (logo) {
            logo.addEventListener('click', () => {
                logoClicks++;
                
                if (logoClicks === 10) {
                    logoSurprise();
                    logoClicks = 0;
                }
            });
        }
        
        function logoSurprise() {
            const messages = [
                '🎉 You found the secret!',
                '🚀 Keep clicking for more surprises!',
                '💎 You are persistent!',
                '🌟 Achievement Unlocked: Logo Master',
                '🎨 Thanks for exploring!'
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            // Create toast notification
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #C87941, #E89A6A);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                box-shadow: 0 10px 40px rgba(200, 121, 65, 0.4);
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideInRight 0.5s ease reverse';
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }
        
        // Add smooth reveal on scroll for elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        document.querySelectorAll('.service-card, .portfolio-card, .value-card, .pricing-card').forEach(el => {
            observer.observe(el);
        });
"""

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add animations CSS
    if 'Subtle Animations' not in content:
        style_close_pos = content.rfind('</style>')
        if style_close_pos != -1:
            content = content[:style_close_pos] + animations_css + '\n    ' + content[style_close_pos:]
            print(f"  ✓ Added animations CSS")
    
    # Add easter eggs JavaScript
    if 'Easter Eggs and Animations' not in content:
        script_close_pos = content.rfind('</script>')
        if script_close_pos != -1:
            content = content[:script_close_pos] + easter_eggs_js + '\n    ' + content[script_close_pos:]
            print(f"  ✓ Added easter eggs JavaScript")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Animations and Easter Eggs added!")
print("="*50)
print("\nFeatures:")
print("- Smooth fade-in animations for cards")
print("- Floating icon animations")
print("- Button ripple effects")
print("- Logo bounce on hover")
print("\nEaster Eggs:")
print("- Konami Code (↑↑↓↓←→←→BA) - Rainbow mode + confetti")
print("- Press 'D' 3 times quickly - Developer mode (shows outlines)")
print("- Click logo 10 times - Secret surprise message")
print("- Smooth scroll behavior throughout")