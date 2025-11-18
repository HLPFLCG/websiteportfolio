// Ultra-Enhanced HLPFL JavaScript - Advanced UX/UI Excellence

class HLPFLWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeAdvancedFeatures();
    }

    init() {
        // Performance monitoring
        this.performanceMonitor = new PerformanceMonitor();
        
        // Initialize theme
        this.themeManager = new ThemeManager();
        
        // Initialize loading screen
        this.loadingScreen = new LoadingScreen();
        
        // Initialize cursor
        this.customCursor = new CustomCursor();
        
        // Initialize navigation
        this.navigation = new Navigation();
        
        // Initialize scroll effects
        this.scrollEffects = new ScrollEffects();
        
        // Initialize particles
        this.particleSystem = new ParticleSystem();
        
        // Initialize form handling
        this.formHandler = new FormHandler();
        
        // Initialize animations
        this.animationManager = new AnimationManager();
        
        console.log('🚀 HLPFL Ultra-Enhanced Website Initialized');
    }

    setupEventListeners() {
        // DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('resize', this.debounce(() => {
            this.onResize();
        }, 250));

        window.addEventListener('scroll', this.throttle(() => {
            this.onScroll();
        }, 16));

        // Page visibility
        document.addEventListener('visibilitychange', () => {
            this.onVisibilityChange();
        });
    }

    initializeAnimations() {
        // Split text animations
        this.initializeSplitText();
        
        // Counter animations
        this.initializeCounters();
        
        // Parallax effects
        this.initializeParallax();
        
        // Magnetic effects
        this.initializeMagneticEffects();
    }

    initializeAdvancedFeatures() {
        // Service filtering
        this.initializeServiceFiltering();
        
        // Work portfolio filtering
        this.initializeWorkFiltering();
        
        // Terminal typing animation
        this.initializeTerminalAnimation();
        
        // Progress indicators
        this.initializeProgressIndicators();
    }

    // Event handlers
    onDOMReady() {
        console.log('📱 DOM Ready - Initializing all features');
        
        // Start performance monitoring
        this.performanceMonitor.start();
        
        // Show loading screen
        this.loadingScreen.show();
        
        // Initialize all modules
        setTimeout(() => {
            this.loadingScreen.hide();
            this.startIntroAnimations();
        }, 2000);
    }

    onResize() {
        // Update particle system
        this.particleSystem.resize();
        
        // Update scroll effects
        this.scrollEffects.update();
    }

    onScroll() {
        // Update scroll effects
        this.scrollEffects.update();
        
        // Update navigation
        this.navigation.update();
    }

    onVisibilityChange() {
        if (document.hidden) {
            this.performanceMonitor.pause();
        } else {
            this.performanceMonitor.resume();
        }
    }

    // Feature initializations
    initializeSplitText() {
        const splitTexts = document.querySelectorAll('.split-text');
        splitTexts.forEach(element => {
            const text = element.textContent;
            const letters = text.split('').map((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.animationDelay = `${index * 0.05}s`;
                span.classList.add('split-letter');
                return span;
            });
            
            element.innerHTML = '';
            element.appendChild(...letters);
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    initializeParallax() {
        const parallaxElements = document.querySelectorAll('[data-tilt]');
        
        parallaxElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const tiltX = (y / rect.height) * 10;
                const tiltY = -(x / rect.width) * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    initializeMagneticEffects() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    initializeServiceFiltering() {
        const filterButtons = document.querySelectorAll('.service-filters .filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter cards
                serviceCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    initializeWorkFiltering() {
        const filterButtons = document.querySelectorAll('.work-filters .filter-btn');
        const workItems = document.querySelectorAll('.work-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                workItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    initializeTerminalAnimation() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        let currentLine = 0;

        const typeNextLine = () => {
            if (currentLine < terminalLines.length) {
                const line = terminalLines[currentLine];
                const command = line.querySelector('.typing-animation');
                
                if (command) {
                    const text = command.textContent;
                    command.textContent = '';
                    command.classList.add('typing');
                    
                    let charIndex = 0;
                    const typeChar = () => {
                        if (charIndex < text.length) {
                            command.textContent += text[charIndex];
                            charIndex++;
                            setTimeout(typeChar, 50);
                        } else {
                            command.classList.remove('typing');
                            currentLine++;
                            setTimeout(typeNextLine, 500);
                        }
                    };
                    
                    typeChar();
                } else {
                    currentLine++;
                    setTimeout(typeNextLine, 300);
                }
            }
        };

        // Start terminal animation after intro
        setTimeout(typeNextLine, 3000);
    }

    initializeProgressIndicators() {
        // Scroll progress bar
        const scrollProgress = document.getElementById('scroll-progress');
        const progressBar = scrollProgress?.querySelector('.progress-fill');
        
        // Circular progress
        const circularProgress = document.getElementById('circular-progress');
        const progressCircle = circularProgress?.querySelector('.progress-circle');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                progressBar.style.width = `${scrollPercent}%`;
                
                if (progressCircle) {
                    const circumference = 2 * Math.PI * 28;
                    const offset = circumference - (scrollPercent / 100) * circumference;
                    progressCircle.style.strokeDashoffset = offset;
                }
                
                // Show/hide circular progress
                if (circularProgress) {
                    if (scrollTop > 500) {
                        circularProgress.classList.add('visible');
                    } else {
                        circularProgress.classList.remove('visible');
                    }
                }
            });
        }

        // Scroll to top functionality
        circularProgress?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    startIntroAnimations() {
        // Animate split text
        const splitLetters = document.querySelectorAll('.split-letter');
        splitLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            }, index * 50);
        });

        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    }

    // Utility functions
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

// Performance Monitor Class
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    pause() {
        this.isMonitoring = false;
    }

    resume() {
        if (!this.isMonitoring) {
            this.isMonitoring = true;
            this.monitor();
        }
    }

    monitor() {
        if (!this.isMonitoring) return;

        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update performance display if needed
            this.updateDisplay();
        }

        requestAnimationFrame(() => this.monitor());
    }

    updateDisplay() {
        // Could update a performance display element
        if (this.fps < 30) {
            console.warn(`⚠️ Low FPS detected: ${this.fps}`);
        }
    }
}

