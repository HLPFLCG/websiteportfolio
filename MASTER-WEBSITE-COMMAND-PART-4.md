# ULTIMATE MASTER WEBSITE COMMAND TEMPLATE - PART 4
## Phases 4-8: Functionality, Technical Specs, Content, Mobile, and Additional Pages

---

<a name="phase-4"></a>
## PHASE 4: FUNCTIONALITY & INTERACTIVITY

### 4.1 FORM FUNCTIONALITY

**Contact Form Implementation:**

```html
<form id="contact-form" class="contact-form" action="https://formspree.io/f/mgvreyge" method="POST">
  <!-- Name Field -->
  <div class="form-group">
    <label for="name" class="form-label">
      Name <span class="required">*</span>
    </label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      class="form-input" 
      required
      placeholder="John Doe"
      autocomplete="name"
    >
    <span class="form-error" id="name-error"></span>
  </div>
  
  <!-- Email Field -->
  <div class="form-group">
    <label for="email" class="form-label">
      Email <span class="required">*</span>
    </label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="form-input" 
      required
      placeholder="john@example.com"
      autocomplete="email"
    >
    <span class="form-error" id="email-error"></span>
  </div>
  
  <!-- Phone Field -->
  <div class="form-group">
    <label for="phone" class="form-label">
      Phone
    </label>
    <input 
      type="tel" 
      id="phone" 
      name="phone" 
      class="form-input" 
      placeholder="(123) 456-7890"
      autocomplete="tel"
    >
  </div>
  
  <!-- Company Field -->
  <div class="form-group">
    <label for="company" class="form-label">
      Company
    </label>
    <input 
      type="text" 
      id="company" 
      name="company" 
      class="form-input" 
      placeholder="Your Company"
      autocomplete="organization"
    >
  </div>
  
  <!-- Service Field -->
  <div class="form-group">
    <label for="service" class="form-label">
      Service Interested In <span class="required">*</span>
    </label>
    <select id="service" name="service" class="form-input" required>
      <option value="">Select a service...</option>
      <option value="web-development">Web Development</option>
      <option value="logo-design">Logo Design</option>
      <option value="branding">Branding</option>
      <option value="ecommerce">E-commerce</option>
      <option value="seo">SEO</option>
      <option value="other">Other</option>
    </select>
    <span class="form-error" id="service-error"></span>
  </div>
  
  <!-- Budget Field -->
  <div class="form-group">
    <label for="budget" class="form-label">
      Budget Range
    </label>
    <select id="budget" name="budget" class="form-input">
      <option value="">Select budget range...</option>
      <option value="under-5k">Under $5,000</option>
      <option value="5k-10k">$5,000 - $10,000</option>
      <option value="10k-25k">$10,000 - $25,000</option>
      <option value="25k-plus">$25,000+</option>
      <option value="not-sure">Not sure yet</option>
    </select>
  </div>
  
  <!-- Message Field -->
  <div class="form-group">
    <label for="message" class="form-label">
      Project Details <span class="required">*</span>
    </label>
    <textarea 
      id="message" 
      name="message" 
      class="form-input" 
      rows="6" 
      required
      placeholder="Tell us about your project..."
    ></textarea>
    <span class="form-error" id="message-error"></span>
    <span class="character-count">0 / 1000</span>
  </div>
  
  <!-- Honeypot (spam protection) -->
  <input type="text" name="_gotcha" style="display:none">
  
  <!-- Submit Button -->
  <button type="submit" class="btn btn-primary btn-lg btn-block" id="submit-btn">
    <span class="btn-text">Send Message</span>
    <span class="btn-loader" style="display:none;">
      <i class="fas fa-spinner fa-spin"></i>
    </span>
  </button>
  
  <!-- Privacy Note -->
  <p class="form-privacy">
    <i class="fas fa-lock"></i>
    We respect your privacy. Your information is secure and will never be shared.
  </p>
</form>

<!-- Success Message -->
<div id="form-success" class="form-message form-success" style="display:none;">
  <i class="fas fa-check-circle"></i>
  <h3>Thank You!</h3>
  <p>We've received your message and will respond within 24 hours.</p>
</div>

<!-- Error Message -->
<div id="form-error" class="form-message form-error" style="display:none;">
  <i class="fas fa-exclamation-circle"></i>
  <h3>Oops!</h3>
  <p>Something went wrong. Please try again or email us directly at hello@hlpfl.dev</p>
</div>
```

