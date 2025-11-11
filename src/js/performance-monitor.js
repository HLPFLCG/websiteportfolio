// ===================================
// Performance Monitor
// ===================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            lcp: 0,
            fid: 0,
            cls: 0,
            ttfb: 0,
            loadTime: 0
        };
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.measureCoreWebVitals();
        this.measureFPS();
        this.createDashboard();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            this.metrics.loadTime = perfData.loadEventEnd - perfData.navigationStart;
            this.metrics.ttfb = perfData.responseStart - perfData.navigationStart;
            this.updateDashboard();
        });
    }

    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                    this.updateDashboard();
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP measurement not supported');
            }

            // First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                        this.updateDashboard();
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID measurement not supported');
            }

            // Cumulative Layout Shift (CLS)
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            this.metrics.cls = clsValue;
                            this.updateDashboard();
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS measurement not supported');
            }
        }
    }

    measureFPS() {
        let lastTime = performance.now();
        let frames = 0;
        
        const countFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
                this.updateDashboard();
            }
            
            requestAnimationFrame(countFPS);
        };
        
        requestAnimationFrame(countFPS);
    }

    createDashboard() {
        // Only create dashboard in development mode or if explicitly enabled
        if (!this.shouldShowDashboard()) return;

        const dashboard = document.createElement('div');
        dashboard.id = 'performance-dashboard';
        dashboard.className = 'performance-dashboard';
        dashboard.innerHTML = `
            <div class="perf-header">
                <span class="perf-title">Performance</span>
                <button class="perf-toggle" aria-label="Toggle performance dashboard">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>
            </div>
            <div class="perf-content">
                <div class="perf-metric">
                    <span class="perf-label">FPS</span>
                    <span class="perf-value" id="perf-fps">--</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">LCP</span>
                    <span class="perf-value" id="perf-lcp">--</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">FID</span>
                    <span class="perf-value" id="perf-fid">--</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">CLS</span>
                    <span class="perf-value" id="perf-cls">--</span>
                </div>
                <div class="perf-metric">
                    <span class="perf-label">Load</span>
                    <span class="perf-value" id="perf-load">--</span>
                </div>
            </div>
        `;

        document.body.appendChild(dashboard);

        // Toggle functionality
        const toggle = dashboard.querySelector('.perf-toggle');
        const content = dashboard.querySelector('.perf-content');
        
        toggle.addEventListener('click', () => {
            dashboard.classList.toggle('collapsed');
        });
    }

    shouldShowDashboard() {
        // Show if in development mode or if ?perf=true in URL
        return window.location.hostname === 'localhost' || 
               window.location.search.includes('perf=true');
    }

    updateDashboard() {
        const fpsEl = document.getElementById('perf-fps');
        const lcpEl = document.getElementById('perf-lcp');
        const fidEl = document.getElementById('perf-fid');
        const clsEl = document.getElementById('perf-cls');
        const loadEl = document.getElementById('perf-load');

        if (fpsEl) {
            fpsEl.textContent = this.metrics.fps;
            fpsEl.className = 'perf-value ' + this.getScoreClass('fps', this.metrics.fps);
        }
        
        if (lcpEl && this.metrics.lcp > 0) {
            lcpEl.textContent = (this.metrics.lcp / 1000).toFixed(2) + 's';
            lcpEl.className = 'perf-value ' + this.getScoreClass('lcp', this.metrics.lcp);
        }
        
        if (fidEl && this.metrics.fid > 0) {
            fidEl.textContent = this.metrics.fid.toFixed(0) + 'ms';
            fidEl.className = 'perf-value ' + this.getScoreClass('fid', this.metrics.fid);
        }
        
        if (clsEl && this.metrics.cls > 0) {
            clsEl.textContent = this.metrics.cls.toFixed(3);
            clsEl.className = 'perf-value ' + this.getScoreClass('cls', this.metrics.cls);
        }
        
        if (loadEl && this.metrics.loadTime > 0) {
            loadEl.textContent = (this.metrics.loadTime / 1000).toFixed(2) + 's';
            loadEl.className = 'perf-value ' + this.getScoreClass('load', this.metrics.loadTime);
        }
    }

    getScoreClass(metric, value) {
        const thresholds = {
            fps: { good: 55, poor: 30 },
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            load: { good: 3000, poor: 5000 }
        };

        const threshold = thresholds[metric];
        if (!threshold) return '';

        if (metric === 'fps') {
            if (value >= threshold.good) return 'good';
            if (value >= threshold.poor) return 'needs-improvement';
            return 'poor';
        } else {
            if (value <= threshold.good) return 'good';
            if (value <= threshold.poor) return 'needs-improvement';
            return 'poor';
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}