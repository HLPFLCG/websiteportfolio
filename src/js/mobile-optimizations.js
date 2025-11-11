// ===================================
// Mobile Optimizations & Touch Interactions
// ===================================

class MobileOptimizations {
    constructor() {
        this.isTouch = 'ontouchstart' in window;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        if (this.isTouch || this.isMobile) {
            this.setupTouchInteractions();
            this.optimizeForMobile();
            this.setupSwipeGestures();
            this.preventZoomOnDoubleTap();
        }
        
        this.setupReducedMotion();
        this.optimizeScrollPerformance();
    }

    setupTouchInteractions() {
        // Add touch-friendly classes
        document.documentElement.classList.add('touch-device');
        
        // Improve tap targets
        const buttons = document.querySelectorAll('button, a, .clickable');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
        });

        // Add touch feedback
        document.addEventListener('touchstart', (e) => {
            if (e.target.matches('button, a, .card')) {
                e.target.classList.add('touch-active');
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (e.target.matches('button, a, .card')) {
                setTimeout(() => {
                    e.target.classList.remove('touch-active');
                }, 150);
            }
        }, { passive: true });
    }

    optimizeForMobile() {
        // Disable hover effects on mobile
        if (this.isMobile) {
            const style = document.createElement('style');
            style.textContent = `
                @media (hover: none) {
                    *:hover {
                        /* Disable hover effects on touch devices */
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Optimize images for mobile
        this.optimizeMobileImages();

        // Lazy load off-screen content
        this.lazyLoadMobileContent();
    }

    setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });
    }

    handleSwipe(startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;
        const threshold = 50;

        // Horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                this.onSwipeRight();
            } else {
                this.onSwipeLeft();
            }
        }
        
        // Vertical swipe
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
            if (diffY > 0) {
                this.onSwipeDown();
            } else {
                this.onSwipeUp();
            }
        }
    }

    onSwipeLeft() {
        // Handle swipe left (e.g., next item in carousel)
        window.dispatchEvent(new CustomEvent('swipeLeft'));
    }

    onSwipeRight() {
        // Handle swipe right (e.g., previous item in carousel)
        window.dispatchEvent(new CustomEvent('swipeRight'));
    }

    onSwipeUp() {
        // Handle swipe up
        window.dispatchEvent(new CustomEvent('swipeUp'));
    }

    onSwipeDown() {
        // Handle swipe down
        window.dispatchEvent(new CustomEvent('swipeDown'));
    }

    preventZoomOnDoubleTap() {
        let lastTouchEnd = 0;
        
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }

    setupReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            if (e.matches) {
                document.documentElement.classList.add('reduce-motion');
                this.disableAnimations();
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        };

        handleMotionPreference(prefersReducedMotion);
        prefersReducedMotion.addEventListener('change', handleMotionPreference);
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            .reduce-motion *,
            .reduce-motion *::before,
            .reduce-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeScrollPerformance() {
        // Use passive event listeners for scroll
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    handleScroll() {
        // Optimized scroll handler
        const scrollY = window.scrollY;
        
        // Update scroll-dependent elements
        window.dispatchEvent(new CustomEvent('optimizedScroll', {
            detail: { scrollY }
        }));
    }

    optimizeMobileImages() {
        if (!this.isMobile) return;

        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Use smaller images on mobile
            if (img.dataset.mobileSrc && window.innerWidth < 768) {
                img.src = img.dataset.mobileSrc;
            }
        });
    }

    lazyLoadMobileContent() {
        if (!this.isMobile) return;

        // Lazy load heavy content on mobile
        const heavyContent = document.querySelectorAll('[data-mobile-lazy]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        heavyContent.forEach(content => observer.observe(content));
    }
}

// Touch Handler for specific elements
class TouchHandler {
    constructor(element) {
        this.element = element;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.init();
    }

    init() {
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.startX || !this.startY) return;

        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;

        const diffX = this.currentX - this.startX;
        const diffY = this.currentY - this.startY;

        // Prevent default if horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }

        this.onMove(diffX, diffY);
    }

    handleTouchEnd() {
        const diffX = this.currentX - this.startX;
        const diffY = this.currentY - this.startY;

        this.onEnd(diffX, diffY);

        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
    }

    onMove(diffX, diffY) {
        // Override in subclass
    }

    onEnd(diffX, diffY) {
        // Override in subclass
    }
}

// Initialize mobile optimizations
const mobileOptimizations = new MobileOptimizations();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobileOptimizations, TouchHandler };
}