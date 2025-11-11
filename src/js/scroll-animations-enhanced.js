/* ============================================
   ENHANCED SCROLL ANIMATIONS
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
        initParallaxScrolling();
        initStaggeredAnimations();
        initScrollReveal();
        initCounterAnimations();
    }
    
    // Parallax Scrolling Effect
    function initParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Staggered Animations for Lists and Grids
    function initStaggeredAnimations() {
        const staggerGroups = document.querySelectorAll('[data-stagger]');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.dataset.stagger) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = `all 0.6s ease ${index * delay}ms`;
            });
            
            // Observe when group enters viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach(child => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(group);
        });
    }
    
    // Scroll Reveal for Sections
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const direction = entry.target.dataset.reveal || 'up';
                    entry.target.classList.add(`reveal-${direction}`);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Animated Counters
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const suffix = counter.dataset.suffix || '';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter, target, duration, suffix);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    function animateCounter(element, target, duration, suffix) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    // Smooth Section Transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
})();