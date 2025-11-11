/* ===================================
   PERFORMANCE OPTIMIZER
   Advanced Performance Enhancements
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    } else {
        initPerformanceOptimizations();
    }

    function initPerformanceOptimizations() {
        implementLazyLoading();
        optimizeImages();
        deferNonCriticalCSS();
        preloadCriticalResources();
        implementIntersectionObserver();
        optimizeScrollPerformance();
        implementResourceHints();
        monitorCoreWebVitals();
    }

    /* ===================================
       1. LAZY LOADING IMAGES
       =================================== */
    function implementLazyLoading() {
        // Native lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        } else {
            // Fallback to Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /* ===================================
       2. IMAGE OPTIMIZATION
       =================================== */
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute if not present
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Add decoding attribute for better performance
            if (!img.hasAttribute('decoding')) {
                img.decoding = 'async';
            }

            // Add blur-up effect
            if (!img.classList.contains('no-blur')) {
                img.style.filter = 'blur(10px)';
                img.style.transition = 'filter 0.3s ease';
                
                img.addEventListener('load', function() {
                    this.style.filter = 'blur(0)';
                }, { once: true });
            }
        });
    }

    /* ===================================
       3. DEFER NON-CRITICAL CSS
       =================================== */
    function deferNonCriticalCSS() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
        
        stylesheets.forEach(link => {
            const href = link.getAttribute('href');
            link.setAttribute('media', 'print');
            link.setAttribute('onload', "this.media='all'");
            
            // Fallback for browsers that don't support onload
            setTimeout(() => {
                link.media = 'all';
            }, 100);
        });
    }

    /* ===================================
       4. PRELOAD CRITICAL RESOURCES
       =================================== */
    function preloadCriticalResources() {
        // Preload critical fonts
        const fonts = [
            '/fonts/inter-var.woff2',
            '/fonts/space-grotesk.woff2'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.href = font;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // Preload critical images
        const criticalImages = document.querySelectorAll('img[data-critical]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.dataset.src || img.src;
            document.head.appendChild(link);
        });
    }

    /* ===================================
       5. INTERSECTION OBSERVER FOR ANIMATIONS
       =================================== */
    function implementIntersectionObserver() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    element.classList.add('animate-' + animation);
                    animationObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    /* ===================================
       6. OPTIMIZE SCROLL PERFORMANCE
       =================================== */
    function optimizeScrollPerformance() {
        let ticking = false;
        let lastScrollY = window.scrollY;

        function updateScroll() {
            const scrollY = window.scrollY;
            
            // Update scroll-dependent elements
            document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
            
            // Parallax effect (throttled)
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallaxSpeed || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ===================================
       7. RESOURCE HINTS
       =================================== */
    function implementResourceHints() {
        // DNS prefetch for external domains
        const externalDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://unpkg.com'
        ];

        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // Preconnect to critical origins
        const criticalOrigins = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        criticalOrigins.forEach(origin => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = origin;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    /* ===================================
       8. CORE WEB VITALS MONITORING
       =================================== */
    function monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP monitoring not supported');
            }

            // First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID monitoring not supported');
            }

            // Cumulative Layout Shift (CLS)
            try {
                let clsScore = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                            console.log('CLS:', clsScore);
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS monitoring not supported');
            }
        }

        // Web Vitals API (if available)
        if ('web-vitals' in window) {
            window.webVitals.getCLS(console.log);
            window.webVitals.getFID(console.log);
            window.webVitals.getLCP(console.log);
        }
    }

    /* ===================================
       9. DEBOUNCE UTILITY
       =================================== */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /* ===================================
       10. THROTTLE UTILITY
       =================================== */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /* ===================================
       11. REDUCE MOTION SUPPORT
       =================================== */
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            
            // Remove animation classes
            const animatedElements = document.querySelectorAll('[data-aos], [class*="animate"]');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
        }

        // Listen for changes
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            } else {
                document.documentElement.style.setProperty('--animation-duration', '0.3s');
            }
        });
    }

    respectReducedMotion();

    /* ===================================
       12. MEMORY LEAK PREVENTION
       =================================== */
    function preventMemoryLeaks() {
        // Clean up event listeners on page unload
        window.addEventListener('beforeunload', () => {
            // Remove all event listeners
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const clone = el.cloneNode(true);
                el.parentNode.replaceChild(clone, el);
            });
        });
    }

    /* ===================================
       13. CACHE API IMPLEMENTATION
       =================================== */
    async function implementCaching() {
        if ('caches' in window) {
            const cacheName = 'hlpfl-v1';
            const criticalAssets = [
                '/',
                '/src/css/main.css',
                '/src/js/main.js',
                '/favicons/favicon.ico'
            ];

            try {
                const cache = await caches.open(cacheName);
                await cache.addAll(criticalAssets);
                console.log('Critical assets cached');
            } catch (error) {
                console.warn('Caching failed:', error);
            }
        }
    }

    implementCaching();

    /* ===================================
       14. EXPORT UTILITIES
       =================================== */
    window.performanceUtils = {
        debounce,
        throttle,
        monitorCoreWebVitals
    };

})();