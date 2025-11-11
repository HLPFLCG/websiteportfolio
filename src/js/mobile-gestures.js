/* ===================================
   MOBILE GESTURES & INTERACTIONS
   Advanced Touch Support
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileGestures);
    } else {
        initMobileGestures();
    }

    function initMobileGestures() {
        // Only initialize on mobile devices
        if (!isMobileDevice()) return;

        initSwipeNavigation();
        initPullToRefresh();
        initTouchFeedback();
        initMobileMenuGestures();
        initScrollEnhancements();
        preventZoomOnDoubleTap();
        initHapticFeedback();
    }

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth <= 768;
    }

    /* ===================================
       1. SWIPE NAVIGATION
       =================================== */
    function initSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Check if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > swipeThreshold) {
                    if (deltaX > 0) {
                        // Swipe right - open menu
                        openMobileMenu();
                    } else {
                        // Swipe left - close menu
                        closeMobileMenu();
                    }
                }
            }
        }
    }

    function openMobileMenu() {
        const menu = document.getElementById('nav-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (menu && !menu.classList.contains('active')) {
            menu.classList.add('active');
            if (menuBtn) menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        const menu = document.getElementById('nav-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /* ===================================
       2. PULL TO REFRESH (Optional)
       =================================== */
    function initPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let pulling = false;
        const threshold = 80;

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].pageY;
                pulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!pulling) return;
            currentY = e.touches[0].pageY;
            const pullDistance = currentY - startY;

            if (pullDistance > 0 && pullDistance < threshold) {
                // Visual feedback for pull
                document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!pulling) return;
            pulling = false;
            const pullDistance = currentY - startY;

            if (pullDistance > threshold) {
                // Trigger refresh
                window.location.reload();
            } else {
                // Reset position
                document.body.style.transform = '';
            }
        }, { passive: true });
    }

    /* ===================================
       3. TOUCH FEEDBACK
       =================================== */
    function initTouchFeedback() {
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .card, a');

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.opacity = '0.9';
            }, { passive: true });

            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.opacity = '';
            }, { passive: true });

            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.opacity = '';
            }, { passive: true });
        });
    }

    /* ===================================
       4. MOBILE MENU GESTURES
       =================================== */
    function initMobileMenuGestures() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('nav-menu');
        const menuLinks = menu ? menu.querySelectorAll('.nav-link') : [];

        if (menuBtn && menu) {
            // Toggle menu on button click
            menuBtn.addEventListener('click', () => {
                const isActive = menu.classList.contains('active');
                if (isActive) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (menu.classList.contains('active') && 
                    !menu.contains(e.target) && 
                    !menuBtn.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            // Close menu when clicking on a link
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
    }

    /* ===================================
       5. SCROLL ENHANCEMENTS
       =================================== */
    function initScrollEnhancements() {
        let lastScrollTop = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Hide/show navbar on scroll
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollTop = scrollTop;

            // Add scroll indicator
            clearTimeout(scrollTimeout);
            document.body.classList.add('is-scrolling');
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 150);
        }, { passive: true });

        // Smooth scroll to anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* ===================================
       6. PREVENT ZOOM ON DOUBLE TAP
       =================================== */
    function preventZoomOnDoubleTap() {
        let lastTouchEnd = 0;

        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }

    /* ===================================
       7. HAPTIC FEEDBACK (iOS)
       =================================== */
    function initHapticFeedback() {
        // Check if haptic feedback is supported
        if (!('vibrate' in navigator)) return;

        const buttons = document.querySelectorAll('.btn, button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Light haptic feedback
                navigator.vibrate(10);
            });
        });

        // Form submission feedback
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                // Medium haptic feedback
                navigator.vibrate([10, 10, 10]);
            });
        });

        // Error feedback
        document.addEventListener('error-feedback', () => {
            // Strong haptic feedback
            navigator.vibrate([20, 10, 20]);
        });
    }

    /* ===================================
       8. ORIENTATION CHANGE HANDLER
       =================================== */
    window.addEventListener('orientationchange', () => {
        // Close mobile menu on orientation change
        closeMobileMenu();

        // Recalculate viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    /* ===================================
       9. NETWORK STATUS INDICATOR
       =================================== */
    function initNetworkStatus() {
        window.addEventListener('online', () => {
            showNotification('Back online', 'success');
        });

        window.addEventListener('offline', () => {
            showNotification('No internet connection', 'error');
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `mobile-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initNetworkStatus();

    /* ===================================
       10. FORM INPUT ENHANCEMENTS
       =================================== */
    function initFormEnhancements() {
        const inputs = document.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Auto-resize textarea
            if (input.tagName === 'TEXTAREA') {
                input.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            }

            // Add input type icons
            if (input.type === 'email') {
                addInputIcon(input, '📧');
            } else if (input.type === 'tel') {
                addInputIcon(input, '📱');
            } else if (input.type === 'url') {
                addInputIcon(input, '🌐');
            }
        });
    }

    function addInputIcon(input, icon) {
        if (input.parentElement.querySelector('.input-icon')) return;

        const iconElement = document.createElement('span');
        iconElement.className = 'input-icon';
        iconElement.textContent = icon;
        iconElement.style.cssText = `
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            opacity: 0.6;
        `;

        input.style.paddingLeft = '40px';
        input.parentElement.style.position = 'relative';
        input.parentElement.insertBefore(iconElement, input);
    }

    initFormEnhancements();

    /* ===================================
       11. PERFORMANCE MONITORING
       =================================== */
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor long tasks
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry.duration + 'ms');
                    }
                }
            });

            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    monitorPerformance();

    /* ===================================
       12. EXPORT FUNCTIONS
       =================================== */
    window.mobileGestures = {
        openMenu: openMobileMenu,
        closeMenu: closeMobileMenu,
        showNotification: showNotification
    };

})();

/* ===================================
   CSS ANIMATIONS FOR NOTIFICATIONS
   =================================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }

    .is-scrolling {
        pointer-events: none;
    }

    .is-scrolling * {
        pointer-events: auto;
    }
`;
document.head.appendChild(style);