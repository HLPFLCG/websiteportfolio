// ===================================
// Contact Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// ===================================
// Contact Form Handler
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            business: formData.get('business'),
            website: formData.get('website'),
            services: formData.getAll('services'),
            message: formData.get('message'),
            contactMethod: formData.get('contact-method')
        };
        
        // Validate
        if (!data.name || !data.email || !data.message) {
            showMessage(errorMessage, 'Please fill in all required fields.');
            return;
        }
        
        if (!window.hlpflUtils.validateEmail(data.email)) {
            showMessage(errorMessage, 'Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // In production, replace this with your actual form endpoint
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);
            
            // Show success message
            showMessage(successMessage, null);
            form.reset();
            
            // Show notification
            if (window.hlpflUtils && window.hlpflUtils.showNotification) {
                window.hlpflUtils.showNotification('Message sent successfully! We\'ll get back to you soon.');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage(errorMessage, null);
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ===================================
// Show Message Helper
// ===================================
function showMessage(element, customMessage) {
    // Hide all messages first
    document.querySelectorAll('.form-message').forEach(msg => {
        msg.style.display = 'none';
    });
    
    // Show the specified message
    if (element) {
        if (customMessage) {
            element.querySelector('p').textContent = customMessage;
        }
        element.style.display = 'block';
        
        // Scroll to message
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// Simulate Form Submission (Replace with actual API call)
// ===================================
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Form data ready for submission
            
            // In production, replace this with actual API call:
            // fetch('YOUR_FORM_ENDPOINT', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => resolve(result))
            // .catch(error => reject(error));
            
            // For now, always resolve successfully
            resolve({ success: true });
        }, 1000);
    });
}

// Add form styles
const style = document.createElement('style');
style.textContent = `
    .contact-section {
        padding: 4rem 0;
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    @media (min-width: 768px) {
        .contact-grid {
            grid-template-columns: 2fr 1fr;
        }
    }
    
    .contact-form-wrapper {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .contact-form-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .contact-form-subtitle {
        color: var(--color-dark-600);
        margin-bottom: 2rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--color-dark-700);
    }
    
    .form-input,
    .form-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--color-gray-200);
        border-radius: 0.5rem;
        font-family: inherit;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: var(--color-primary-500);
    }
    
    .form-textarea {
        resize: vertical;
        min-height: 120px;
    }
    
    .checkbox-group,
    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .checkbox-label,
    .radio-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-weight: normal;
    }
    
    .checkbox-label input,
    .radio-label input {
        cursor: pointer;
    }
    
    .form-note {
        font-size: 0.875rem;
        color: var(--color-dark-600);
        text-align: center;
        margin-top: 1rem;
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .form-message.success {
        background-color: #D1FAE5;
        color: #065F46;
        border: 1px solid #10B981;
    }
    
    .form-message.error {
        background-color: #FEE2E2;
        color: #991B1B;
        border: 1px solid #EF4444;
    }
    
    .contact-info-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .contact-info-card {
        background-color: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .contact-info-card.highlight {
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
        color: white;
    }
    
    .contact-info-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .contact-info-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    
    .contact-info-text {
        color: var(--color-dark-600);
        margin-bottom: 0.5rem;
    }
    
    .contact-info-card.highlight .contact-info-text {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .contact-info-note {
        font-size: 0.875rem;
        color: var(--color-dark-500);
    }
    
    .contact-info-link {
        color: var(--color-primary-500);
        font-weight: 600;
    }
    
    .contact-info-list {
        list-style: none;
        padding-left: 0;
    }
    
    .contact-info-list li {
        padding: 0.25rem 0;
    }
    
    .contact-info-card.highlight .contact-info-list li {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
    }
    
    .social-link {
        color: var(--color-primary-500);
        font-weight: 600;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(style);