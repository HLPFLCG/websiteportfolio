/* ============================================
   SMOOTH PAGE TRANSITIONS
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
        initPageTransitions();
        initScrollMemory();
        initBackButtonHandling();
    }
    
    // Page Transitions
    function initPageTransitions() {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.classList.add('page-transition-overlay');
        document.body.appendChild(overlay);
        
        // Fade in on page load
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 300);
        });
        
        // Intercept internal links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a:not([href^="http"]):not([href^="#"]):not([target="_blank"])');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's a hash link or external
                if (!href || href.startsWith('#') || href.startsWith('http') || this.target === '_blank') {
                    return;
                }
                
                e.preventDefault();
                
                // Show transition
                overlay.classList.add('active');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            });
        });
    }
    
    // Remember scroll position
    function initScrollMemory() {
        // Save scroll position before leaving
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('scrollPosition', window.pageYOffset);
        });
        
        // Restore scroll position on load
        window.addEventListener('load', () => {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(scrollPosition));
                    sessionStorage.removeItem('scrollPosition');
                }, 100);
            }
        });
    }
    
    // Back button handling
    function initBackButtonHandling() {
        // Detect back button
        window.addEventListener('popstate', () => {
            // Add smooth transition when using back button
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
    
    // Loading indicator for slow connections
    let loadingTimeout;
    window.addEventListener('beforeunload', () => {
        loadingTimeout = setTimeout(() => {
            const loader = document.createElement('div');
            loader.classList.add('page-loader');
            loader.innerHTML = '<div class="loader-spinner"></div>';
            document.body.appendChild(loader);
        }, 500); // Show loader if page takes more than 500ms
    });
    
    window.addEventListener('load', () => {
        clearTimeout(loadingTimeout);
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.remove();
        }
    });
    
})();