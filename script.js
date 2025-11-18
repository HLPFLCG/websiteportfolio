// Enhanced HLPFL Website JavaScript
class HLPFLWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupAdvancedFeatures();
    }

    init() {
        // Loading screen
        this.loadingScreen = document.querySelector('.loading-screen');
        this.loadingProgress = document.querySelector('.loading-progress');
        this.loadingPercentage = document.querySelector('.loading-percentage');
        
        // Navigation
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.themeToggle = document.querySelector('.theme-toggle');
        
        // Scroll elements
        this.scrollProgress = document.querySelector('.scroll-progress');
        this.scrollToTop = document.querySelector('.scroll-to-top');
        
        // Transitions
        this.transitionOverlay = document.querySelector('.transition-overlay');
        
        // Theme
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Performance monitoring
        this.performanceData = {
            scrollY: 0,
            mousePosition: { x: 0, y: 0 },
            isScrolling: false,
            scrollTimer: null
        };

        // Initialize theme
        this.setTheme(this.currentTheme);
        
        // Start loading animation
        this.startLoadingAnimation();
    }

    setupEventListeners() {
        // Navigation toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[data-scroll-to]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mouse events for cursor
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', () => this.handleMouseDown());
        document.addEventListener('mouseup', () => this.handleMouseUp());

        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => this.toggleFAQ(question));
        });

        // Scroll to top
        if (this.scrollToTop) {
            this.scrollToTop.addEventListener('click', () => this.scrollToTopAction());
        }

        // Intersection Observer for animations
        this.setupIntersectionObserver();

        // Page visibility
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    startLoadingAnimation() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Update loading display
                if (this.loadingProgress) {
                    this.loadingProgress.style.width = `${progress}%`;
                }
                if (this.loadingPercentage) {
                    this.loadingPercentage.textContent = `${Math.round(progress)}%`;
                }
                
                // Hide loading screen
                setTimeout(() => {
                    if (this.loadingScreen) {
                        this.loadingScreen.classList.add('hidden');
                    }
                    this.initializeAfterLoad();
                }, 500);
            } else {
                if (this.loadingProgress) {
                    this.loadingProgress.style.width = `${progress}%`;
                }
                if (this.loadingPercentage) {
                    this.loadingPercentage.textContent = `${Math.round(progress)}%`;
                }
            }
        }, 100);
    }

    initializeAfterLoad() {
        // Start animations
        this.startHeroAnimations();
        this.initializeParticles();
        this.initializeParallax();
        this.initializeMagneticButtons();
        
        // Animate elements on page load
        setTimeout(() => {
            this.animateOnScroll();
        }, 100);
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Show transition overlay
            this.showTransitionOverlay();
            
            setTimeout(() => {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Hide transition overlay
                setTimeout(() => {
                    this.hideTransitionOverlay();
                }, 300);
                
                // Close mobile menu if open
                if (this.navMenu && this.navMenu.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
            }, 300);
        }
    }

    showTransitionOverlay() {
        if (this.transitionOverlay) {
            this.transitionOverlay.classList.add('active');
        }
    }

    hideTransitionOverlay() {
        if (this.transitionOverlay) {
            this.transitionOverlay.classList.remove('active');
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Update scroll progress
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        if (this.scrollProgress) {
            this.scrollProgress.style.width = `${scrollPercentage}%`;
        }
        
        // Update navbar
        if (this.navbar) {
            if (scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
        
        // Show/hide scroll to top button
        if (this.scrollToTop) {
            if (scrollY > 300) {
                this.scrollToTop.classList.add('visible');
            } else {
                this.scrollToTop.classList.remove('visible');
            }
        }
        
        // Update scroll to top progress
        this.updateScrollToTopProgress(scrollY);
        
        // Parallax effects
        this.updateParallax(scrollY);
        
        // Performance optimization
        this.performanceData.isScrolling = true;
        clearTimeout(this.performanceData.scrollTimer);
        this.performanceData.scrollTimer = setTimeout(() => {
            this.performanceData.isScrolling = false;
        }, 150);
        
        // Animate elements on scroll
        this.animateOnScroll();
    }

    updateScrollToTopProgress(scrollY) {
        if (!this.scrollToTop) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        
        const progressCircle = this.scrollToTop.querySelector('.progress-ring-progress');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 26;
            const offset = circumference - (scrollPercentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.strokeDasharray = circumference;
        }
    }

    handleMouseMove(e) {
        const { clientX, clientY } = e;
        this.performanceData.mousePosition = { x: clientX, y: clientY };
        
        // Custom cursor
        this.updateCustomCursor(clientX, clientY);
        
        // Magnetic buttons
        this.updateMagneticButtons(clientX, clientY);
    }

    updateCustomCursor(x, y) {
        const cursorFollower = document.querySelector('.cursor-follower');
        const cursorDot = document.querySelector('.cursor-dot');
        
        if (cursorFollower) {
            cursorFollower.style.left = `${x}px`;
            cursorFollower.style.top = `${y}px`;
        }
        
        if (cursorDot) {
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
        }
    }

    handleMouseDown() {
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(0.8)';
        }
    }

    handleMouseUp() {
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(1)';
        }
    }

    toggleMobileMenu() {
        if (this.navMenu && this.navToggle) {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    setTheme(theme) {
        const root = document.documentElement;
        const themeIcon = this.themeToggle?.querySelector('i');
        
        if (theme === 'light') {
            root.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            root.classList.remove('light-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    setTheme(theme) {
        const root = document.documentElement;
        const themeIcon = this.themeToggle?.querySelector('i');
        
        if (theme === 'light') {
            root.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            root.classList.remove('light-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger animation for cards
                    if (entry.target.classList.contains('card')) {
                        const cards = Array.from(entry.target.parentElement.children);
                        const index = cards.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, options);

        // Observe elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnScroll() {
        // Additional scroll-based animations
        const scrollY = window.scrollY;
        
        // Parallax hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const speed = 0.5;
            heroContent.style.transform = `translateY(${scrollY * speed}px)`;
            heroContent.style.opacity = 1 - (scrollY / 800);
        }
        
        // Floating shapes
        document.querySelectorAll('.shape').forEach((shape, index) => {
            const speed = parseFloat(shape.dataset.parallax) || 0.5;
            const floatSpeed = parseFloat(shape.dataset.float) || 1;
            const yOffset = scrollY * speed * floatSpeed;
            const rotation = scrollY * 0.1 * (index + 1);
            shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        });
    }

    initializeParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const particlesContainer = document.querySelector('#hero-particles') || document.querySelector('.hero-particles');
        
        if (!particlesContainer) return;
        
        particlesContainer.appendChild(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        
        const resizeCanvas = () => {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 121, 65, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(200, 121, 65, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initializeParallax() {
        // Parallax effect for morphing shapes
        const morphShapes = document.querySelectorAll('.morph-shape');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            morphShapes.forEach((shape, index) => {
                const speed = 0.02 * (index + 1);
                const rotation = scrollY * speed;
                const scale = 1 + Math.sin(scrollY * 0.001) * 0.1;
                shape.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
            });
        });
    }

    initializeMagneticButtons() {
        document.querySelectorAll('.btn, .nav-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('magnetic');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('magnetic');
                element.style.transform = '';
            });
        });
    }

    updateMagneticButtons(mouseX, mouseY) {
        document.querySelectorAll('.magnetic').forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.15;
            const deltaY = (mouseY - centerY) * 0.15;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }

    startHeroAnimations() {
        // Animate hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroTitle.style.transition = 'all 1s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate hero subtitle
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 1s ease 0.3s';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate hero CTA
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            heroCTA.style.opacity = '0';
            heroCTA.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroCTA.style.transition = 'all 1s ease 0.6s';
                heroCTA.style.opacity = '1';
                heroCTA.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    toggleFAQ(question) {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        if (answer) {
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                const itemIcon = item.querySelector('.faq-question i');
                if (itemAnswer) itemAnswer.style.maxHeight = '0';
                if (itemIcon) itemIcon.classList.remove('fa-minus');
                if (itemIcon) itemIcon.classList.add('fa-plus');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        }
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('form-success');
        
        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.classList.add('animate-fadeInUp');
            }
            
            // Reset submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Get My Free Quote</span><i class="fas fa-paper-plane"></i>';
            }
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }, 2000);
    }

    scrollToTopAction() {
        this.showTransitionOverlay();
        
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                this.hideTransitionOverlay();
            }, 300);
        }, 300);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, pause animations
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible, resume animations
            document.body.classList.remove('page-hidden');
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
        
        // Tab key enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Mouse click removes keyboard navigation class
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        }, { once: true });
    }

    initializeAnimations() {
        // Add CSS animation classes
        const style = document.createElement('style');
        style.textContent = `
            [data-animate] {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            [data-animate].animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .card {
                transition: all 0.8s ease;
            }
            
            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            .faq-item.active .faq-answer {
                max-height: 500px;
            }
            
            .form-success {
                display: none;
                text-align: center;
                padding: 2rem;
                background: var(--gradient-soft);
                border-radius: var(--radius-lg);
                margin-top: 1rem;
            }
            
            .page-hidden * {
                animation-play-state: paused !important;
                transition: none !important;
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-orange) !important;
                outline-offset: 2px !important;
            }
            
            .scroll-indicator {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.8rem;
                font-weight: var(--font-weight-medium);
                opacity: 0.7;
            }
            
            .scroll-arrow {
                width: 20px;
                height: 30px;
                border: 2px solid var(--text-secondary);
                border-radius: 10px;
                position: relative;
            }
            
            .scroll-arrow::before {
                content: '';
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 8px;
                background: var(--text-secondary);
                border-radius: 2px;
                animation: scroll-indicator 2s infinite;
            }
            
            @keyframes scroll-indicator {
                0% { transform: translateX(-50%) translateY(0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateX(-50%) translateY(10px); opacity: 0; }
            }
            
            .process-timeline {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }
            
            .process-step {
                text-align: center;
                position: relative;
            }
            
            .step-number {
                width: 60px;
                height: 60px;
                background: var(--gradient-primary);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                font-weight: var(--font-weight-bold);
                margin: 0 auto 1.5rem;
                position: relative;
            }
            
            .step-number::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 2rem;
                background: var(--border-color);
            }
            
            .process-step:last-child .step-number::after {
                display: none;
            }
            
            .step-title {
                font-family: var(--font-secondary);
                font-size: 1.3rem;
                font-weight: var(--font-weight-bold);
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .step-description {
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            .stats {
                background: var(--bg-secondary);
                padding: 4rem 0;
            }
            
            .stat-item {
                text-align: center;
                padding: 2rem;
            }
            
            .stat-number {
                font-family: var(--font-secondary);
                font-size: 3rem;
                font-weight: var(--font-weight-black);
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                color: var(--text-secondary);
                font-weight: var(--font-weight-medium);
            }
            
            .testimonials-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }
            
            .testimonial-card {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: 2rem;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition: all var(--transition-normal);
            }
            
            .testimonial-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }
            
            .testimonial-rating {
                margin-bottom: 1rem;
                color: var(--primary-orange);
            }
            
            .testimonial-text {
                font-style: italic;
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .testimonial-author {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .author-info h4 {
                font-family: var(--font-secondary);
                font-weight: var(--font-weight-bold);
                margin-bottom: 0.25rem;
            }
            
            .author-info p {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .pricing-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }
            
            .pricing-card {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: 2.5rem 2rem;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition: all var(--transition-normal);
                position: relative;
            }
            
            .pricing-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }
            
            .pricing-card.featured {
                border-color: var(--primary-orange);
                transform: scale(1.05);
            }
            
            .pricing-badge {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gradient-primary);
                color: white;
                padding: 0.5rem 1.5rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: var(--font-weight-semibold);
            }
            
            .pricing-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .pricing-title {
                font-family: var(--font-secondary);
                font-size: 1.5rem;
                font-weight: var(--font-weight-bold);
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .pricing-price {
                margin-bottom: 1.5rem;
            }
            
            .currency {
                font-size: 1.2rem;
                color: var(--text-secondary);
            }
            
            .amount {
                font-family: var(--font-secondary);
                font-size: 3rem;
                font-weight: var(--font-weight-black);
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .period {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .pricing-features {
                list-style: none;
                margin-bottom: 2rem;
            }
            
            .pricing-features li {
                padding: 0.5rem 0;
                color: var(--text-secondary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .pricing-features i {
                color: var(--primary-orange);
            }
            
            .contact-content {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 4rem;
                margin-top: 3rem;
            }
            
            .contact-info {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
            
            .contact-card {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: 2rem;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                text-align: center;
                transition: all var(--transition-normal);
            }
            
            .contact-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-lg);
            }
            
            .contact-icon {
                width: 60px;
                height: 60px;
                background: var(--gradient-primary);
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 1.5rem;
                color: white;
            }
            
            .contact-card h3 {
                font-family: var(--font-secondary);
                font-weight: var(--font-weight-bold);
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .contact-card a {
                color: var(--primary-orange);
                text-decoration: none;
                font-weight: var(--font-weight-medium);
            }
            
            .contact-card a:hover {
                color: var(--accent-purple);
            }
            
            .contact-form {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-lg);
                padding: 2.5rem;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
        `;
        document.head.appendChild(style);
    }

    setupAdvancedFeatures() {
        // Performance monitoring
        this.performanceMonitor();
        
        // Advanced hover effects
        this.setupAdvancedHovers();
        
        // Smooth reveal animations
        this.setupRevealAnimations();
        
        // Enhanced micro-interactions
        this.setupMicroInteractions();
    }

    performanceMonitor() {
        // Monitor scroll performance
        let ticking = false;
        
        const updateScroll = () => {
            this.performanceData.scrollY = window.scrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }

    setupAdvancedHovers() {
        // Add hover effects to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Add CSS for advanced hover effects
        const style = document.createElement('style');
        style.textContent = `
            .card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(
                    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                    rgba(200, 121, 65, 0.1) 0%,
                    transparent 50%
                );
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            .card:hover::before {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    setupRevealAnimations() {
        // Stagger reveal for sections
        const revealElements = document.querySelectorAll('[data-animate]');
        
        const revealOnScroll = () => {
            revealElements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, index * 100);
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }

    setupMicroInteractions() {
        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HLPFLWebsite();
});

// Enhanced smooth scroll behavior for better UX
if ('scrollBehavior' in document.documentElement.style === false) {
    import('https://cdn.polyfill.io/v3/polyfill.min.js?features=smoothscroll').then(() => {
        // Smooth scroll polyfill loaded
    });
}

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalResources = [
        'hlpfl-symbol.svg',
        'hlpfl-logo-full.svg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
};

preloadCriticalResources();

// Service Worker for better performance (if supported)
if ('serviceWorker' in navigator) {
    // Note: You would need to create a service-worker.js file for this to work
    // navigator.register.register('/service-worker.js');
}