// Theme Manager Class
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('hlpfl-theme') || 'light';
        this.applyTheme();
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('hlpfl-theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
}

// Loading Screen Class
class LoadingScreen {
    constructor() {
        this.element = document.getElementById('loading-screen');
        this.progressFill = this.element?.querySelector('.progress-fill');
        this.progressText = this.element?.querySelector('.progress-percentage');
        this.currentProgress = 0;
    }

    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
            this.simulateLoading();
        }
    }

    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }

    simulateLoading() {
        const interval = setInterval(() => {
            this.currentProgress += Math.random() * 15;
            if (this.currentProgress >= 100) {
                this.currentProgress = 100;
                clearInterval(interval);
            }
            this.updateProgress();
        }, 100);
    }

    updateProgress() {
        if (this.progressFill) {
            this.progressFill.style.width = `${this.currentProgress}%`;
        }
        if (this.progressText) {
            this.progressText.textContent = `${Math.round(this.currentProgress)}%`;
        }
    }
}

// Custom Cursor Class
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.follower = this.cursor?.querySelector('.cursor-follower');
        this.dot = this.cursor?.querySelector('.cursor-dot');
        this.trail = this.cursor?.querySelector('.cursor-trail');
        
        if (this.cursor) {
            this.setupCursor();
        }
    }

    setupCursor() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update dot position immediately
            if (this.dot) {
                this.dot.style.left = `${mouseX}px`;
                this.dot.style.top = `${mouseY}px`;
            }
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            if (this.follower) {
                this.follower.style.left = `${followerX}px`;
                this.follower.style.top = `${followerY}px`;
            }
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Trail animation
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.05;
            trailY += (mouseY - trailY) * 0.05;
            
            if (this.trail) {
                this.trail.style.left = `${trailX}px`;
                this.trail.style.top = `${trailY}px`;
            }
            
            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Hover effects
        document.querySelectorAll('[data-cursor="magnetic"]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor?.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor?.classList.remove('cursor-hover');
            });
        });

        // Hide cursor on touch devices
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
        }
    }
}

// Navigation Class
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.getElementById('menu-toggle');
        this.lastScrollY = 0;
        
        this.setupNavigation();
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Mobile menu toggle
        this.menuToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Scroll-based nav hide/show
        window.addEventListener('scroll', () => {
            this.update();
        });
    }

    update() {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            // Scrolling down
            this.navbar?.classList.add('hidden');
        } else {
            // Scrolling up or at top
            this.navbar?.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    }

    toggleMobileMenu() {
        // Implementation for mobile menu toggle
        console.log('Mobile menu toggle');
    }
}

// Scroll Effects Class
class ScrollEffects {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }

    update() {
        // Update any scroll-dependent effects
    }
}

// Particle System Class
class ParticleSystem {
    constructor() {
        this.heroParticles = document.getElementById('hero-particles');
        this.loadingParticles = document.getElementById('loading-particles');
        this.particles = [];
        
        if (this.heroParticles) {
            this.createHeroParticles();
        }
        
        if (this.loadingParticles) {
            this.createLoadingParticles();
        }
    }

    createHeroParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(200, 121, 65, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            this.heroParticles.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createLoadingParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'loading-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 8 + 8}s linear infinite;
            `;
            
            this.loadingParticles.appendChild(particle);
        }
    }

    resize() {
        // Handle resize if needed
    }
}

// Form Handler Class
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.formSuccess = document.getElementById('form-success');
        
        if (this.contactForm) {
            this.setupForm();
        }
    }

    setupForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    submitForm() {
        // Simulate form submission
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        this.showSuccess();
    }

    showSuccess() {
        this.contactForm.style.display = 'none';
        if (this.formSuccess) {
            this.formSuccess.style.display = 'block';
            this.formSuccess.classList.add('fade-in-up');
        }
        
        // Reset form after 5 seconds
        setTimeout(() => {
            this.contactForm.reset();
            this.contactForm.style.display = 'block';
            if (this.formSuccess) {
                this.formSuccess.style.display = 'none';
            }
        }, 5000);
    }
}

// Animation Manager Class
class AnimationManager {
    constructor() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
    }

    setupScrollAnimations() {
        // Add any additional scroll-based animations
    }

    setupHoverAnimations() {
        // Add any additional hover-based animations
    }
}

// Initialize the application
const hlpflWebsite = new HLPFLWebsite();

// Add float animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    .split-letter {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card, .work-item {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);