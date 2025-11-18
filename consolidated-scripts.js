// HLPFL Website - Consolidated Scripts
// Handles loading screen, persistent sparkled background, easter eggs, and common functionality

(function() {
    'use strict';

    // Initialize sparkled background (persistent across all pages)
    function initSparkledBackground() {
        // Check if background already exists
        if (document.querySelector('.sparkled-background')) {
            return;
        }

        const sparkledBg = document.createElement('div');
        sparkledBg.className = 'sparkled-background';
        document.body.insertBefore(sparkledBg, document.body.firstChild);

        // Create sparkles
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random size between 1-3px
            const size = Math.random() * 2 + 1;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            
            // Random position
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            sparkle.style.animationDelay = Math.random() * 8 + 's';
            sparkle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            sparkledBg.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 8000);
        }

        // Create initial sparkles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createSparkle(), Math.random() * 2000);
        }

        // Continuously create new sparkles
        setInterval(createSparkle, 300);
    }

    // Enhanced Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        const loadingBar = document.getElementById('loadingBar');
        const loadingPercentage = document.getElementById('loadingPercentage');
        const loadingParticles = document.querySelector('.loading-particles');

        // Create loading particles
        if (loadingParticles) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'loading-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                loadingParticles.appendChild(particle);
            }
        }

        let progress = 0;
        const startTime = Date.now();
        const minLoadTime = 2000; // Minimum 2 seconds loading time

        const loadingInterval = setInterval(() => {
            // Variable speed for more realistic loading
            const increment = Math.random() * 15 + 5;
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);

                // Ensure minimum load time
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadTime - elapsedTime);

                setTimeout(() => {
                    completeLoading();
                }, remainingTime);
            }

            // Update UI
            updateLoadingUI(progress);
        }, 150);

        function updateLoadingUI(currentProgress) {
            if (loadingBar) {
                loadingBar.style.width = currentProgress + '%';
            }
            if (loadingPercentage) {
                loadingPercentage.textContent = Math.floor(currentProgress) + '%';
            }
        }

        function completeLoading() {
            // Fade out loading screen
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen after fade out
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 1500);

            // Initialize page-specific functionality
            initPageFeatures();
        }

        // Fallback: Ensure loading screen completes on window load
        window.addEventListener('load', () => {
            if (progress < 100) {
                setTimeout(() => {
                    if (progress < 100) {
                        progress = 100;
                        updateLoadingUI(progress);
                        setTimeout(completeLoading, 300);
                    }
                }, minLoadTime);
            }
        });
    }

    // Initialize page-specific features after loading
    function initPageFeatures() {
        // Smooth scroll for navigation links
        initSmoothScroll();
        
        // Scroll indicator
        initScrollIndicator();
        
        // Any other page-specific initializations
        initAnimations();
    }

    // Smooth scrolling
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll indicator functionality
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('section');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Initialize animations on scroll
    function initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animations
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Navigation functionality
    function initNavigation() {
        // Mobile menu toggle (if needed)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Contact form handling (if present)
    function initContactForm() {
        const form = document.querySelector('#contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Here you would normally send the data to a server
                console.log('Form submitted:', data);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                successMessage.style.cssText = `
                    background: var(--primary);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    text-align: center;
                `;
                
                form.appendChild(successMessage);
                form.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            });
        }
    }

    // Easter Eggs Initialization
    function initEasterEggs() {
        // Logo Triple Click Easter Egg
        const logo = document.querySelector('.logo');
        if (logo) {
            let clickCount = 0;
            let clickTimer;
            
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                clickCount++;
                logo.classList.remove('click-1', 'click-2', 'click-3');
                logo.classList.add(`click-${clickCount}`);
                
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {
                    if (clickCount === 3) {
                        showLogoEasterEgg();
                    }
                    clickCount = 0;
                    logo.classList.remove('click-1', 'click-2', 'click-3');
                }, 500);
            });
        }

        // Konami Code Easter Egg
        let konamiCode = [];
        const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konamiPattern.join(',')) {
                activateKonamiCode();
            }
        });

        // Secret Navigation Easter Egg (Hold Shift + N)
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'N') {
                toggleSecretNav();
            }
        });

        // Hidden Text Easter Eggs
        initHiddenTextEggs();

        // Matrix Rain Easter Egg (Type "matrix" anywhere)
        let matrixTyping = [];
        document.addEventListener('keypress', (e) => {
            matrixTyping.push(e.key);
            matrixTyping = matrixTyping.slice(-6);
            
            if (matrixTyping.join('') === 'matrix') {
                activateMatrixRain();
                matrixTyping = [];
            }
        });
    }

    // Logo Easter Egg Message
    function showLogoEasterEgg() {
        const messages = [
            "You found the secret! 🎉",
            "HLPFL - Where dreams become websites ✨",
            "You've unlocked the premium experience! 🚀",
            "Secret mode activated! 🎯",
            "Welcome to the inner circle! 🌟"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        createFloatingMessage(randomMessage);
    }

    // Create floating message
    function createFloatingMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #c87941, #e09560);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10002;
            animation: floatMessage 3s ease forwards;
            box-shadow: 0 20px 40px rgba(200, 121, 65, 0.5);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Konami Code Activation
    function activateKonamiCode() {
        document.body.classList.add('konami-active');
        createFloatingMessage("🎮 KONAMI CODE ACTIVATED! 🎮");
        
        // Add rainbow effect to all links temporarily
        const links = document.querySelectorAll('a, .btn');
        links.forEach(link => {
            link.style.animation = 'rainbow 2s linear infinite';
        });
        
        setTimeout(() => {
            document.body.classList.remove('konami-active');
            links.forEach(link => {
                link.style.animation = '';
            });
        }, 5000);
    }

    // Secret Navigation Toggle
    function toggleSecretNav() {
        let secretNav = document.querySelector('.secret-nav');
        if (!secretNav) {
            secretNav = document.createElement('div');
            secretNav.className = 'secret-nav';
            secretNav.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 1rem;">🔓 Secret Navigation</h4>
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="btn" style="display: block; width: 100%; margin-bottom: 0.5rem;">Top</button>
                <button onclick="document.querySelector('.hero').scrollIntoView({behavior: 'smooth'})" class="btn" style="display: block; width: 100%; margin-bottom: 0.5rem;">Hero</button>
                <button onclick="document.querySelector('footer').scrollIntoView({behavior: 'smooth'})" class="btn" style="display: block; width: 100%;">Footer</button>
            `;
            document.body.appendChild(secretNav);
        }
        
        secretNav.classList.toggle('active');
    }

    // Hidden Text Easter Eggs
    function initHiddenTextEggs() {
        // Add secret messages to certain elements
        const secretTexts = [
            { selector: '.hero h1', text: " Excellence in every pixel " },
            { selector: '.btn', text: " Click with purpose " },
            { selector: '.section-title', text: " Crafted with passion " }
        ];

        secretTexts.forEach(({ selector, text }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.title = text;
                element.addEventListener('mouseenter', () => {
                    if (Math.random() > 0.9) { // 10% chance
                        element.style.position = 'relative';
                        element.setAttribute('data-secret', text);
                    }
                });
            });
        });
    }

    // Matrix Rain Effect
    function activateMatrixRain() {
        let matrixRain = document.querySelector('.matrix-rain');
        if (!matrixRain) {
            matrixRain = document.createElement('div');
            matrixRain.className = 'matrix-rain';
            document.body.appendChild(matrixRain);
        }

        matrixRain.classList.add('active');
        createFloatingMessage("💻 MATRIX MODE ACTIVATED! 💻");

        // Create matrix columns
        for (let i = 0; i < 50; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = Math.random() * 100 + '%';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.animationDelay = Math.random() * 2 + 's';
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += Math.random() > 0.5 ? '1' : '0';
            }
            column.textContent = text;
            
            matrixRain.appendChild(column);
        }

        setTimeout(() => {
            matrixRain.classList.remove('active');
            setTimeout(() => {
                matrixRain.innerHTML = '';
            }, 1000);
        }, 5000);
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initSparkledBackground();
        initLoadingScreen();
        initNavigation();
        initContactForm();
        initEasterEggs();
    });

    // Initialize sparkled background immediately for better visual effect
    initSparkledBackground();

})();