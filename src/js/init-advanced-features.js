// ===================================
// Initialize All Advanced Features
// ===================================

(function() {
    'use strict';

    // Feature flags
    const FEATURES = {
        animations: true,
        themeToggle: true,
        card3D: true,
        performanceMonitor: true,
        lazyLoading: true,
        skillsVisualization: true,
        interactiveTimeline: true,
        mobileOptimizations: true
    };

    // Check if feature should be enabled
    function isFeatureEnabled(feature) {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const featureParam = urlParams.get(feature);
        
        if (featureParam !== null) {
            return featureParam !== 'false';
        }
        
        return FEATURES[feature];
    }

    // Load script dynamically
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Load CSS dynamically
    function loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    // Initialize all features
    async function initializeFeatures() {
        console.log('🚀 Initializing advanced features...');

        try {
            // Load advanced features CSS
            await loadCSS('src/css/advanced-features.css');
            console.log('✅ Advanced features CSS loaded');

            // Initialize features based on flags
            const initPromises = [];

            if (isFeatureEnabled('themeToggle')) {
                console.log('🎨 Initializing theme manager...');
                // Theme manager is already loaded
            }

            if (isFeatureEnabled('performanceMonitor')) {
                console.log('📊 Initializing performance monitor...');
                // Performance monitor is already loaded
            }

            if (isFeatureEnabled('lazyLoading')) {
                console.log('🖼️ Initializing lazy loading...');
                // Lazy loader is already loaded
            }

            if (isFeatureEnabled('card3D')) {
                console.log('🎴 Initializing 3D card effects...');
                // Card 3D effects are already loaded
            }

            if (isFeatureEnabled('animations')) {
                console.log('✨ Initializing advanced animations...');
                // Advanced animations are already loaded
            }

            if (isFeatureEnabled('skillsVisualization')) {
                console.log('📈 Initializing skills visualization...');
                // Skills visualization is already loaded
            }

            if (isFeatureEnabled('interactiveTimeline')) {
                console.log('⏱️ Initializing interactive timeline...');
                // Interactive timeline is already loaded
            }

            if (isFeatureEnabled('mobileOptimizations')) {
                console.log('📱 Initializing mobile optimizations...');
                // Mobile optimizations are already loaded
            }

            await Promise.all(initPromises);

            console.log('✅ All advanced features initialized successfully!');
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('advancedFeaturesReady'));

            // Show success message in development
            if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
                showInitMessage();
            }

        } catch (error) {
            console.error('❌ Error initializing advanced features:', error);
        }
    }

    // Show initialization message
    function showInitMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #c87941 0%, #e09560 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.5s ease-out;
        `;
        message.textContent = '✨ Advanced features loaded!';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideIn 0.5s ease-out reverse';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    // Feature detection and polyfills
    function checkBrowserSupport() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            customElements: 'customElements' in window,
            fetch: 'fetch' in window,
            promises: 'Promise' in window,
            requestAnimationFrame: 'requestAnimationFrame' in window
        };

        const unsupported = Object.entries(features)
            .filter(([name, supported]) => !supported)
            .map(([name]) => name);

        if (unsupported.length > 0) {
            console.warn('⚠️ Some features are not supported:', unsupported);
            
            // Load polyfills if needed
            if (!features.intersectionObserver) {
                loadScript('https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver');
            }
        }

        return unsupported.length === 0;
    }

    // Performance monitoring
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor long tasks
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.warn('⚠️ Long task detected:', entry.duration.toFixed(2) + 'ms');
                        }
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Long task API not supported
            }
        }
    }

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('❌ Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('❌ Unhandled promise rejection:', e.reason);
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            checkBrowserSupport();
            initializeFeatures();
            monitorPerformance();
        });
    } else {
        checkBrowserSupport();
        initializeFeatures();
        monitorPerformance();
    }

    // Export for debugging
    window.AdvancedFeatures = {
        FEATURES,
        isFeatureEnabled,
        reinitialize: initializeFeatures
    };

})();