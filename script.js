/**
 * HLPFL Ultra-Advanced Scroll Experience
 * Cutting-edge web interactions and animations
 */

class HLPFLUltraScrollExperience {
    constructor() {
        this.isLoaded = false;
        this.scrollY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.isScrolling = false;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        this.mouseVelocity = { x: 0, y: 0 };
        this.lastMouseTime = Date.now();
        this.particles = [];
        this.morphShapes = [];
        this.currentTheme = 'light';
        this.currentLanguage = 'EN';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.initializeParticles();
        this.initializeMorphShapes();
        this.hideLoadingScreen();
        this.startScrollAnimations();
        this.initializeThemeToggle();
        this.initializeLanguageToggle();
        this.initializeFilters();
    }

    setupEventListeners() {
        // Enhanced scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Enhanced mouse events
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Touch events for mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Resize events with debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Navigation events
        document.addEventListener('DOMContentLoaded', this.setupNavigation.bind(this));
        
        // Form submission
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Intersection Observer for scroll animations
        this.setupIntersectionObserver();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Wheel event for smooth scrolling
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }

    initializeComponents() {
        // Initialize custom cursors
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.cursorDot = document.querySelector('.cursor-dot');
        
        // Initialize scroll progress
        this.scrollProgress = document.querySelector('.scroll-progress');
        
        // Initialize parallax elements with enhanced data
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.floatElements = document.querySelectorAll('[data-float]');
        
        // Initialize animated text elements
        this.splitTextElements = document.querySelectorAll('[data-split-text]');
        
        // Initialize counter elements
        this.counterElements = document.querySelectorAll('[data-counter]');
        
        // Initialize progress elements
        this.progressElements = document.querySelectorAll('[data-progress]');
        
        // Initialize scroll indicators
        this.scrollIndicators = document.querySelectorAll('[data-scroll-indicator]');
        
        // Initialize sticky elements
        this.stickyElements = document.querySelectorAll('[data-sticky-element]');
        
        // Initialize scroll cards
        this.scrollCards = document.querySelectorAll('[data-scroll-card]');
        
        // Initialize work items
        this.workItems = document.querySelectorAll('[data-work-item]');
        
        // Initialize center text elements
        this.centerTextElements = document.querySelectorAll('[data-center-text]');
        
        // Initialize parallax elements
        this.parallaxElements = document.querySelectorAll('[data-parallax-element]');
        
        // Initialize scroll to top
        this.scrollToTop = document.querySelector('[data-scroll-to-top]');
        
        // Process split text
        this.processSplitText();
        
        // Initialize magnetic buttons
        this.initializeMagneticButtons();
    }

    initializeParticles() {
        const canvas = document.createElement('canvas');
        const heroParticles = document.getElementById('hero-particles');
        if (heroParticles) {
            heroParticles.appendChild(canvas);
            this.particleCanvas = canvas;
            this.particleCtx = canvas.getContext('2d');
            this.resizeParticleCanvas();
            this.createParticles();
            this.animateParticles();
        }
    }

