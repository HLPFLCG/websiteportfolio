// ===================================
// Portfolio Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilter();
});

// ===================================
// Portfolio Filter
// ===================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('[data-category]');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) {
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reinitialize AOS for filtered items
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .filter-btn {
        padding: 0.5rem 1.5rem;
        background-color: transparent;
        border: 2px solid var(--color-gray-200);
        border-radius: 2rem;
        font-weight: 600;
        color: var(--color-dark-700);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        border-color: var(--color-primary-500);
        color: var(--color-primary-500);
    }
    
    .filter-btn.active {
        background-color: var(--color-primary-500);
        border-color: var(--color-primary-500);
        color: white;
    }
    
    .portfolio-filter-section {
        padding: 2rem 0;
        background-color: var(--color-gray-50);
    }
    
    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
    
    .portfolio-grid-full {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .portfolio-card-full {
        background-color: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    @media (min-width: 768px) {
        .portfolio-card-full {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
    }
    
    .portfolio-image-full {
        position: relative;
        aspect-ratio: 16 / 9;
        overflow: hidden;
    }
    
    .portfolio-image-full img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .portfolio-content-full {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .portfolio-title-full {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .portfolio-description-full {
        color: var(--color-dark-600);
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }
    
    .portfolio-highlights {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .highlight-item {
        text-align: center;
    }
    
    .highlight-number {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.25rem;
    }
    
    .highlight-label {
        font-size: 0.75rem;
        color: var(--color-dark-600);
    }
    
    .case-study {
        padding: 4rem 0;
    }
    
    .case-study-header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .case-study-label {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: var(--color-primary-500);
        color: white;
        border-radius: 2rem;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .case-study-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .case-study-subtitle {
        font-size: 1.25rem;
        color: var(--color-dark-600);
    }
    
    .case-study-content {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .case-study-section {
        margin-bottom: 3rem;
    }
    
    .case-study-heading {
        font-size: 1.75rem;
        margin-bottom: 1rem;
    }
    
    .feature-list {
        list-style: none;
        padding-left: 0;
    }
    
    .feature-list li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .feature-list li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--color-primary-500);
        font-weight: 700;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .result-item {
        text-align: center;
        padding: 2rem;
        background-color: var(--color-gray-50);
        border-radius: 1rem;
    }
    
    .result-number {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
    }
    
    .result-label {
        color: var(--color-dark-600);
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .tech-tag {
        padding: 0.5rem 1rem;
        background-color: var(--color-gray-100);
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-dark-700);
    }
    
    .case-study-testimonial {
        background-color: var(--color-gray-50);
        padding: 2rem;
        border-radius: 1rem;
        border-left: 4px solid var(--color-primary-500);
        margin-top: 3rem;
    }
    
    .testimonial-quote {
        font-size: 1.25rem;
        font-style: italic;
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-dark-700);
    }
    
    .testimonial-author-info {
        display: flex;
        flex-direction: column;
    }
`;
document.head.appendChild(style);