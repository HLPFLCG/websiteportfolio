/* ===================================
   CRITICAL FIXES
   Mobile Menu & Navigation Fixes
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCriticalFixes);
    } else {
        initCriticalFixes();
    }

    function initCriticalFixes() {
        fixMobileMenu();
        fixHeroSection();
        ensureLogoVisible();
    }

    /* ===================================
       1. FIX MOBILE MENU
       =================================== */
    function fixMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');
        
        if (!mobileMenuBtn || !navMenu) return;

        // Remove any existing event listeners by cloning
        const newMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMenuBtn, mobileMenuBtn);

        // Add unified event listener
        newMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !newMenuBtn.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        const menu = document.getElementById('nav-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        
        if (!menu || !menuBtn) return;

        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        const menu = document.getElementById('nav-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        
        if (!menu || !menuBtn) return;

        // Remove any conflicting classes
        menu.classList.remove('mobile-active');
        menuBtn.classList.remove('mobile-active');
        
        // Add active classes
        menu.classList.add('active');
        menuBtn.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add aria attributes
        menuBtn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    }

    function closeMobileMenu() {
        const menu = document.getElementById('nav-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        
        if (!menu || !menuBtn) return;

        // Remove active classes
        menu.classList.remove('active');
        menu.classList.remove('mobile-active');
        menuBtn.classList.remove('active');
        menuBtn.classList.remove('mobile-active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update aria attributes
        menuBtn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }

    /* ===================================
       2. FIX HERO SECTION MOBILE
       =================================== */
    function fixHeroSection() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Ensure hero has proper mobile styles
        if (window.innerWidth <= 768) {
            hero.style.minHeight = '100vh';
            hero.style.paddingTop = '80px';
            
            // Fix hero content
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.padding = '2rem 1rem';
            }

            // Fix hero title
            const heroTitle = hero.querySelector('.hero-title, h1');
            if (heroTitle) {
                heroTitle.style.fontSize = '2rem';
                heroTitle.style.lineHeight = '1.2';
            }

            // Fix hero subtitle
            const heroSubtitle = hero.querySelector('.hero-subtitle, .hero-description');
            if (heroSubtitle) {
                heroSubtitle.style.fontSize = '1rem';
                heroSubtitle.style.lineHeight = '1.6';
            }
        }
    }

    /* ===================================
       3. ENSURE LOGO VISIBLE
       =================================== */
    function ensureLogoVisible() {
        const logo = document.querySelector('.logo, .logo-container');
        if (!logo) return;

        // Ensure logo is visible
        logo.style.display = 'flex';
        logo.style.alignItems = 'center';
        logo.style.gap = '0.75rem';

        // Ensure logo image is visible
        const logoImg = logo.querySelector('.logo-img, img');
        if (logoImg) {
            logoImg.style.display = 'block';
            logoImg.style.maxHeight = '40px';
            logoImg.style.width = 'auto';
        }

        // Ensure logo text is visible
        const logoText = logo.querySelector('.logo-text');
        if (logoText) {
            logoText.style.display = 'block';
            logoText.style.fontSize = '1.5rem';
            logoText.style.fontWeight = '700';
        }
    }

    /* ===================================
       4. EXPORT FUNCTIONS
       =================================== */
    window.criticalFixes = {
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu
    };

})();