    resizeParticleCanvas() {
        if (this.particleCanvas) {
            this.particleCanvas.width = window.innerWidth;
            this.particleCanvas.height = window.innerHeight;
        }
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animateParticles() {
        if (!this.particleCtx) return;
        
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.particleCanvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.particleCanvas.height) particle.vy *= -1;
            
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.particleCtx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.particleCtx.fill();
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    initializeMorphShapes() {
        const morphElements = document.querySelectorAll('.morph-shape');
        morphElements.forEach((element, index) => {
            this.morphShapes.push({
                element,
                phase: index * Math.PI / 2,
                speed: 0.02 + index * 0.01
            });
        });
        this.animateMorphShapes();
    }

    animateMorphShapes() {
        this.morphShapes.forEach(shape => {
            shape.phase += shape.speed;
            const scale = 1 + Math.sin(shape.phase) * 0.2;
            const rotation = Math.sin(shape.phase) * 10;
            const borderRadius = 50 + Math.sin(shape.phase) * 30;
            
            shape.element.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
            shape.element.style.borderRadius = `${borderRadius}%`;
        });
        
        requestAnimationFrame(() => this.animateMorphShapes());
    }

    hideLoadingScreen() {
        const loadingPercentage = document.querySelector('.loading-percentage');
        const loadingProgress = document.querySelector('.loading-progress');
        let percentage = 0;
        
        const loadingInterval = setInterval(() => {
            percentage += Math.random() * 15;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    const loadingScreen = document.querySelector('.loading-screen');
                    if (loadingScreen) {
                        loadingScreen.classList.add('loaded');
                        this.isLoaded = true;
                        this.triggerInitialAnimations();
                    }
                }, 500);
            }
            
            if (loadingPercentage) loadingPercentage.textContent = `${Math.floor(percentage)}%`;
            if (loadingProgress) loadingProgress.style.width = `${percentage}%`;
        }, 100);
    }

    triggerInitialAnimations() {
        // Animate hero title lines
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0) rotateZ(0)';
            }, 200 * index);
        });
        
        // Animate title highlight
        const titleHighlight = document.querySelector('.title-highlight');
        if (titleHighlight) {
            setTimeout(() => {
                titleHighlight.style.opacity = '1';
                titleHighlight.style.transform = 'translateY(0) scale(1)';
            }, 800);
        }
        
        // Animate hero subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 1000);
        }
        
        // Animate hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            setTimeout(() => {
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }, 1200);
        }
        
        // Animate hero CTA
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            setTimeout(() => {
                heroCTA.style.opacity = '1';
                heroCTA.style.transform = 'translateY(0)';
            }, 1400);
        }
        
        // Start counters when visible
        this.startCounters();
        this.startProgressBars();
    }

    handleScroll() {
        this.scrollY = window.pageYOffset;
        this.scrollDirection = this.scrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = this.scrollY;
        
        // Update scroll progress
        this.updateScrollProgress();
        
        // Update navigation
        this.updateNavigation();
        
        // Handle parallax effects
        this.updateParallax();
        
        // Handle float animations
        this.updateFloatAnimations();
        
        // Handle scroll-based animations
        this.updateScrollAnimations();
        
        // Update scroll to top button
        this.updateScrollToTop();
        
        // Debounced scroll handling
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                this.handleScrollUpdate();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }

    handleScrollUpdate() {
        // Additional scroll-based updates
        this.updateScrollIndicators();
        this.updateStickyElements();
        this.updateMagneticButtons();
    }

    updateScrollProgress() {
        if (this.scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            this.scrollProgress.style.width = scrolled + '%';
        }
        
        // Update circular progress in scroll to top
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const offset = 283 - (283 * scrolled) / 100;
            progressFill.style.strokeDashoffset = offset;
        }
    }

    updateNavigation() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (this.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (this.scrollDirection === 'down' && this.scrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
    }

    updateParallax() {
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(this.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax for floating shapes with rotation
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(this.scrollY * speed);
            const rotation = this.scrollY * 0.05 * (index % 2 === 0 ? 1 : -1);
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
        
        // Enhanced parallax for hero particles
        if (this.particleCanvas) {
            const parallaxSpeed = 0.3;
            const yPos = -(this.scrollY * parallaxSpeed);
            this.particleCanvas.style.transform = `translateY(${yPos}px)`;
        }
    }

    updateFloatAnimations() {
        this.floatElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const screenCenter = window.innerHeight / 2;
            const distance = elementCenter - screenCenter;
            
            const floatY = Math.sin(Date.now() * 0.001 + parseFloat(element.dataset.floatOffset || 0)) * 10;
            const rotateY = distance * 0.01;
            
            element.style.transform = `translateY(${floatY}px) rotateY(${rotateY}deg)`;
        });
    }

    updateScrollAnimations() {
        // Handle scroll cards with stagger effect
        this.scrollCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 100);
            }
        });
        
        // Handle work items with enhanced effects
        this.workItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                setTimeout(() => {
                    item.classList.add('animate-in');
                    this.createWorkItemEffect(item);
                }, index * 150);
            }
        });
        
        // Handle center text animations
        this.centerTextElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const screenCenter = window.innerHeight / 2;
            const distance = Math.abs(elementCenter - screenCenter);
            
            if (distance < 200) {
                element.classList.add('animate-in');
            }
        });
    }

    createWorkItemEffect(item) {
        const rect = item.getBoundingClientRect();
        const particles = 20;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'work-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-orange);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = 5 + Math.random() * 5;
            const lifetime = 1000 + Math.random() * 1000;
            
            this.animateParticle(particle, angle, velocity, lifetime);
        }
    }

    animateParticle(particle, angle, velocity, lifetime) {
        const startTime = Date.now();
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / lifetime;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const distance = velocity * elapsed * 0.1;
            const x = startX + Math.cos(angle) * distance;
            const y = startY + Math.sin(angle) * distance;
            const opacity = 1 - progress;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    updateScrollIndicators() {
        this.scrollIndicators.forEach(indicator => {
            const opacity = Math.max(0, 1 - (this.scrollY / 500));
            indicator.style.opacity = opacity;
        });
    }

    updateStickyElements() {
        this.stickyElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const parentRect = element.parentElement.getBoundingClientRect();
            
            if (rect.bottom <= parentRect.top) {
                element.style.position = 'sticky';
                element.style.top = '100px';
            } else {
                element.style.position = 'relative';
                element.style.top = 'auto';
            }
        });
    }

    updateScrollToTop() {
        if (this.scrollToTop) {
            if (this.scrollY > 500) {
                this.scrollToTop.classList.add('visible');
            } else {
                this.scrollToTop.classList.remove('visible');
            }
        }
    }

    handleMouseMove(e) {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastMouseTime;
        
        if (deltaTime > 0) {
            this.mouseVelocity.x = (e.clientX - this.cursorX) / deltaTime;
            this.mouseVelocity.y = (e.clientY - this.cursorY) / deltaTime;
        }
        
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
        this.lastMouseTime = currentTime;
        
        // Update custom cursors
        if (this.cursorFollower) {
            this.cursorFollower.style.left = this.cursorX + 'px';
            this.cursorFollower.style.top = this.cursorY + 'px';
        }
        
        if (this.cursorDot) {
            this.cursorDot.style.left = this.cursorX + 'px';
            this.cursorDot.style.top = this.cursorY + 'px';
        }
        
        // Enhanced mouse parallax effect
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.hero-background .shape').forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const rotateX = moveY * speed * 10;
            const rotateY = moveX * speed * 10;
            shape.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Update magnetic buttons
        this.updateMagneticButtons();
    }

    handleMouseDown() {
        if (this.cursorFollower) {
            this.cursorFollower.classList.add('active');
        }
    }

    handleMouseUp() {
        if (this.cursorFollower) {
            this.cursorFollower.classList.remove('active');
        }
    }

    handleMouseEnter(e) {
        if (e.target.matches('a, button, .btn-primary, .btn-secondary')) {
            if (this.cursorFollower) {
                this.cursorFollower.classList.add('hover');
            }
        }
    }

    handleMouseLeave(e) {
        if (e.target.matches('a, button, .btn-primary, .btn-secondary')) {
            if (this.cursorFollower) {
                this.cursorFollower.classList.remove('hover');
            }
        }
    }

    handleTouchStart(e) {
        // Handle touch start for mobile
        const touch = e.touches[0];
        this.cursorX = touch.clientX;
        this.cursorY = touch.clientY;
    }

    handleTouchMove(e) {
        // Handle touch move for mobile
        const touch = e.touches[0];
        this.cursorX = touch.clientX;
        this.cursorY = touch.clientY;
    }

    handleTouchEnd(e) {
        // Handle touch end for mobile
    }

    handleResize() {
        this.resizeParticleCanvas();
        this.updateScrollProgress();
    }

    handleWheel(e) {
        // Enhanced wheel handling for smooth scrolling
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            // Zoom functionality can be added here
        }
    }

    handleKeyboard(e) {
        // Keyboard navigation
        switch(e.key) {
            case 'Escape':
                // Close modals or reset states
                break;
            case 'ArrowUp':
                e.preventDefault();
                window.scrollBy({ top: -100, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                e.preventDefault();
                window.scrollBy({ top: 100, behavior: 'smooth' });
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when page is hidden
            document.body.classList.add('page-hidden');
        } else {
            // Resume animations when page is visible
            document.body.classList.remove('page-hidden');
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.3, 0.6, 1]
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleElementInView(entry.target, entry.intersectionRatio);
                } else {
                    this.handleElementOutOfView(entry.target);
                }
            });
        }, options);

        // Observe all animated elements
        document.querySelectorAll('[data-fade-up], [data-fade-left], [data-fade-right], .scroll-reveal').forEach(el => {
            this.observer.observe(el);
        });
    }

    handleElementInView(element, ratio) {
        element.classList.add('animate-in');
        
        // Handle counters
        if (element.hasAttribute('data-counter') && ratio > 0.5) {
            this.animateCounter(element);
        }
        
        // Handle split text
        if (element.hasAttribute('data-split-text')) {
            this.animateSplitText(element);
        }
        
        // Handle progress bars
        if (element.hasAttribute('data-progress')) {
            this.animateProgress(element);
        }
    }

    handleElementOutOfView(element) {
        // Optional: Handle elements leaving viewport
    }

    processSplitText() {
        this.splitTextElements.forEach(element => {
            const text = element.innerText;
            const chars = text.split('');
            element.innerHTML = '';
            element.classList.add('split-text');
            
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });
    }

    animateSplitText(element) {
        if (!element.classList.contains('animated')) {
            element.classList.add('animated');
            const spans = element.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateZ(0)';
                }, index * 50);
            });
        }
    }

    startCounters() {
        this.counterElements.forEach(element => {
            const target = parseInt(element.dataset.counter);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            // Start when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const current = parseInt(element.textContent);
        
        if (current < target) {
            const increment = Math.ceil((target - current) / 10);
            const newValue = Math.min(current + increment, target);
            element.textContent = newValue;
            
            setTimeout(() => {
                this.animateCounter(element);
            }, 100);
        }
    }

    startProgressBars() {
        this.progressElements.forEach(element => {
            const target = parseInt(element.dataset.progress);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.width = `${target}%`;
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    animateProgress(element) {
        const target = parseInt(element.dataset.progress);
        element.style.width = `${target}%`;
    }

    initializeMagneticButtons() {
        this.magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .service-card, .work-item');
    }

    updateMagneticButtons() {
        this.magneticButtons?.forEach(button => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = this.cursorX - centerX;
            const deltaY = this.cursorY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const moveX = deltaX * force * 0.2;
                const moveY = deltaY * force * 0.2;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                button.style.transform = '';
            }
        });
    }

    initializeThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                document.body.classList.toggle('dark-mode');
                
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                }
                
                // Save theme preference
                localStorage.setItem('theme', this.currentTheme);
            });
            
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.currentTheme = savedTheme;
                if (savedTheme === 'dark') {
                    document.body.classList.add('dark-mode');
                    const icon = themeToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-sun';
                }
            }
        }
    }

    initializeLanguageToggle() {
        const languageToggle = document.querySelector('.language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.currentLanguage = this.currentLanguage === 'EN' ? 'ES' : 'EN';
                languageToggle.querySelector('span').textContent = this.currentLanguage;
                
                // Language switching logic can be implemented here
                this.updateLanguage(this.currentLanguage);
            });
        }
    }

    updateLanguage(language) {
        // Implement language switching
        console.log(`Switching to ${language}`);
    }

    initializeFilters() {
        // Service category filter
        const categoryBtns = document.querySelectorAll('.category-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                serviceCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('animate-in'), 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Work filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        const workItems = document.querySelectorAll('.work-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                workItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('animate-in'), 100);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupNavigation() {
        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('[data-scroll-to]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    // Add page transition effect
                    this.showPageTransition();
                    
                    setTimeout(() => {
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);
                    
                    setTimeout(() => {
                        this.hidePageTransition();
                    }, 800);
                }
            });
        });
        
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Scroll to top functionality
        if (this.scrollToTop) {
            this.scrollToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    showPageTransition() {
        const transition = document.querySelector('.transition-overlay');
        if (transition) {
            transition.classList.add('active');
        }
    }

    hidePageTransition() {
        const transition = document.querySelector('.transition-overlay');
        if (transition) {
            transition.classList.remove('active');
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('.btn-text').textContent;
        const originalIcon = submitButton.querySelector('.btn-icon').innerHTML;
        
        submitButton.querySelector('.btn-text').textContent = 'Sending...';
        submitButton.querySelector('.btn-icon').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.querySelector('.btn-text').textContent = 'Message Sent!';
            submitButton.querySelector('.btn-icon').innerHTML = '<i class="fas fa-check"></i>';
            submitButton.style.background = 'var(--accent-green)';
            
            // Show success message
            const successMessage = form.parentElement.querySelector('.form-success-message');
            if (successMessage) {
                successMessage.classList.add('show');
            }
            
            setTimeout(() => {
                form.reset();
                submitButton.querySelector('.btn-text').textContent = originalText;
                submitButton.querySelector('.btn-icon').innerHTML = originalIcon;
                submitButton.disabled = false;
                submitButton.style.background = '';
                
                if (successMessage) {
                    successMessage.classList.remove('show');
                }
            }, 3000);
        }, 2000);
    }

    startScrollAnimations() {
        // Continuous animations based on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const animate = () => {
            // Add any continuous scroll-based animations here
            requestAnimationFrame(animate);
        };
        animate();
    }

    setupPerformanceMonitoring() {
        // FPS monitoring
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        
        this.monitorFPS();
    }

    monitorFPS() {
        const measureFPS = () => {
            this.frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                this.frameCount = 0;
                this.lastTime = currentTime;
                
                // Log performance issues
                if (this.fps < 30) {
                    console.warn(`Low FPS detected: ${this.fps}`);
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
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
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Advanced scroll effects
    createScrollTimeline() {
        // Create scroll-based animations using ScrollTimeline API (experimental)
        if ('CSS' in window && 'supports' in window.CSS && CSS.supports('animation-timeline: scroll()')) {
            this.setupScrollTimelineAnimations();
        } else {
            this.setupFallbackAnimations();
        }
    }

    setupScrollTimelineAnimations() {
        document.documentElement.style.setProperty('--scroll-y', this.scrollY);
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes scroll-fade {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .scroll-animated {
                animation: scroll-fade 1s ease-out;
                animation-timeline: scroll();
                animation-range: entry 0% entry 30%;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    setupFallbackAnimations() {
        // Fallback animations are handled by IntersectionObserver
    }
}

// Enhanced Performance Monitor
class UltraPerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memoryUsage: 0,
            scrollEventsPerSecond: 0,
            animationFrames: 0
        };
        this.startTime = performance.now();
        this.init();
    }

    init() {
        this.monitorFPS();
        this.monitorMemory();
        this.monitorScrollPerformance();
        this.monitorAnimationPerformance();
        this.generatePerformanceReport();
    }

    monitorFPS() {
        let frames = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
    }

    monitorMemory() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
            }, 1000);
        }
    }

    monitorScrollPerformance() {
        let scrollEvents = 0;
        let lastScrollTime = performance.now();
        
        const measureScrollPerformance = () => {
            scrollEvents++;
            const currentTime = performance.now();
            const timeDiff = currentTime - lastScrollTime;
            
            if (timeDiff > 100) {
                this.metrics.scrollEventsPerSecond = Math.round(scrollEvents / (timeDiff / 1000));
                scrollEvents = 0;
                lastScrollTime = currentTime;
            }
        };
        
        window.addEventListener('scroll', this.throttle(measureScrollPerformance, 100));
    }

    monitorAnimationPerformance() {
        let animationFrames = 0;
        let lastAnimationTime = performance.now();
        
        const measureAnimationPerformance = () => {
            animationFrames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastAnimationTime + 1000) {
                this.metrics.animationFrames = animationFrames;
                animationFrames = 0;
                lastAnimationTime = currentTime;
            }
            
            requestAnimationFrame(measureAnimationPerformance);
        };
        
        measureAnimationPerformance();
    }

    generatePerformanceReport() {
        setInterval(() => {
            const report = {
                timestamp: new Date().toISOString(),
                fps: this.metrics.fps,
                memoryMB: this.metrics.memoryUsage,
                scrollEvents: this.metrics.scrollEventsPerSecond,
                animationFrames: this.metrics.animationFrames,
                performance: this.metrics.fps >= 50 ? 'Good' : this.metrics.fps >= 30 ? 'Fair' : 'Poor'
            };
            
            console.log('Performance Report:', report);
        }, 5000);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const scrollExperience = new HLPFLUltraScrollExperience();
    const performanceMonitor = new UltraPerformanceMonitor();
    
    // Make instances available globally for debugging
    window.HLPFL = scrollExperience;
    window.PerformanceMonitor = performanceMonitor;
    
    console.log('🚀 HLPFL Ultra-Advanced Scroll Experience initialized successfully!');
    console.log('📊 Performance monitoring active');
    console.log('✨ All systems operational');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HLPFLUltraScrollExperience, UltraPerformanceMonitor };
}