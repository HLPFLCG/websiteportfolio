/* ============================================
   MAGNETIC BUTTONS - Cursor Follow Effect
   ============================================ */

(function() {
    'use strict';
    
    // Only enable on desktop
    if (window.innerWidth < 1024) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initMagneticButtons();
    }
    
    function initMagneticButtons() {
        // Select all buttons that should have magnetic effect
        const magneticButtons = document.querySelectorAll('.btn, .nav-link, .logo');
        
        magneticButtons.forEach(button => {
            // Add magnetic class for styling
            button.classList.add('magnetic');
            
            // Mouse move handler
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Calculate distance from center
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = Math.max(rect.width, rect.height);
                
                // Apply magnetic effect (stronger when closer)
                const strength = Math.min(distance / maxDistance, 1);
                const moveX = x * 0.3 * (1 - strength);
                const moveY = y * 0.3 * (1 - strength);
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            // Mouse leave handler - reset position
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
            
            // Add smooth transition
            button.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
    
    // Disable on mobile/tablet
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            const magneticButtons = document.querySelectorAll('.magnetic');
            magneticButtons.forEach(button => {
                button.style.transform = 'translate(0, 0)';
            });
        }
    });
    
})();