**Form Validation JavaScript:**

```javascript
// Form Validation
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Real-time validation
const validateField = (field) => {
  const value = field.value.trim();
  const errorSpan = document.getElementById(`${field.id}-error`);
  let isValid = true;
  let errorMessage = '';
  
  // Required field check
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Phone validation (optional but if provided, must be valid)
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Message length validation
  if (field.id === 'message' && value) {
    if (value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters';
    }
    if (value.length > 1000) {
      isValid = false;
      errorMessage = 'Message must be less than 1000 characters';
    }
  }
  
  // Update UI
  if (!isValid) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorSpan) {
      errorSpan.textContent = errorMessage;
      errorSpan.style.display = 'block';
    }
  } else if (value) {
    field.classList.remove('error');
    field.classList.add('success');
    if (errorSpan) {
      errorSpan.style.display = 'none';
    }
  } else {
    field.classList.remove('error', 'success');
    if (errorSpan) {
      errorSpan.style.display = 'none';
    }
  }
  
  return isValid;
};

// Add event listeners for real-time validation
const formInputs = contactForm.querySelectorAll('.form-input');
formInputs.forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      validateField(input);
    }
  });
});

// Character counter for message field
const messageField = document.getElementById('message');
const charCount = document.querySelector('.character-count');
if (messageField && charCount) {
  messageField.addEventListener('input', () => {
    const length = messageField.value.length;
    charCount.textContent = `${length} / 1000`;
    if (length > 1000) {
      charCount.style.color = '#EF4444';
    } else {
      charCount.style.color = '#718096';
    }
  });
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate all fields
  let isFormValid = true;
  formInputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loader').style.display = 'inline-block';
  
  try {
    // Submit form
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success
      contactForm.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      
      // Redirect to thank you page after 3 seconds
      setTimeout(() => {
        window.location.href = '/thank-you.html';
      }, 3000);
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          'event_category': 'Contact',
          'event_label': 'Contact Form'
        });
      }
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    // Error
    document.getElementById('form-error').style.display = 'block';
    console.error('Form submission error:', error);
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'inline-block';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
  }
});
```

### 4.2 NAVIGATION FUNCTIONALITY

**Sticky Navigation:**

```javascript
// Sticky Navigation
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add/remove sticky class
  if (currentScroll > 80) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
  
  // Hide/show on scroll (optional)
  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});
```

**Mobile Menu:**

```javascript
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

const toggleMobileMenu = () => {
  mobileMenuBtn.classList.toggle('active');
  navMenu.classList.toggle('mobile-active');
  body.classList.toggle('menu-open');
  
  // Prevent body scroll when menu is open
  if (body.classList.contains('menu-open')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
};

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close menu when clicking a link
const navLinks = navMenu.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('mobile-active')) {
      toggleMobileMenu();
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('mobile-active')) {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      toggleMobileMenu();
    }
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
    toggleMobileMenu();
  }
});

// Close menu on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 992 && navMenu.classList.contains('mobile-active')) {
      toggleMobileMenu();
    }
  }, 250);
});
```

**Active Page Indicator:**

```javascript
// Set active page in navigation
const setActivePage = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === '/')) {
      link.classList.add('active');
    }
  });
};

setActivePage();
```

### 4.3 SMOOTH SCROLLING

```javascript
// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navMenu.classList.contains('mobile-active')) {
        toggleMobileMenu();
      }
      
      // Calculate offset for fixed navbar
      const navbarHeight = navbar.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
```

### 4.4 SCROLL ANIMATIONS

**AOS (Animate On Scroll) Configuration:**

```javascript
// Initialize AOS
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom'
  });
  
  // Refresh AOS on window resize
  window.addEventListener('resize', () => {
    AOS.refresh();
  });
}
```

**Custom Scroll Animations:**

