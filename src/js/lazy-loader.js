// ===================================
// Advanced Lazy Loading System
// ===================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.videos = document.querySelectorAll('video[data-src]');
        this.iframes = document.querySelectorAll('iframe[data-src]');
        this.init();
    }

    init() {
        this.setupImageObserver();
        this.setupVideoObserver();
        this.setupIframeObserver();
        this.preloadCriticalImages();
    }

    setupImageObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.images.forEach(img => observer.observe(img));
    }

    setupVideoObserver() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadVideo(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.videos.forEach(video => observer.observe(video));
    }

    setupIframeObserver() {
        const options = {
            root: null,
            rootMargin: '200px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadIframe(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.iframes.forEach(iframe => observer.observe(iframe));
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (!src) return;

        // Create placeholder with blur effect
        if (!img.style.filter) {
            img.style.filter = 'blur(20px)';
            img.style.transition = 'filter 0.3s ease-out';
        }

        // Create temporary image to preload
        const tempImg = new Image();
        
        tempImg.onload = () => {
            // Set the actual source
            img.src = src;
            if (srcset) img.srcset = srcset;
            
            // Remove blur after image loads
            img.addEventListener('load', () => {
                img.style.filter = 'blur(0)';
                img.classList.add('loaded');
                
                // Dispatch custom event
                img.dispatchEvent(new CustomEvent('imageLoaded', {
                    detail: { src }
                }));
            }, { once: true });
        };
        
        tempImg.onerror = () => {
            console.error('Failed to load image:', src);
            img.classList.add('load-error');
        };
        
        tempImg.src = src;
    }

    loadVideo(video) {
        const src = video.dataset.src;
        const poster = video.dataset.poster;
        
        if (src) {
            video.src = src;
        }
        
        if (poster) {
            video.poster = poster;
        }
        
        video.load();
        video.classList.add('loaded');
    }

    loadIframe(iframe) {
        const src = iframe.dataset.src;
        
        if (src) {
            iframe.src = src;
            iframe.classList.add('loaded');
        }
    }

    preloadCriticalImages() {
        // Preload images marked as critical
        const criticalImages = document.querySelectorAll('img[data-critical]');
        
        criticalImages.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = src;
                document.head.appendChild(preloadLink);
            }
        });
    }
}

// Progressive Image Loading with Low Quality Image Placeholder (LQIP)
class ProgressiveImageLoader {
    constructor() {
        this.images = document.querySelectorAll('.progressive-image');
        this.init();
    }

    init() {
        this.images.forEach(container => {
            this.loadProgressiveImage(container);
        });
    }

    loadProgressiveImage(container) {
        const img = container.querySelector('img');
        const lowQualitySrc = img.dataset.lowsrc;
        const highQualitySrc = img.dataset.src;

        if (!highQualitySrc) return;

        // Load low quality image first
        if (lowQualitySrc) {
            img.src = lowQualitySrc;
            img.style.filter = 'blur(10px)';
        }

        // Load high quality image
        const highQualityImg = new Image();
        highQualityImg.onload = () => {
            img.src = highQualitySrc;
            img.style.filter = 'blur(0)';
            container.classList.add('loaded');
        };
        highQualityImg.src = highQualitySrc;
    }
}

// Responsive Image Loader
class ResponsiveImageLoader {
    constructor() {
        this.init();
    }

    init() {
        this.setupResponsiveImages();
        this.watchViewportChanges();
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-sizes]');
        
        images.forEach(img => {
            this.updateImageSource(img);
        });
    }

    updateImageSource(img) {
        const sizes = JSON.parse(img.dataset.sizes || '{}');
        const viewportWidth = window.innerWidth;
        
        let selectedSrc = img.dataset.src;
        
        // Find the appropriate source based on viewport width
        Object.keys(sizes).sort((a, b) => parseInt(b) - parseInt(a)).forEach(breakpoint => {
            if (viewportWidth >= parseInt(breakpoint)) {
                selectedSrc = sizes[breakpoint];
            }
        });
        
        if (selectedSrc && img.src !== selectedSrc) {
            img.src = selectedSrc;
        }
    }

    watchViewportChanges() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.setupResponsiveImages();
            }, 250);
        });
    }
}

// Initialize all lazy loading systems
function initLazyLoading() {
    new LazyLoader();
    new ProgressiveImageLoader();
    new ResponsiveImageLoader();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// Re-initialize on dynamic content load
window.addEventListener('contentLoaded', initLazyLoading);