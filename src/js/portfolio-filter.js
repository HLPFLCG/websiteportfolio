/* ============================================
   PORTFOLIO FILTERING
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
        initPortfolioFilter();
        initImageLoading();
    }
    
    // Portfolio Filter
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        if (filterButtons.length === 0 || portfolioCards.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                filterCards(filter, portfolioCards);
            });
        });
    }
    
    function filterCards(filter, cards) {
        const grid = document.querySelector('.portfolio-grid');
        if (grid) {
            grid.classList.add('loading');
        }
        
        cards.forEach((card, index) => {
            const category = card.dataset.category;
            
            // Add filtering animation
            card.classList.add('filtering');
            
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden', 'filtering');
                    card.classList.add('showing');
                    card.style.display = 'block';
                    
                    // Stagger animation
                    card.style.animationDelay = `${index * 50}ms`;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('showing');
                    card.style.display = 'none';
                }
                
                // Remove animation classes after animation completes
                setTimeout(() => {
                    card.classList.remove('filtering', 'showing');
                    card.style.animationDelay = '';
                }, 400);
            }, 300);
        });
        
        // Remove loading state
        setTimeout(() => {
            if (grid) {
                grid.classList.remove('loading');
            }
            
            // Check if any cards are visible
            const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
            
            if (visibleCards.length === 0) {
                showEmptyState(grid);
            } else {
                hideEmptyState();
            }
        }, 700);
    }
    
    function showEmptyState(grid) {
        let emptyState = document.querySelector('.portfolio-empty');
        
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'portfolio-empty';
            emptyState.innerHTML = `
                <h3>No projects found</h3>
                <p>Try selecting a different category</p>
            `;
            grid.parentElement.appendChild(emptyState);
        }
        
        emptyState.style.display = 'block';
    }
    
    function hideEmptyState() {
        const emptyState = document.querySelector('.portfolio-empty');
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
    
    // Image Loading
    function initImageLoading() {
        const images = document.querySelectorAll('.portfolio-card img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    }
    
    // Card Click Handler
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('.card-link');
            if (link) {
                window.open(link.href, '_blank');
            }
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.card-link');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });
    
    // Search Functionality (optional enhancement)
    function initSearch() {
        const searchInput = document.querySelector('.portfolio-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.portfolio-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    }
    
    initSearch();
    
})();