```javascript
// Intersection Observer for custom animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Trigger counter animation for stats
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
      }
      
      // Unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

**Counter Animation:**

```javascript
// Animate counting numbers
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-count')) || parseInt(element.textContent);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

// Observe stat numbers
document.querySelectorAll('[data-count]').forEach(counter => {
  observer.observe(counter);
});
```

### 4.5 LOADING STATES

```javascript
// Page Load Animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Fade in content
  document.querySelectorAll('.fade-in-on-load').forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Image Lazy Loading
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}
```

### 4.6 INTERACTIVE ELEMENTS

**Button Ripple Effect:**

```javascript
// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});
```

**Tooltip System:**

```javascript
// Simple tooltip system
const createTooltip = (element, text) => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  
  const updatePosition = () => {
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  };
  
  element.addEventListener('mouseenter', () => {
    updatePosition();
    tooltip.classList.add('visible');
  });
  
  element.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
};

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(el => {
  createTooltip(el, el.getAttribute('data-tooltip'));
});
```

### 4.7 ACCESSIBILITY FEATURES

```javascript
// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Skip to main content (Alt + S)
  if (e.altKey && e.key === 's') {
    e.preventDefault();
    document.getElementById('main-content')?.focus();
  }
  
  // Open search (Alt + F)
  if (e.altKey && e.key === 'f') {
    e.preventDefault();
    document.getElementById('search-input')?.focus();
  }
});

// Focus trap for modal/menu
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
};

// Apply focus trap to mobile menu
if (navMenu) {
  trapFocus(navMenu);
}

// Announce dynamic content changes to screen readers
const announce = (message) => {
  const announcer = document.getElementById('aria-announcer') || (() => {
    const el = document.createElement('div');
    el.id = 'aria-announcer';
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    document.body.appendChild(el);
    return el;
  })();
  
  announcer.textContent = message;
  setTimeout(() => announcer.textContent = '', 1000);
};

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  
  // Disable AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 0,
      once: true
    });
  }
}
```

### 4.8 ERROR HANDLING

```javascript
// Global error handler
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  
  // Log to analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      'description': e.error.message,
      'fatal': false
    });
  }
});

// Handle failed resource loads
document.addEventListener('DOMContentLoaded', () => {
  // Check for failed images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = '/images/placeholder.jpg';
      this.alt = 'Image failed to load';
    });
  });
  
  // Check for failed scripts
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    script.addEventListener('error', () => {
      console.warn('Failed to load script:', script.src);
    });
  });
});

// Network status monitoring
window.addEventListener('online', () => {
  announce('Connection restored');
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  announce('Connection lost. Some features may not work.');
  document.body.classList.add('offline');
});
```

---

<a name="phase-5"></a>
## PHASE 5: TECHNICAL SPECIFICATIONS

### 5.1 PERFORMANCE OPTIMIZATION

**Image Optimization:**

```html
<!-- Responsive Images -->
<img 
  src="/images/hero-800.webp"
  srcset="
    /images/hero-400.webp 400w,
    /images/hero-800.webp 800w,
    /images/hero-1200.webp 1200w,
    /images/hero-1600.webp 1600w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Hero Image"
  loading="lazy"
  decoding="async"
>

<!-- Picture Element for Format Support -->
<picture>
  <source 
    type="image/webp" 
    srcset="/images/hero.webp"
  >
  <source 
    type="image/jpeg" 
    srcset="/images/hero.jpg"
  >
  <img 
    src="/images/hero.jpg" 
    alt="Hero Image"
    loading="lazy"
  >
</picture>
```

**Resource Hints:**

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/styles.css" as="style">
<link rel="preload" href="/js/app.js" as="script">

<!-- Prefetch next page -->
<link rel="prefetch" href="/portfolio.html">
```

**Code Splitting:**

```javascript
// Lazy load non-critical JavaScript
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

// Load analytics after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    loadScript('https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID');
  }, 2000);
});

// Load chat widget on user interaction
let chatLoaded = false;
const loadChat = () => {
  if (!chatLoaded) {
    loadScript('/js/chat-widget.js');
    chatLoaded = true;
  }
};

document.addEventListener('mousemove', loadChat, { once: true });
document.addEventListener('scroll', loadChat, { once: true });
```

