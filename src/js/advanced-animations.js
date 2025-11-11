// ===================================
// Advanced Animations with GSAP
// ===================================

class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Wait for GSAP to load
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded. Loading from CDN...');
            this.loadGSAP().then(() => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    loadGSAP() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
            script.onload = () => {
                const scrollTrigger = document.createElement('script');
                scrollTrigger.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
                scrollTrigger.onload = resolve;
                scrollTrigger.onerror = reject;
                document.head.appendChild(scrollTrigger);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax effect
        this.heroParallax();
        
        // Staggered card animations
        this.cardAnimations();
        
        // Section reveal animations
        this.sectionReveals();
        
        // Floating elements
        this.floatingElements();
        
        // Text reveal animations
        this.textReveals();
    }

    heroParallax() {
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (!hero || !heroBackground) return;

        gsap.to(heroBackground, {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Parallax for hero content
        gsap.to('.hero-content', {
            y: 100,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    cardAnimations() {
        const cards = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card');
        
        if (cards.length === 0) return;

        gsap.from(cards, {
            scrollTrigger: {
                trigger: cards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    sectionReveals() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    floatingElements() {
        const floatingElements = document.querySelectorAll('.float-animation');
        
        floatingElements.forEach((element, index) => {
            gsap.to(element, {
                y: -20,
                duration: 2 + (index * 0.3),
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }

    textReveals() {
        const headings = document.querySelectorAll('.section-title, .hero-title');
        
        headings.forEach(heading => {
            const text = heading.textContent;
            heading.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                heading.appendChild(span);
            });

            gsap.from(heading.children, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                rotationX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AdvancedAnimations();
    });
} else {
    new AdvancedAnimations();
}