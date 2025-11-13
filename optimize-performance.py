"""
Add performance and security optimizations
"""

files = ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']

# Performance optimization meta tags and attributes
performance_meta = """
    <!-- Performance & Security -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    
    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta name="referrer" content="strict-origin-when-cross-origin">
"""

# Performance CSS
performance_css = """
        /* Performance Optimizations */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
        
        /* Optimize images */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        
        /* GPU acceleration for animations */
        .service-card,
        .portfolio-card,
        .value-card,
        .pricing-card,
        .cta-button,
        .btn {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
        }
        
        /* Optimize font loading */
        @font-face {
            font-display: swap;
        }
"""

# Performance JavaScript
performance_js = """
        // Performance Optimizations
        
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
        
        // Debounce scroll events for better performance
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
        
        // Optimize scroll event listeners
        const optimizedScroll = debounce(() => {
            // Scroll-based animations
        }, 10);
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
        
        // Preload critical resources
        function preloadCriticalResources() {
            const criticalLinks = document.querySelectorAll('a[href*="contact"], a[href*="services"]');
            criticalLinks.forEach(link => {
                const url = link.getAttribute('href');
                if (url && !url.startsWith('#')) {
                    const preloadLink = document.createElement('link');
                    preloadLink.rel = 'prefetch';
                    preloadLink.href = url;
                    document.head.appendChild(preloadLink);
                }
            });
        }
        
        // Preload on idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadCriticalResources);
        } else {
            setTimeout(preloadCriticalResources, 2000);
        }
        
        // Service Worker for offline support (optional)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Uncomment to enable service worker
                // navigator.serviceWorker.register('/sw.js');
            });
        }
        
        // Monitor performance
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                }
            });
            
            try {
                perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Browser doesn't support this metric
            }
        }
        
        // Optimize form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }
            });
        });
"""

for filename in files:
    print(f"\nProcessing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add performance meta tags
    if 'Performance & Security' not in content:
        head_close_pos = content.find('</head>')
        if head_close_pos != -1:
            content = content[:head_close_pos] + performance_meta + '\n' + content[head_close_pos:]
            print(f"  ✓ Added performance meta tags")
    
    # Add performance CSS
    if 'Performance Optimizations' not in content:
        style_close_pos = content.rfind('</style>')
        if style_close_pos != -1:
            content = content[:style_close_pos] + performance_css + '\n    ' + content[style_close_pos:]
            print(f"  ✓ Added performance CSS")
    
    # Add performance JavaScript
    if 'Performance Optimizations' not in content or 'debounce' not in content:
        script_close_pos = content.rfind('</script>')
        if script_close_pos != -1:
            content = content[:script_close_pos] + performance_js + '\n    ' + content[script_close_pos:]
            print(f"  ✓ Added performance JavaScript")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("\n" + "="*50)
print("Performance & Security optimizations complete!")
print("="*50)
print("\nOptimizations:")
print("- Security headers (X-Content-Type-Options, X-Frame-Options)")
print("- DNS prefetch for faster resource loading")
print("- GPU acceleration for animations")
print("- Reduced motion support for accessibility")
print("- Debounced scroll events")
print("- Lazy loading support")
print("- Resource prefetching")
print("- Performance monitoring")
print("- Optimized font loading")
print("- Form submission optimization")