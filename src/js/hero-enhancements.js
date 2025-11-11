/* ============================================
   HERO SECTION ENHANCEMENTS
   ============================================ */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initEnhancedParticles();
        initScrollIndicator();
        initHeroAnimations();
        initTypedEnhancement();
    }
    
    // Enhanced Particles.js Configuration
    function initEnhancedParticles() {
        if (typeof particlesJS === 'undefined') return;
        
        // Support multiple particle containers for different pages
        const particleContainers = [
            'particles-js',
            'particles-js-services',
            'particles-js-contact',
            'particles-js-portfolio',
            'particles-js-pricing',
            'particles-js-about'
        ];
        
        particleContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                initParticlesForContainer(containerId);
            }
        });
    }
    
    function initParticlesForContainer(containerId) {
        particlesJS(containerId, {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#c87941', '#2c5f6f', '#ffffff']
                },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#c87941',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        
        // Reduce particles on mobile
        if (window.innerWidth < 768) {
            particlesJS(containerId, {
                particles: {
                    number: {
                        value: 40
                    }
                }
            });
        }
    }
    
    // Scroll Indicator
    function initScrollIndicator() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create scroll indicator if it doesn't exist
        let scrollIndicator = hero.querySelector('.scroll-indicator');
        if (!scrollIndicator) {
            scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = `
                <div class="scroll-indicator-icon"></div>
                <div class="scroll-indicator-text">Scroll</div>
            `;
            hero.appendChild(scrollIndicator);
        }
        
        // Smooth scroll on click
        scrollIndicator.addEventListener('click', () => {
            const nextSection = hero.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Hero Animations
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const heroFeatures = document.querySelector('.hero-features');
        
        // Stagger animations
        const elements = [heroTitle, heroSubtitle, heroCta, heroFeatures];
        elements.forEach((el, index) => {
            if (el) {
                el.style.animationDelay = `${index * 0.3}s`;
            }
        });
        
        // Add floating animation to certain elements
        const floatingElements = document.querySelectorAll('.hero-feature');
        floatingElements.forEach((el, index) => {
            el.classList.add('floating');
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Enhanced Typed.js
    function initTypedEnhancement() {
        // Wait for Typed.js to be loaded
        if (typeof Typed === 'undefined') {
            setTimeout(initTypedEnhancement, 100);
            return;
        }
        
        const typedElement = document.querySelector('.typed-text');
        if (!typedElement) return;
        
        // Check if Typed instance already exists
        if (typedElement.dataset.typedInitialized) return;
        
        new Typed('.typed-text', {
            strings: [
                'Web Development',
                'Digital Solutions',
                'Portfolio Sites',
                'Business Platforms',
                'Custom Applications'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
        
        typedElement.dataset.typedInitialized = 'true';
    }
    
    // Parallax Effect on Mouse Move
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        hero.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }
    
    // Dynamic gradient based on time of day
    function updateGradientByTime() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const hour = new Date().getHours();
        let gradient;
        
        if (hour >= 6 && hour < 12) {
            // Morning - lighter, warmer
            gradient = 'linear-gradient(135deg, #2d323c 0%, #c87941 50%, #e09560 100%)';
        } else if (hour >= 12 && hour < 18) {
            // Afternoon - bright, vibrant
            gradient = 'linear-gradient(135deg, #1a1d23 0%, #2c5f6f 50%, #3d7a8c 100%)';
        } else if (hour >= 18 && hour < 22) {
            // Evening - warm, rich
            gradient = 'linear-gradient(135deg, #1a1d23 0%, #c87941 50%, #2c5f6f 100%)';
        } else {
            // Night - dark, cool
            gradient = 'linear-gradient(135deg, #0a0e27 0%, #1a1d23 50%, #2d323c 100%)';
        }
        
        // Apply gradient with animation
        hero.style.background = gradient;
        hero.style.backgroundSize = '400% 400%';
    }
    
    // Update gradient on load
    updateGradientByTime();
    
})();