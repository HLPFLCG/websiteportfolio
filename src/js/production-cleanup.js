/* ===================================
   PRODUCTION CLEANUP
   Remove development artifacts
   =================================== */

(function() {
    'use strict';

    // Override console methods in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Save original console methods
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info,
            debug: console.debug
        };

        // Override console.log and console.debug to do nothing
        console.log = function() {};
        console.debug = function() {};
        console.info = function() {};

        // Keep console.warn and console.error for important messages
        // but prefix them
        console.warn = function(...args) {
            originalConsole.warn('[HLPFL Warning]', ...args);
        };

        console.error = function(...args) {
            originalConsole.error('[HLPFL Error]', ...args);
        };

        // Add global error handler
        window.addEventListener('error', function(event) {
            // Log to error tracking service (if configured)
            if (window.errorTracker) {
                window.errorTracker.log({
                    message: event.message,
                    source: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    error: event.error
                });
            }
        });

        // Add unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function(event) {
            if (window.errorTracker) {
                window.errorTracker.log({
                    message: 'Unhandled Promise Rejection',
                    reason: event.reason
                });
            }
        });
    }

    // Remove development attributes
    function cleanupDevelopmentAttributes() {
        // Remove data-debug attributes
        const debugElements = document.querySelectorAll('[data-debug]');
        debugElements.forEach(el => el.removeAttribute('data-debug'));

        // Remove data-test attributes
        const testElements = document.querySelectorAll('[data-test]');
        testElements.forEach(el => el.removeAttribute('data-test'));
    }

    // Initialize cleanup on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanupDevelopmentAttributes);
    } else {
        cleanupDevelopmentAttributes();
    }

    // Disable right-click context menu (optional - uncomment if needed)
    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    // });

    // Disable text selection on certain elements (optional)
    // document.addEventListener('selectstart', function(e) {
    //     if (e.target.classList.contains('no-select')) {
    //         e.preventDefault();
    //     }
    // });

})();