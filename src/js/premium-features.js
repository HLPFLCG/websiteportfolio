/* ===================================
   MILLION-DOLLAR WEBSITE FEATURES
   Premium Interactions & Smooth Animations
   =================================== */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initSmoothScroll();
        initFadeInOnScroll();
        initParallaxEffect();
        initCounterAnimation();
        initCursorEffect();
        initPageTransitions();
    }
    
    /* ===================================
       1. SMOOTH SCROLL
       =================================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /* ===================================
       2. FADE IN ON SCROLL
       =================================== */
    function initFadeInOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        const elements = document.querySelectorAll('.value-card, .testimonial-card, .process-step, .portfolio-card, .service-card');
        elements.forEach(el => {
            el.classList.add('fade-in-scroll');
            observer.observe(el);
        });
    }
    
    /* ===================================
       3. PARALLAX EFFECT
       =================================== */
    function initParallaxEffect() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    // Parallax for hero background
                    const heroBackground = document.querySelector('.hero-background');
                    if (heroBackground) {
                        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
                    }
                    
                    // Parallax for section backgrounds
                    const sections = document.querySelectorAll('.section');
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const offset = (window.innerHeight - rect.top) * 0.1;
                            section.style.backgroundPositionY = `${offset}px`;
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /* ===================================
       4. COUNTER ANIMATION
       =================================== */
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Animation speed
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count')) || 0;
                    
                    if (target > 0) {
                        animateCounter(counter, target, speed);
                        counter.classList.add('counted');
                    }
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function animateCounter(element, target, speed) {
        const increment = target / speed;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 1);
    }
    
    /* ===================================
       5. PREMIUM CURSOR EFFECT
       =================================== */
    function initCursorEffect() {
        // Only on desktop
        if (window.innerWidth < 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'premium-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #c87941;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Smooth cursor follow
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Scale cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#e09560';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#c87941';
            });
        });
    }
    
    /* ===================================
       6. PAGE TRANSITIONS
       =================================== */
    function initPageTransitions() {
        // Fade in page on load
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // Smooth page transitions on navigation
        const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    }
    
    /* ===================================
       7. PREMIUM LOADING INDICATOR
       =================================== */
    function showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.className = 'premium-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #c87941, #e09560);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
            z-index: 10000;
        `;
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.transform = 'scaleX(1)';
        }, 100);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }, 500);
        });
    }
    
    showLoadingIndicator();
    
})();