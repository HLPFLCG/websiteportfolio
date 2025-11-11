/* ===================================
   ENHANCED CONTACT FORM
   Real-time Validation & Interactions
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }

    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Add real-time validation
        inputs.forEach(input => {
            // Add error message element if not exists
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('form-error')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }

            // Validate on blur
            input.addEventListener('blur', () => validateField(input));
            
            // Clear error on input
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateField(input);
                }
            });

            // Add focus animation
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });

        // Add character counter to message field
        const messageField = document.getElementById('message');
        if (messageField) {
            addCharacterCounter(messageField, 1000);
        }

        // Form submission
        form.addEventListener('submit', handleSubmit);

        // Add form progress indicator
        addFormProgress(form);
    }

    function validateField(field) {
        const value = field.value.trim();
        const errorMsg = field.nextElementSibling;
        let isValid = true;
        let message = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Phone validation (optional but if provided, should be valid)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }

        // URL validation
        if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                message = 'Please enter a valid URL (e.g., https://example.com)';
            }
        }

        // Update field state
        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            if (errorMsg) errorMsg.textContent = '';
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
            if (errorMsg) errorMsg.textContent = message;
        }

        return isValid;
    }

    function addCharacterCounter(field, maxLength) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        field.parentNode.appendChild(counter);

        function updateCounter() {
            const length = field.value.length;
            counter.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }

            if (length > maxLength) {
                counter.classList.add('error');
                field.value = field.value.substring(0, maxLength);
            } else {
                counter.classList.remove('error');
            }
        }

        field.addEventListener('input', updateCounter);
        updateCounter();
    }

    function addFormProgress(form) {
        const requiredFields = form.querySelectorAll('[required]');
        if (requiredFields.length === 0) return;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.innerHTML = '<div class="form-progress-bar"></div>';
        
        const formTitle = form.previousElementSibling;
        if (formTitle) {
            formTitle.parentNode.insertBefore(progressContainer, form);
        }

        const progressBar = progressContainer.querySelector('.form-progress-bar');

        function updateProgress() {
            let filledFields = 0;
            requiredFields.forEach(field => {
                if (field.value.trim()) filledFields++;
            });
            const progress = (filledFields / requiredFields.length) * 100;
            progressBar.style.width = progress + '%';
        }

        requiredFields.forEach(field => {
            field.addEventListener('input', updateProgress);
        });

        updateProgress();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');

        // Hide previous messages
        if (successMsg) successMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';

        // Validate all fields
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Check if at least one service is selected
        const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');
        if (serviceCheckboxes.length === 0) {
            isValid = false;
            alert('Please select at least one service or option');
        }

        if (!isValid) {
            // Scroll to first error
            const firstError = form.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (key === 'services') {
                if (!data.services) data.services = [];
                data.services.push(value);
            } else {
                data[key] = value;
            }
        }

        try {
            // FormSpree endpoint configured
            const response = await fetch('https://formspree.io/f/mgvreyge', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Hide error message after 5 seconds
            setTimeout(() => {
                if (errorMsg) errorMsg.style.display = 'none';
            }, 5000);

        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();