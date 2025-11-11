// ===================================
// Pricing Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initROICalculator();
});

// ===================================
// ROI Calculator
// ===================================
function initROICalculator() {
    const customersInput = document.getElementById('new-customers');
    const customerValueInput = document.getElementById('customer-value');
    
    if (!customersInput || !customerValueInput) return;
    
    // Calculate and update ROI
    function calculateROI() {
        const customers = parseInt(customersInput.value) || 0;
        const value = parseInt(customerValueInput.value) || 0;
        
        const monthlyRevenue = customers * value;
        const annualRevenue = monthlyRevenue * 12;
        const investment = 5000;
        const roi = ((annualRevenue - investment) / investment * 100).toFixed(0);
        const paybackPeriod = (investment / monthlyRevenue).toFixed(1);
        
        // Update display
        document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue.toLocaleString()}`;
        document.getElementById('annual-revenue').textContent = `$${annualRevenue.toLocaleString()}`;
        document.getElementById('roi-percentage').textContent = `${roi}%`;
        document.getElementById('payback-period').textContent = `${paybackPeriod} months`;
        
        // Update explanation
        document.getElementById('customers-display').textContent = customers;
        document.getElementById('value-display').textContent = `$${value.toLocaleString()}`;
        document.getElementById('annual-display').textContent = `$${annualRevenue.toLocaleString()}`;
    }
    
    // Initial calculation
    calculateROI();
    
    // Update on input change
    customersInput.addEventListener('input', calculateROI);
    customerValueInput.addEventListener('input', calculateROI);
}

// Add pricing page styles
const style = document.createElement('style');
style.textContent = `
    .pricing-packages-section {
        padding: 4rem 0;
    }
    
    .pricing-packages-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    @media (min-width: 768px) {
        .pricing-packages-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    
    .pricing-package-card {
        background-color: white;
        border: 2px solid var(--color-gray-200);
        border-radius: 1rem;
        padding: 2rem;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .pricing-package-card:hover {
        border-color: var(--color-primary-500);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.1);
        transform: translateY(-4px);
    }
    
    .pricing-package-card.featured {
        border-color: var(--color-primary-500);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        transform: scale(1.05);
    }
    
    .package-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 1rem;
        background-color: var(--color-accent-500);
        color: white;
        border-radius: 2rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .package-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .package-name {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .package-price {
        margin-bottom: 1rem;
    }
    
    .price-currency {
        font-size: 1.5rem;
        vertical-align: super;
    }
    
    .price-amount {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .package-description {
        color: var(--color-dark-600);
        font-size: 0.875rem;
    }
    
    .package-features {
        margin-bottom: 2rem;
    }
    
    .features-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .features-list {
        list-style: none;
        padding-left: 0;
    }
    
    .features-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--color-gray-200);
    }
    
    .features-list li:last-child {
        border-bottom: none;
    }
    
    .package-footer {
        margin-top: auto;
    }
    
    .pricing-note {
        text-align: center;
        margin-top: 2rem;
        padding: 1rem;
        background-color: var(--color-gray-50);
        border-radius: 0.5rem;
    }
    
    .comparison-section {
        padding: 4rem 0;
    }
    
    .comparison-table-wrapper {
        overflow-x: auto;
    }
    
    .comparison-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .comparison-table th,
    .comparison-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--color-gray-200);
    }
    
    .comparison-table th {
        background-color: var(--color-gray-50);
        font-weight: 600;
    }
    
    .comparison-table th.highlight,
    .comparison-table td.highlight {
        background-color: rgba(99, 102, 241, 0.1);
        font-weight: 600;
    }
    
    .comparison-summary {
        text-align: center;
        margin-top: 2rem;
        font-size: 1.125rem;
    }
    
    .roi-section {
        padding: 4rem 0;
    }
    
    .roi-calculator {
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .roi-inputs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    @media (min-width: 768px) {
        .roi-inputs {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    .roi-input-group {
        display: flex;
        flex-direction: column;
    }
    
    .roi-label {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--color-dark-700);
    }
    
    .roi-input {
        padding: 0.75rem;
        border: 2px solid var(--color-gray-200);
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .roi-input:focus {
        outline: none;
        border-color: var(--color-primary-500);
    }
    
    .roi-results {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    @media (min-width: 768px) {
        .roi-results {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    
    .roi-result-card {
        text-align: center;
        padding: 1.5rem;
        background-color: var(--color-gray-50);
        border-radius: 0.5rem;
    }
    
    .roi-result-card.highlight {
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
        color: white;
    }
    
    .roi-result-label {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        opacity: 0.8;
    }
    
    .roi-result-value {
        font-size: 2rem;
        font-weight: 700;
    }
    
    .roi-explanation {
        padding: 1.5rem;
        background-color: var(--color-gray-50);
        border-radius: 0.5rem;
        border-left: 4px solid var(--color-primary-500);
    }
    
    .payment-options-section {
        padding: 4rem 0;
    }
    
    .payment-options-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    @media (min-width: 768px) {
        .payment-options-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    
    .payment-option-card {
        background-color: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .payment-option-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    
    .payment-option-card.featured {
        border: 2px solid var(--color-primary-500);
    }
    
    .payment-option-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .payment-option-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .payment-option-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background-color: var(--color-accent-500);
        color: white;
        border-radius: 2rem;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .payment-option-description {
        color: var(--color-dark-600);
        margin-bottom: 1.5rem;
    }
    
    .payment-option-example {
        padding: 1rem;
        background-color: var(--color-gray-50);
        border-radius: 0.5rem;
    }
    
    .example-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
    }
`;
document.head.appendChild(style);