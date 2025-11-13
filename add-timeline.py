"""
Add interactive timeline to about page
"""

# Read the about.html file
with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Timeline CSS to add before </style>
timeline_css = """
        /* Interactive Timeline */
        .timeline-section {
            padding: 6rem 2rem;
            background: var(--dark);
            position: relative;
        }
        
        .timeline-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
        }
        
        /* Horizontal Timeline for Desktop */
        .timeline {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            padding: 4rem 0;
        }
        
        /* Timeline Line */
        .timeline::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, 
                var(--primary) 0%, 
                var(--primary-light) 50%, 
                var(--primary) 100%);
            transform: translateY(-50%);
            z-index: 1;
        }
        
        .timeline-item {
            flex: 1;
            position: relative;
            text-align: center;
            z-index: 2;
        }
        
        .timeline-dot {
            width: 30px;
            height: 30px;
            background: var(--primary);
            border: 4px solid var(--dark);
            border-radius: 50%;
            margin: 0 auto 2rem;
            position: relative;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 0 0 0 rgba(200, 121, 65, 0.4);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(200, 121, 65, 0.4);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(200, 121, 65, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(200, 121, 65, 0);
            }
        }
        
        .timeline-item:hover .timeline-dot {
            transform: scale(1.3);
            background: var(--primary-light);
            animation: none;
        }
        
        .timeline-year {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .timeline-content {
            background: var(--dark-light);
            padding: 2rem;
            border-radius: 15px;
            border: 2px solid rgba(200, 121, 65, 0.1);
            transition: all 0.4s ease;
            opacity: 0.7;
            transform: translateY(20px);
        }
        
        .timeline-item:hover .timeline-content {
            opacity: 1;
            transform: translateY(0);
            border-color: var(--primary);
            box-shadow: 0 10px 40px rgba(200, 121, 65, 0.2);
        }
        
        .timeline-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--text);
        }
        
        .timeline-description {
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.6;
        }
        
        /* Vertical Timeline for Mobile */
        @media (max-width: 968px) {
            .timeline {
                flex-direction: column;
                padding: 2rem 0;
            }
            
            .timeline::before {
                top: 0;
                bottom: 0;
                left: 15px;
                right: auto;
                width: 4px;
                height: 100%;
                background: linear-gradient(180deg, 
                    var(--primary) 0%, 
                    var(--primary-light) 50%, 
                    var(--primary) 100%);
            }
            
            .timeline-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 3rem;
                text-align: left;
            }
            
            .timeline-item:last-child {
                margin-bottom: 0;
            }
            
            .timeline-dot {
                margin: 0;
                flex-shrink: 0;
                margin-right: 2rem;
            }
            
            .timeline-content {
                flex: 1;
                transform: translateX(20px);
            }
            
            .timeline-item:hover .timeline-content {
                transform: translateX(0);
            }
        }
"""

# Find the closing </style> tag and insert timeline CSS
style_close_pos = content.rfind('</style>')
if style_close_pos != -1:
    content = content[:style_close_pos] + timeline_css + '\n    ' + content[style_close_pos:]

# Timeline HTML to insert after the story section
timeline_html = """
    <!-- Timeline Section -->
    <section class="timeline-section">
        <div class="timeline-container">
            <div class="section-header reveal">
                <h2>Our Journey</h2>
                <p>From humble beginnings to helping founders succeed</p>
            </div>
            
            <div class="timeline">
                <div class="timeline-item reveal">
                    <div class="timeline-dot"></div>
                    <div class="timeline-year">2018</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">The Beginning</h3>
                        <p class="timeline-description">
                            Started first entrepreneurial venture at 18 with nothing but a laptop and ambition. Learned the hard way that professional services were out of reach for bootstrapped founders.
                        </p>
                    </div>
                </div>
                
                <div class="timeline-item reveal">
                    <div class="timeline-dot"></div>
                    <div class="timeline-year">2019-2023</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">Learning &amp; Growing</h3>
                        <p class="timeline-description">
                            Launched 20+ ventures, experienced failures and successes. Taught myself web development out of necessity. Discovered what actually works for startups.
                        </p>
                    </div>
                </div>
                
                <div class="timeline-item reveal">
                    <div class="timeline-dot"></div>
                    <div class="timeline-year">2024</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">HLPFL Founded</h3>
                        <p class="timeline-description">
                            Established HLPFL to make professional web development accessible to first-time founders. Committed to affordable pricing and no outsourcing.
                        </p>
                    </div>
                </div>
                
                <div class="timeline-item reveal">
                    <div class="timeline-dot"></div>
                    <div class="timeline-year">Today</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">Helping Founders</h3>
                        <p class="timeline-description">
                            Serving first-time founders across the US from Grand Rapids, MI. Dozens of successful launches. Every project is a chance to help another founder succeed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

# Find the story section and insert timeline after it
import re
story_section_end = content.find('</section>', content.find('<!-- Our Story Section -->'))
if story_section_end != -1:
    # Insert after the closing </section> tag
    insert_pos = story_section_end + len('</section>')
    content = content[:insert_pos] + '\n\n' + timeline_html + content[insert_pos:]

# Save the updated content
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Added interactive timeline CSS")
print("✓ Added timeline HTML section")
print("\nTimeline features:")
print("- Horizontal layout on desktop")
print("- Vertical layout on mobile")
print("- Animated dots with pulse effect")
print("- Hover effects on timeline items")
print("- Smooth transitions and interactions")