// HLPFL Website - Consolidated Scripts
// Handles loading screen, persistent sparkled background, and common functionality

(function() {
    'use strict';

    // Initialize sparkled background (persistent across all pages)
    function initSparkledBackground() {
        // Check if background already exists
        if (document.querySelector('.sparkled-background')) {
            return;
        }

        const sparkledBg = document.createElement('div');
        sparkledBg.className = 'sparkled-background';
        document.body.insertBefore(sparkledBg, document.body.firstChild);

        // Create sparkles
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random size between 1-3px
            const size = Math.random() * 2 + 1;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            
            // Random position
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            sparkle.style.animationDelay = Math.random() * 8 + 's';
            sparkle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            sparkledBg.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 8000);
        }

        // Create initial sparkles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createSparkle(), Math.random() * 2000);
        }

        // Continuously create new sparkles
        setInterval(createSparkle, 300);
    }

    // Enhanced Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        const loadingBar = document.getElementById('loadingBar');
        const loadingPercentage = document.getElementById('loadingPercentage');
        const loadingParticles = document.querySelector('.loading-particles');

        // Create loading particles
        if (loadingParticles) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'loading-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                loadingParticles.appendChild(particle);
            }
        }

        let progress = 0;
        const startTime = Date.now();
        const minLoadTime = 2000; // Minimum 2 seconds loading time

        const loadingInterval = setInterval(() => {
            // Variable speed for more realistic loading
            const increment = Math.random() * 15 + 5;
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);

                // Ensure minimum load time
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadTime - elapsedTime);

                setTimeout(() => {
                    completeLoading();
                }, remainingTime);
            }

            // Update UI
            updateLoadingUI(progress);
        }, 150);

        function updateLoadingUI(currentProgress) {
            if (loadingBar) {
                loadingBar.style.width = currentProgress + '%';
            }
            if (loadingPercentage) {
                loadingPercentage.textContent = Math.floor(currentProgress) + '%';
            }
        }

        function completeLoading() {
            // Fade out loading screen
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen after fade out
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 1500);

            // Initialize page-specific functionality
            initPageFeatures();
        }

        // Fallback: Ensure loading screen completes on window load
        window.addEventListener('load', () => {
            if (progress < 100) {
                setTimeout(() => {
                    if (progress < 100) {
                        progress = 100;
                        updateLoadingUI(progress);
                        setTimeout(completeLoading, 300);
                    }
                }, minLoadTime);
            }
        });
    }

    // Initialize page-specific features after loading
    function initPageFeatures() {
        // Smooth scroll for navigation links
        initSmoothScroll();
        
        // Scroll indicator
        initScrollIndicator();
        
        // Any other page-specific initializations
        initAnimations();
    }

    // Smooth scrolling
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll indicator functionality
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('section');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Initialize animations on scroll
    function initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animations
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Navigation functionality
    function initNavigation() {
        // Mobile menu toggle (if needed)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Contact form handling (if present)
    function initContactForm() {
        const form = document.querySelector('#contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Here you would normally send the data to a server
                console.log('Form submitted:', data);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                successMessage.style.cssText = `
                    background: var(--primary);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    text-align: center;
                `;
                
                form.appendChild(successMessage);
                form.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            });
        }
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initSparkledBackground();
        initLoadingScreen();
        initNavigation();
        initContactForm();
    });

    // Initialize sparkled background immediately for better visual effect
    initSparkledBackground();

})();