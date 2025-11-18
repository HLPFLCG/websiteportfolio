// Advanced Developer-Focused HLPFL Website JavaScript
class HLPFLDeveloperWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeDeveloperFeatures();
        this.setupAdvancedAnimations();
    }

    init() {
        // Core elements
        this.loadingScreen = document.querySelector('.loading-screen');
        this.loadingProgress = document.querySelector('.loading-progress');
        this.loadingPercentage = document.querySelector('.loading-percentage');
        this.loadingCode = document.querySelector('.loading-code');
        
        // Navigation
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.themeToggle = document.querySelector('.theme-toggle');
        
        // Performance tracking
        this.performanceMetrics = {
            scrollY: 0,
            mousePosition: { x: 0, y: 0 },
            isScrolling: false,
            scrollTimer: null,
            renderFPS: 0,
            lastFrameTime: performance.now()
        };

        // Theme management
        this.currentTheme = localStorage.getItem('hlpfl-theme') || 'dark';
        this.setTheme(this.currentTheme);
        
        // Start loading sequence
        this.startDeveloperLoadingSequence();
    }

    startDeveloperLoadingSequence() {
        const loadingSteps = [
            { code: 'npm install @hlpfl/developer-solutions', delay: 0 },
            { code: 'Checking dependencies...', delay: 800 },
            { code: 'Building assets...', delay: 1600 },
            { code: 'Optimizing performance...', delay: 2400 },
            { code: 'Initializing dev server...', delay: 3200 }
        ];

        let currentStep = 0;
        let progress = 0;

        const interval = setInterval(() => {
            // Update loading code
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                if (this.loadingCode && performance.now() > step.delay) {
                    this.loadingCode.textContent = step.code;
                    currentStep++;
                }
            }

            // Update progress
            progress += Math.random() * 8 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Update progress display
                if (this.loadingProgress) {
                    this.loadingProgress.style.width = `${progress}%`;
                }
                if (this.loadingPercentage) {
                    this.loadingPercentage.textContent = `${Math.round(progress)}%`;
                }
                
                // Complete loading
                setTimeout(() => {
                    if (this.loadingScreen) {
                        this.loadingScreen.classList.add('hidden');
                    }
                    this.initializePostLoad();
                }, 500);
            } else {
                if (this.loadingProgress) {
                    this.loadingProgress.style.width = `${progress}%`;
                }
                if (this.loadingPercentage) {
                    this.loadingPercentage.textContent = `${Math.round(progress)}%`;
                }
            }
        }, 50);
    }

    initializePostLoad() {
        // Start advanced features
        this.initializeParticles();
        this.initializeParallaxEffects();
        this.initializeCodeAnimations();
        this.initializePerformanceMonitoring();
        this.initializeTerminalAnimations();
        
        // Animate elements on scroll
        setTimeout(() => {
            this.animateElementsOnScroll();
        }, 100);
    }

    setupEventListeners() {
        // Navigation
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Smooth scrolling
        document.querySelectorAll('a[data-scroll-to]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Scroll events with performance optimization
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mouse events for custom cursor
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', () => this.handleMouseDown());
        document.addEventListener('mouseup', () => this.handleMouseUp());

        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Chart controls
        document.querySelectorAll('.chart-control').forEach(control => {
            control.addEventListener('click', () => this.handleChartControl(control));
        });

        // Tech badge interactions
        document.querySelectorAll('.tech-badge').forEach(badge => {
            badge.addEventListener('mouseenter', () => this.animateTechBadge(badge));
        });

        // API parameter hover effects
        document.querySelectorAll('.api-parameter').forEach(param => {
            param.addEventListener('mouseenter', () => this.highlightAPIParameter(param));
            param.addEventListener('mouseleave', () => this.unhighlightAPIParameter(param));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Intersection Observer for performance
        this.setupIntersectionObserver();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Update scroll progress
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercentage}%`;
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
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (scrollToTop) {
            if (scrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        }
        
        // Update scroll to top progress
        this.updateScrollToTopProgress(scrollY);
        
        // Performance optimization
        this.performanceMetrics.isScrolling = true;
        clearTimeout(this.performanceMetrics.scrollTimer);
        this.performanceMetrics.scrollTimer = setTimeout(() => {
            this.performanceMetrics.isScrolling = false;
        }, 150);
        
        // Update parallax effects
        this.updateParallaxEffects(scrollY);
        
        // Animate elements on scroll
        this.animateElementsOnScroll();
    }

    updateScrollToTopProgress(scrollY) {
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (!scrollToTop) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        
        const progressCircle = scrollToTop.querySelector('.progress-ring-progress');
        if (progressCircle) {
            const circumference = 2 * Math.PI * 26;
            const offset = circumference - (scrollPercentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressCircle.style.strokeDasharray = circumference;
        }
    }

    handleMouseMove(e) {
        const { clientX, clientY } = e;
        this.performanceMetrics.mousePosition = { x: clientX, y: clientY };
        
        // Update custom cursor
        this.updateCustomCursor(clientX, clientY);
        
        // Magnetic effects
        this.updateMagneticEffects(clientX, clientY);
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

    updateMagneticEffects(x, y) {
        document.querySelectorAll('.btn, .tech-badge, .card').forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (x - centerX) * 0.15;
            const deltaY = (y - centerY) * 0.15;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 100) {
                element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            } else {
                element.style.transform = '';
            }
        });
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
        localStorage.setItem('hlpfl-theme', this.currentTheme);
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

    initializeParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('#hero-particles') || document.querySelector('.hero-particles');
        
        if (!container) return;
        
        container.appendChild(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 40;
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.connections = [];
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
                ctx.fillStyle = `rgba(26, 35, 50, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop with performance monitoring
        const animate = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
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
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(26, 35, 50, ${0.05 * (1 - distance / 120)})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initializeParallaxEffects() {
        const floatingShapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            floatingShapes.forEach((shape, index) => {
                const speed = parseFloat(shape.dataset.parallax) || 0.5;
                const yOffset = scrollY * speed;
                const rotation = scrollY * 0.02 * (index + 1);
                shape.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
            });
        });
    }

    updateParallaxEffects(scrollY) {
        // Hero content parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const speed = 0.3;
            const yOffset = scrollY * speed;
            heroContent.style.transform = `translateY(${yOffset}px)`;
            heroContent.style.opacity = 1 - (scrollY / 600);
        }
        
        // Hero grid background
        const heroGrid = document.querySelector('.hero-grid');
        if (heroGrid) {
            const yOffset = scrollY * 0.1;
            heroGrid.style.transform = `translateY(${yOffset}px)`;
        }
    }

    initializeCodeAnimations() {
        // Animate code lines
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 100 * index);
        });
        
        // Animate syntax highlighting
        this.animateSyntaxHighlighting();
    }

    animateSyntaxHighlighting() {
        const syntaxElements = document.querySelectorAll('[class*="syntax-"]');
        syntaxElements.forEach(element => {
            element.style.transition = 'color 0.3s ease';
            
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 8px currentColor';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = 'none';
            });
        });
    }

    initializeTerminalAnimations() {
        const terminals = document.querySelectorAll('.terminal-body');
        
        terminals.forEach(terminal => {
            const lines = terminal.querySelectorAll('.terminal-line');
            let currentLine = 0;
            
            const typeNextLine = () => {
                if (currentLine < lines.length) {
                    const line = lines[currentLine];
                    const command = line.querySelector('.terminal-command');
                    
                    if (command && !command.classList.contains('typed')) {
                        command.classList.add('typed');
                        this.typeText(command, command.textContent, () => {
                            currentLine++;
                            setTimeout(typeNextLine, 300);
                        });
                    } else {
                        currentLine++;
                        setTimeout(typeNextLine, 100);
                    }
                }
            };
            
            // Start typing animation
            setTimeout(typeNextLine, 1000);
        });
    }

    typeText(element, text, callback) {
        let index = 0;
        element.textContent = '';
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(typeChar, 30 + Math.random() * 30);
            } else if (callback) {
                callback();
            }
        };
        
        typeChar();
    }

    initializePerformanceMonitoring() {
        // FPS counter
        let fps = 0;
        let lastTime = performance.now();
        let frameCount = 0;
        
        const updateFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Update FPS display (if implemented)
                this.performanceMetrics.renderFPS = fps;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
        
        // Memory usage monitoring
        if (performance.memory) {
            setInterval(() => {
                const memoryUsage = {
                    used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                    total: Math.round(performanceMemory.totalJSHeapSize / 1048576),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
                };
                
                // Log memory usage for debugging
                console.log(`Memory: ${memoryUsage.used}MB / ${memoryUsage.total}MB`);
            }, 5000);
        }
    }

    initializeDeveloperFeatures() {
        // Chart animations
        this.animatePerformanceCharts();
        
        // Git workflow interactions
        this.setupGitWorkflowInteractions();
        
        // API documentation enhancements
        this.setupAPIDocumentationFeatures();
        
        // Tech badge animations
        this.setupTechBadgeAnimations();
    }

    animatePerformanceCharts() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetHeight = bar.style.height;
                    
                    // Reset to 0 and animate to target height
                    bar.style.height = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'height 1s ease-out';
                        bar.style.height = targetHeight;
                    }, 100);
                    
                    observer.unobserve(bar);
                }
            });
        });
        
        chartBars.forEach(bar => observer.observe(bar));
    }

    setupGitWorkflowInteractions() {
        const gitSteps = document.querySelectorAll('.git-step');
        
        gitSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 200 * index);
            
            step.addEventListener('click', () => {
                this.animateGitStep(step);
            });
        });
    }

    animateGitStep(step) {
        step.style.transform = 'scale(1.1)';
        step.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            step.style.transform = 'scale(1)';
        }, 300);
    }

    setupAPIDocumentationFeatures() {
        // Copy code functionality
        document.querySelectorAll('.code-action').forEach(button => {
            if (button.textContent === 'Copy') {
                button.addEventListener('click', () => {
                    const codeContent = button.closest('.code-editor').querySelector('.code-content');
                    const codeText = Array.from(codeContent.querySelectorAll('.line-code'))
                        .map(line => line.textContent)
                        .join('\n');
                    
                    navigator.clipboard.writeText(codeText).then(() => {
                        button.textContent = 'Copied!';
                        button.style.background = 'var(--success)';
                        
                        setTimeout(() => {
                            button.textContent = 'Copy';
                            button.style.background = '';
                        }, 2000);
                    });
                });
            }
        });
        
        // Method badge hover effects
        document.querySelectorAll('.api-method').forEach(method => {
            method.addEventListener('mouseenter', () => {
                method.style.transform = 'scale(1.1)';
                method.style.transition = 'transform 0.2s ease';
            });
            
            method.addEventListener('mouseleave', () => {
                method.style.transform = 'scale(1)';
            });
        });
    }

    setupTechBadgeAnimations() {
        const techBadges = document.querySelectorAll('.tech-badge');
        
        techBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-5px) scale(1.05)';
                badge.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = '';
                badge.style.boxShadow = '';
            });
        });
    }

    animateTechBadge(badge) {
        badge.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            badge.style.animation = '';
        }, 600);
    }

    highlightAPIParameter(param) {
        param.style.background = 'var(--bg-tertiary)';
        param.style.borderLeft = '3px solid var(--primary-navy)';
        param.style.transition = 'all 0.3s ease';
    }

    unhighlightAPIParameter(param) {
        param.style.background = '';
        param.style.borderLeft = '';
    }

    handleChartControl(control) {
        // Remove active class from all controls
        document.querySelectorAll('.chart-control').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to clicked control
        control.classList.add('active');
        
        // Update chart data (simulation)
        this.updateChartData(control.dataset.period);
    }

    updateChartData(period) {
        const chartBars = document.querySelectorAll('.chart-bar');
        const data = {
            day: [60, 45, 70, 85, 75, 55, 50],
            week: [65, 55, 80, 90, 70, 60, 55],
            month: [70, 60, 85, 95, 80, 65, 60]
        };
        
        const values = data[period] || data.day;
        
        chartBars.forEach((bar, index) => {
            const newValue = values[index];
            bar.style.height = `${newValue}%`;
            const valueDisplay = bar.querySelector('.chart-bar-value');
            if (valueDisplay) {
                valueDisplay.textContent = `${Math.round(100 + (100 - newValue) * 2)}ms`;
            }
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('form-success');
        
        // Disable submit button and show loading
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message with animation
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.style.animation = 'fadeInUp 0.6s ease';
            }
            
            // Reset submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Project Request</span><i class="fas fa-paper-plane"></i>';
            }
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.animation = 'fadeOutDown 0.6s ease';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 600);
                }
            }, 5000);
        }, 2000);
    }

    handleKeyboardShortcuts(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
        
        // Ctrl/Cmd + K for command palette (future feature)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Future: Open command palette
            console.log('Command palette shortcut triggered');
        }
        
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            // Future: Show keyboard shortcuts help
            console.log('Help shortcut triggered');
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
                    if (entry.target.classList.contains('card') || 
                        entry.target.classList.contains('stat-card') ||
                        entry.target.classList.contains('feature-card')) {
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

    animateElementsOnScroll() {
        const scrollY = window.scrollY;
        
        // Animate stat cards progress bars
        document.querySelectorAll('.stat-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progressFill = card.querySelector('.progress-fill');
                if (progressFill) {
                    const targetWidth = progressFill.style.width;
                    if (!progressFill.dataset.animated) {
                        progressFill.style.width = '0%';
                        setTimeout(() => {
                            progressFill.style.width = targetWidth;
                            progressFill.dataset.animated = 'true';
                        }, 200);
                    }
                }
            }
        });
    }

    setupAdvancedAnimations() {
        // Add custom CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
            
            [data-animate] {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            [data-animate].animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .terminal-cursor {
                display: inline-block;
                width: 8px;
                height: 16px;
                background: var(--text-primary);
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .tech-badge {
                transition: all 0.3s ease;
            }
            
            .git-step {
                transition: all 0.3s ease;
            }
            
            .code-action {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    initializeAdvancedFeatures() {
        // Initialize any additional advanced features
        this.initializeErrorHandling();
        this.initializeAnalytics();
        this.initializeServiceWorker();
    }

    initializeErrorHandling() {
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('Global error caught:', e.error);
            // Future: Send to error tracking service
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Future: Send to error tracking service
        });
    }

    initializeAnalytics() {
        // Performance analytics
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page Load Performance:', {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.navigationStart
            });
        }
    }

    initializeServiceWorker() {
        // Future: Service worker for offline support
        if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('/sw.js');
        }
    }
}

// Enhanced scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    new HLPFLDeveloperWebsite();
});

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

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'first-input') {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
}