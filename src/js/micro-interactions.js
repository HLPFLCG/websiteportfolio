/* ============================================
   MICRO-INTERACTIONS
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
        initButtonRipple();
        initFormFocusAnimations();
        initHoverEffects();
        initLoadingStates();
        initTooltips();
    }
    
    // Button Ripple Effect
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                // Calculate position
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                // Set ripple styles
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                // Add to button
                this.appendChild(ripple);
                
                // Remove after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Form Input Focus Animations
    function initFormFocusAnimations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Create label animation container
            const parent = input.parentElement;
            if (!parent) return;
            
            // Focus event
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
                
                // Add focus ring animation
                const ring = document.createElement('div');
                ring.classList.add('focus-ring');
                this.parentElement.appendChild(ring);
                
                setTimeout(() => {
                    ring.classList.add('active');
                }, 10);
            });
            
            // Blur event
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
                
                const ring = this.parentElement.querySelector('.focus-ring');
                if (ring) {
                    ring.classList.remove('active');
                    setTimeout(() => ring.remove(), 300);
                }
            });
            
            // Input event for floating labels
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('input-filled');
                } else {
                    this.parentElement.classList.remove('input-filled');
                }
            });
        });
    }
    
    // Enhanced Hover Effects
    function initHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.card, .service-card, .portfolio-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Image zoom on hover
        const zoomImages = document.querySelectorAll('[data-zoom]');
        
        zoomImages.forEach(img => {
            img.style.transition = 'transform 0.3s ease';
            
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Loading States
    function initLoadingStates() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('[type="submit"]');
                if (!submitBtn) return;
                
                // Add loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Store original text
                const originalText = submitBtn.textContent;
                submitBtn.dataset.originalText = originalText;
                
                // Add loading spinner
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    <span>Sending...</span>
                `;
            });
        });
    }
    
    // Simple Tooltips
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.dataset.tooltip;
            
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                // Show tooltip
                setTimeout(() => tooltip.classList.add('show'), 10);
                
                // Store reference
                this.tooltipElement = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.tooltipElement) {
                    this.tooltipElement.classList.remove('show');
                    setTimeout(() => this.tooltipElement.remove(), 300);
                }
            });
        });
    }
    
    // Success/Error Message Animations
    window.showMessage = function(message, type = 'success') {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message', `message-${type}`);
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => messageEl.classList.add('show'), 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    };
    
    // Smooth scroll to element
    window.smoothScrollTo = function(target) {
        const element = document.querySelector(target);
        if (!element) return;
        
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };
    
})();