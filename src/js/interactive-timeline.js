// ===================================
// Interactive Resume Timeline
// ===================================

class InteractiveTimeline {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.createTimeline();
        this.setupScrollAnimations();
        this.setupInteractions();
    }

    createTimeline() {
        // Check if timeline already exists
        if (document.querySelector('.interactive-timeline')) return;

        const timelineData = [
            {
                year: '2024',
                title: 'Senior Web Developer',
                company: 'HLPFL Consulting Group',
                description: 'Leading web development projects, implementing modern JavaScript frameworks, and optimizing performance for client websites.',
                skills: ['React', 'Next.js', 'Node.js', 'Performance Optimization'],
                icon: '💼'
            },
            {
                year: '2023',
                title: 'Full Stack Developer',
                company: 'Tech Solutions Inc.',
                description: 'Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL. Improved application performance by 40%.',
                skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
                icon: '🚀'
            },
            {
                year: '2022',
                title: 'Frontend Developer',
                company: 'Digital Agency',
                description: 'Created responsive, accessible websites for various clients. Specialized in modern CSS techniques and JavaScript animations.',
                skills: ['HTML/CSS', 'JavaScript', 'GSAP', 'Responsive Design'],
                icon: '🎨'
            },
            {
                year: '2021',
                title: 'Junior Developer',
                company: 'StartUp Co.',
                description: 'Started professional journey building web applications and learning modern development practices.',
                skills: ['JavaScript', 'HTML/CSS', 'Git', 'Agile'],
                icon: '🌱'
            }
        ];

        const timelineHTML = `
            <div class="interactive-timeline section bg-dark">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Experience Timeline</h2>
                        <p class="section-subtitle">My professional journey in web development</p>
                    </div>
                    
                    <div class="timeline-container">
                        <div class="timeline-line"></div>
                        ${timelineData.map((item, index) => `
                            <div class="timeline-item" data-index="${index}">
                                <div class="timeline-marker">
                                    <span class="timeline-icon">${item.icon}</span>
                                </div>
                                <div class="timeline-content">
                                    <div class="timeline-year">${item.year}</div>
                                    <h3 class="timeline-title">${item.title}</h3>
                                    <div class="timeline-company">${item.company}</div>
                                    <p class="timeline-description">${item.description}</p>
                                    <div class="timeline-skills">
                                        ${item.skills.map(skill => `
                                            <span class="timeline-skill">${skill}</span>
                                        `).join('')}
                                    </div>
                                    <div class="timeline-progress">
                                        <div class="timeline-progress-bar"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Find a good place to insert timeline
        const sections = document.querySelectorAll('.section');
        const targetSection = sections[sections.length - 2] || sections[sections.length - 1];
        
        if (targetSection) {
            targetSection.insertAdjacentHTML('afterend', timelineHTML);
        }

        this.items = document.querySelectorAll('.timeline-item');
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateProgress(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        this.items.forEach(item => observer.observe(item));

        // Animate timeline line
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            const lineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        timelineLine.style.height = '100%';
                    }
                });
            }, { threshold: 0.1 });
            
            lineObserver.observe(timelineLine);
        }
    }

    animateProgress(item) {
        const progressBar = item.querySelector('.timeline-progress-bar');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 300);
        }
    }

    setupInteractions() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                this.expandItem(item);
            });

            // Add hover effect
            item.addEventListener('mouseenter', () => {
                item.classList.add('hovered');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('hovered');
            });
        });
    }

    expandItem(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Collapse all items
        this.items.forEach(i => i.classList.remove('expanded'));
        
        // Expand clicked item if it wasn't already expanded
        if (!isExpanded) {
            item.classList.add('expanded');
            
            // Scroll item into view
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// Initialize timeline
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new InteractiveTimeline();
    });
} else {
    new InteractiveTimeline();
}