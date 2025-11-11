// ===================================
// Interactive Skills Visualization
// ===================================

class SkillsVisualization {
    constructor() {
        this.init();
    }

    init() {
        this.createSkillsSection();
        this.initSkillBars();
        this.initSkillChart();
    }

    createSkillsSection() {
        // Check if skills section already exists
        if (document.querySelector('.skills-visualization')) return;

        const skillsData = {
            technical: [
                { name: 'JavaScript/ES6+', level: 95, category: 'Frontend' },
                { name: 'React & Next.js', level: 90, category: 'Frontend' },
                { name: 'HTML5 & CSS3', level: 95, category: 'Frontend' },
                { name: 'Node.js', level: 85, category: 'Backend' },
                { name: 'Python', level: 80, category: 'Backend' },
                { name: 'SQL & Databases', level: 75, category: 'Backend' },
                { name: 'Git & Version Control', level: 90, category: 'Tools' },
                { name: 'Responsive Design', level: 95, category: 'Design' }
            ],
            categories: {
                'Frontend': 93,
                'Backend': 80,
                'Design': 88,
                'Tools': 85,
                'Performance': 90,
                'SEO': 85
            }
        };

        // Find a good place to insert skills section
        const aboutSection = document.querySelector('.about-section, .section');
        if (!aboutSection) return;

        const skillsHTML = `
            <div class="skills-visualization section bg-light">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Technical Skills</h2>
                        <p class="section-subtitle">Proficiency across modern web technologies</p>
                    </div>
                    
                    <div class="skills-content">
                        <div class="skills-bars">
                            ${skillsData.technical.map(skill => `
                                <div class="skill-item" data-aos="fade-up">
                                    <div class="skill-header">
                                        <span class="skill-name">${skill.name}</span>
                                        <span class="skill-percentage">${skill.level}%</span>
                                    </div>
                                    <div class="skill-bar">
                                        <div class="skill-bar-fill" data-percentage="${skill.level}" style="width: 0%"></div>
                                    </div>
                                    <span class="skill-category">${skill.category}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="skills-chart-container">
                            <canvas id="skills-radar-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;

        aboutSection.insertAdjacentHTML('afterend', skillsHTML);
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentage = entry.target.dataset.percentage;
                    
                    // Animate the skill bar
                    setTimeout(() => {
                        entry.target.style.width = percentage + '%';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    initSkillChart() {
        const canvas = document.getElementById('skills-radar-chart');
        if (!canvas) return;

        // Load Chart.js if not already loaded
        if (typeof Chart === 'undefined') {
            this.loadChartJS().then(() => this.createChart(canvas));
        } else {
            this.createChart(canvas);
        }
    }

    loadChartJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    createChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Get theme colors
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-primary-500').trim() || '#c87941';
        const accentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-accent-500').trim() || '#2c5f6f';

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Design', 'Tools', 'Performance', 'SEO'],
                datasets: [{
                    label: 'Proficiency',
                    data: [93, 80, 88, 85, 90, 85],
                    backgroundColor: `${primaryColor}33`,
                    borderColor: primaryColor,
                    borderWidth: 2,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: primaryColor,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: isDark ? '#94a3b8' : '#64748b',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: isDark ? '#2d323c' : '#e2e8f0'
                        },
                        pointLabels: {
                            color: isDark ? '#f8fafc' : '#2d3748',
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? '#23272f' : '#ffffff',
                        titleColor: isDark ? '#f8fafc' : '#2d3748',
                        bodyColor: isDark ? '#94a3b8' : '#64748b',
                        borderColor: primaryColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.r + '% Proficiency';
                            }
                        }
                    }
                }
            }
        });

        // Update chart on theme change
        window.addEventListener('themechange', () => {
            const newIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
            chart.options.scales.r.ticks.color = newIsDark ? '#94a3b8' : '#64748b';
            chart.options.scales.r.grid.color = newIsDark ? '#2d323c' : '#e2e8f0';
            chart.options.scales.r.pointLabels.color = newIsDark ? '#f8fafc' : '#2d3748';
            chart.options.plugins.tooltip.backgroundColor = newIsDark ? '#23272f' : '#ffffff';
            chart.options.plugins.tooltip.titleColor = newIsDark ? '#f8fafc' : '#2d3748';
            chart.options.plugins.tooltip.bodyColor = newIsDark ? '#94a3b8' : '#64748b';
            chart.update();
        });
    }
}

// Initialize skills visualization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SkillsVisualization();
    });
} else {
    new SkillsVisualization();
}