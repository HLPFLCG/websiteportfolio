/*
==========================================
HLPFL PREMIUM JAVASCRIPT FUNCTIONALITY
$10M+ Budget Quality Features
==========================================
*/

class PremiumWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupBackgroundSystem();
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupAnimations();
    this.setupInteractions();
    this.setupCookieBanner();
    this.setupLandingPopup();
    this.setupScrollEffects();
    this.setupPerformanceOptimizations();
  }

  // BACKGROUND SYSTEM
  setupBackgroundSystem() {
    this.createSparklesAndStars();
  }

  createSparklesAndStars() {
    // Create background system
    const bgSystem = document.createElement('div');
    bgSystem.className = 'bg-system';
    
    // Base sparkles and stars (ALL PAGES)
    const sparklesBg = document.createElement('div');
    sparklesBg.className = 'sparkles-bg';
    
    // Create sparkles
    for (let i = 0; i < 100; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.width = Math.random() * 3 + 'px';
      sparkle.style.height = sparkle.style.width;
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 6 + 's';
      sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      sparklesBg.appendChild(sparkle);
    }
    
    // Create stars
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 4 + 's';
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      sparklesBg.appendChild(star);
    }
    
    bgSystem.appendChild(sparklesBg);
    
    // Add orange overlay for regular pages (NOT loading screen)
    if (!document.body.classList.contains('loading-page')) {
      const orangeOverlay = document.createElement('div');
      orangeOverlay.className = 'orange-overlay';
      bgSystem.appendChild(orangeOverlay);
    }
    
    document.body.appendChild(bgSystem);
  }

  // LOADING SCREEN
  setupLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;

    // Create abundant orange sparkles for loading screen
    this.createLoadingSparkles(loadingScreen);

    // Enhanced loading logic
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 1000);
        }, 500);
      }
    }, 100);

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1000);
      }, 1500);
    });
  }

  createLoadingSparkles(container) {
    // Create abundant orange sparkles (dramatic effect)
    for (let i = 0; i < 150; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: #ff6b35;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: loadingSparkle ${Math.random() * 3 + 2}s infinite ease-in-out;
        animation-delay: ${Math.random() * 3}s;
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 107, 53, 0.8);
      `;
      container.appendChild(sparkle);
    }

    // Add some orange stars
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-left: ${Math.random() * 5 + 5}px solid transparent;
        border-right: ${Math.random() * 5 + 5}px solid transparent;
        border-bottom: ${Math.random() * 10 + 10}px solid #ff6b35;
        transform: rotate(35deg);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: starTwinkle ${Math.random() * 2 + 2}s infinite ease-in-out;
        animation-delay: ${Math.random() * 2}s;
        filter: drop-shadow(0 0 10px rgba(255, 107, 53, 1));
      `;
      container.appendChild(star);
    }

    // Inject CSS for loading animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loadingSparkle {
        0%, 100% {
          transform: translateY(0) scale(0);
          opacity: 0;
        }
        10% {
          transform: translateY(-20px) scale(1);
          opacity: 1;
        }
        90% {
          transform: translateY(-100px) scale(1);
          opacity: 1;
        }
      }
      @keyframes starTwinkle {
        0%, 100% {
          opacity: 0.3;
          transform: rotate(35deg) scale(1);
        }
        50% {
          opacity: 1;
          transform: rotate(35deg) scale(1.3);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // NAVIGATION
  setupNavigation() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveNavigation();
  }

  setupMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = menu.querySelectorAll('.navbar-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  }

  setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }

  // ANIMATIONS
  setupAnimations() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupMicroInteractions();
  }

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.animate;
          entry.target.classList.add('animate-' + animation);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
  }

  setupHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      });
    });
  }

  setupMicroInteractions() {
    // Parallax effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Magnetic buttons
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // INTERACTIONS
  setupInteractions() {
    this.setupFormValidation();
    this.setupTooltips();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });
        
        if (isValid) {
          // Show success message
          this.showNotification('Form submitted successfully!', 'success');
          form.reset();
        } else {
          this.showNotification('Please fill in all required fields.', 'error');
        }
      });
    });
  }

  setupTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
      let tooltip;
      
      trigger.addEventListener('mouseenter', () => {
        const text = trigger.dataset.tooltip;
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = trigger.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      });
      
      trigger.addEventListener('mouseleave', () => {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      });
    });
  }

  // COOKIE BANNER
  setupCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-banner');
    if (!cookieBanner) return;
    
    // Check if user has already consented
    if (localStorage.getItem('cookieConsent')) {
      return;
    }
    
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 2000);
    
    const acceptBtn = cookieBanner.querySelector('.cookie-accept');
    const declineBtn = cookieBanner.querySelector('.cookie-decline');
    
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
    });
    
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // LANDING PAGE POPUP
  setupLandingPopup() {
    const popup = document.querySelector('.popup-overlay');
    if (!popup) return;
    
    // Check if user has already seen popup
    if (sessionStorage.getItem('popupShown')) {
      return;
    }
    
    // Show popup after delay
    setTimeout(() => {
      popup.classList.add('show');
      sessionStorage.setItem('popupShown', 'true');
    }, 5000);
    
    const closeBtn = popup.querySelector('.popup-close');
    const dismissBtn = popup.querySelector('.popup-dismiss');
    
    const closePopup = () => {
      popup.classList.remove('show');
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (dismissBtn) dismissBtn.addEventListener('click', closePopup);
    
    // Close on overlay click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }

  // SCROLL EFFECTS
  setupScrollEffects() {
    this.setupNavbarScroll();
    this.setupScrollProgress();
  }

  setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.background = 'rgba(13, 14, 16, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(13, 14, 16, 0.95)';
        navbar.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }

  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--primary-orange);
      z-index: var(--z-tooltip);
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // PERFORMANCE OPTIMIZATIONS
  setupPerformanceOptimizations() {
    this.setupLazyLoading();
    this.setupImageOptimization();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  }

  setupImageOptimization() {
    // Add loading="lazy" to all images without it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  // UTILITY FUNCTIONS
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize premium website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.premiumWebsite = new PremiumWebsite();
});

// Additional CSS for notifications
const notificationCSS = `
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  z-index: var(--z-toast);
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.notification.show {
  transform: translateX(0);
  opacity: 1;
}

.notification-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.notification-error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.notification-info {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.tooltip {
  position: absolute;
  background: var(--gray-950);
  color: var(--white);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: var(--z-tooltip);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 107, 53, 0.2);
}

.tooltip.show {
  opacity: 1;
  transform: translateY(0);
}

.lazy {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

.lazy.loaded {
  filter: blur(0);
}
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);