**Caching Strategy:**

```html
<!-- Service Worker Registration -->
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
</script>
```

**Service Worker (sw.js):**

```javascript
const CACHE_NAME = 'hlpfl-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/css/navigation-fix.css',
  '/css/premium-experience.css',
  '/js/app.js',
  '/js/navigation-fix.js',
  '/js/premium-features.js',
  '/images/logo.png',
  '/fonts/inter-var.woff2'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 5.2 SEO OPTIMIZATION

**Meta Tags Template:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>HLPFL | Premium Web Development & Digital Solutions</title>
  <meta name="title" content="HLPFL | Premium Web Development & Digital Solutions">
  <meta name="description" content="Professional web development, design, and digital solutions. Custom websites, portfolio sites, and business platforms built with excellence. 72-hour delivery, transparent pricing.">
  <meta name="keywords" content="web development, custom websites, web design, digital solutions, portfolio development, HLPFL, 72 hour websites, fixed price web development">
  <meta name="author" content="HLPFL">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://hlpfl.dev/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://hlpfl.dev/">
  <meta property="og:title" content="HLPFL | Premium Web Development & Digital Solutions">
  <meta property="og:description" content="Professional web development, design, and digital solutions. Custom websites built with excellence in 72 hours.">
  <meta property="og:image" content="https://hlpfl.dev/images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="HLPFL">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://hlpfl.dev/">
  <meta property="twitter:title" content="HLPFL | Premium Web Development & Digital Solutions">
  <meta property="twitter:description" content="Professional web development, design, and digital solutions. Custom websites built with excellence in 72 hours.">
  <meta property="twitter:image" content="https://hlpfl.dev/images/twitter-image.jpg">
  <meta property="twitter:creator" content="@hlpfl">
  
  <!-- Additional Meta Tags -->
  <meta name="theme-color" content="#c87941">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="format-detection" content="telephone=no">
  
  <!-- Geo Tags -->
  <meta name="geo.region" content="US">
  <meta name="geo.placename" content="United States">
  
  <!-- Verification Tags -->
  <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
  <meta name="msvalidate.01" content="YOUR_VERIFICATION_CODE">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/favicons/favicon-512.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
  
  <!-- Manifest -->
  <link rel="manifest" href="/manifest.json">
</head>
```

**Structured Data (Schema.org):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HLPFL",
  "url": "https://hlpfl.dev",
  "logo": "https://hlpfl.dev/images/logo.png",
  "description": "Professional web development and digital solutions company",
  "foundingDate": "2019",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-234-567-8900",
    "contactType": "Customer Service",
    "email": "hello@hlpfl.dev",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/hlpfl",
    "https://twitter.com/hlpfl",
    "https://www.instagram.com/hlpfl",
    "https://github.com/hlpfl"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "107"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HLPFL",
  "url": "https://hlpfl.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hlpfl.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "HLPFL"
  },
  "areaServed": "US",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Development",
          "description": "Custom website development"
        },
        "price": "5000",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Logo Design",
          "description": "Professional logo design"
        },
        "price": "1500",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Branding",
          "description": "Complete brand identity"
        },
        "price": "500",
        "priceCurrency": "USD"
      }
    ]
  }
}
</script>
```

**Sitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hlpfl.dev/</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hlpfl.dev/portfolio</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hlpfl.dev/services</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hlpfl.dev/pricing</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hlpfl.dev/about</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hlpfl.dev/contact</loc>
    <lastmod>2024-11-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Robots.txt:**

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*.pdf$

Sitemap: https://hlpfl.dev/sitemap.xml

# Crawl-delay for specific bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1
```

---

*[Continuing in next message due to length...]*

**STATUS:** Part 4 in progress
**COMPLETED:** Phase 4 (Functionality), Phase 5 (Technical - partial)
**REMAINING:** Phase 5 (continued), Phases 6-8
**CURRENT LENGTH:** ~45,000 words total

Would you like me to continue with the remaining sections?