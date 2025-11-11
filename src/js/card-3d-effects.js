// ===================================
// 3D Card Effects
// ===================================

class Card3D {
    constructor(card) {
        this.card = card;
        this.isTouch = 'ontouchstart' in window;
        this.init();
    }

    init() {
        if (this.isTouch) {
            this.setupTouchInteraction();
        } else {
            this.setupMouseInteraction();
        }
        
        this.addStyles();
    }

    setupMouseInteraction() {
        this.card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    }

    setupTouchInteraction() {
        this.card.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.card.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleMouseMove(e) {
        const rect = this.card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.card.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;

        // Update shine effect
        this.updateShine(x, y, rect.width, rect.height);
    }

    handleMouseEnter() {
        this.card.style.transition = 'none';
    }

    handleMouseLeave() {
        this.card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        this.card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        // Remove shine
        const shine = this.card.querySelector('.card-shine');
        if (shine) {
            shine.style.opacity = '0';
        }
    }

    handleTouchStart(e) {
        this.card.classList.add('card-touched');
        setTimeout(() => {
            this.card.classList.remove('card-touched');
        }, 300);
    }

    handleTouchEnd() {
        // Touch end handled by timeout in touchstart
    }

    updateShine(x, y, width, height) {
        let shine = this.card.querySelector('.card-shine');
        
        if (!shine) {
            shine = document.createElement('div');
            shine.className = 'card-shine';
            this.card.appendChild(shine);
        }

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        shine.style.background = `
            radial-gradient(
                circle at ${xPercent}% ${yPercent}%,
                rgba(255, 255, 255, 0.3) 0%,
                transparent 60%
            )
        `;
        shine.style.opacity = '1';
    }

    addStyles() {
        this.card.style.transformStyle = 'preserve-3d';
        this.card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    }
}

// Card flip effect
class CardFlip {
    constructor(card) {
        this.card = card;
        this.isFlipped = false;
        this.init();
    }

    init() {
        const flipTrigger = this.card.querySelector('.card-flip-trigger');
        if (flipTrigger) {
            flipTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.flip();
            });
        }
    }

    flip() {
        this.isFlipped = !this.isFlipped;
        
        if (this.isFlipped) {
            this.card.style.transform = 'rotateY(180deg)';
        } else {
            this.card.style.transform = 'rotateY(0deg)';
        }
    }
}

// Initialize all cards
function initCard3DEffects() {
    // 3D tilt effect for project cards
    const projectCards = document.querySelectorAll('.portfolio-card, .project-card');
    projectCards.forEach(card => {
        new Card3D(card);
    });

    // Flip effect for service cards
    const serviceCards = document.querySelectorAll('.service-card[data-flip]');
    serviceCards.forEach(card => {
        new CardFlip(card);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCard3DEffects);
} else {
    initCard3DEffects();
}

// Re-initialize on dynamic content load
window.addEventListener('contentLoaded', initCard3DEffects);