"""
Enhance contact form with modern styling
"""

# Read the contact.html file
with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Enhanced form CSS to add before </style>
form_css = """
        /* Enhanced Contact Form Styles */
        .contact-section {
            padding: 6rem 2rem;
            background: var(--dark);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .contact-info {
            padding: 2rem 0;
        }
        
        .contact-info h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .contact-info > p {
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.8;
            margin-bottom: 3rem;
        }
        
        .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .contact-method {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 1.5rem;
            background: var(--dark-light);
            border-radius: 15px;
            border: 2px solid rgba(200, 121, 65, 0.1);
            transition: all 0.3s ease;
        }
        
        .contact-method:hover {
            border-color: var(--primary);
            transform: translateX(10px);
        }
        
        .contact-method-icon {
            font-size: 2.5rem;
            flex-shrink: 0;
        }
        
        .contact-method-content h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: var(--text);
        }
        
        .contact-method-content p {
            color: var(--text-muted);
            font-size: 1rem;
        }
        
        .contact-method-content a {
            color: var(--primary);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .contact-method-content a:hover {
            color: var(--primary-light);
        }
        
        /* Form Wrapper */
        .contact-form-wrapper {
            background: var(--dark-light);
            padding: 3rem;
            border-radius: 20px;
            border: 2px solid rgba(200, 121, 65, 0.1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .contact-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .form-input,
        .form-select,
        .form-textarea {
            width: 100%;
            padding: 1rem 1.25rem;
            background: var(--dark);
            border: 2px solid rgba(200, 121, 65, 0.2);
            border-radius: 12px;
            color: var(--text);
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
            outline: none;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(200, 121, 65, 0.1);
            transform: translateY(-2px);
        }
        
        .form-input::placeholder,
        .form-textarea::placeholder {
            color: var(--text-muted);
            opacity: 0.6;
        }
        
        .form-select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C87941' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            padding-right: 3rem;
        }
        
        .form-select option {
            background: var(--dark);
            color: var(--text);
        }
        
        .form-textarea {
            min-height: 150px;
            resize: vertical;
            line-height: 1.6;
        }
        
        .form-submit {
            width: 100%;
            padding: 1.25rem 2rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        
        .form-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(200, 121, 65, 0.4);
        }
        
        .form-submit:active {
            transform: translateY(-1px);
        }
        
        .form-message {
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            font-weight: 600;
            display: none;
        }
        
        .form-message.success {
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            border: 2px solid rgba(34, 197, 94, 0.3);
            display: block;
        }
        
        .form-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 2px solid rgba(239, 68, 68, 0.3);
            display: block;
        }
        
        /* Responsive Design for Contact Form */
        @media (max-width: 968px) {
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .contact-form-wrapper {
                padding: 2rem;
            }
            
            .contact-method:hover {
                transform: translateY(-5px);
            }
        }
"""

# Find the closing </style> tag and insert form CSS
style_close_pos = content.rfind('</style>')
if style_close_pos != -1:
    content = content[:style_close_pos] + form_css + '\n    ' + content[style_close_pos:]

# Save the updated content
with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Enhanced contact form CSS")
print("\nForm enhancements:")
print("- Modern input field styling with focus effects")
print("- Improved visual feedback on interactions")
print("- Enhanced submit button with hover animations")
print("- Better spacing and layout")
print("- Custom select dropdown styling")
print("- Responsive design for mobile")
print("- Success/error message styling")