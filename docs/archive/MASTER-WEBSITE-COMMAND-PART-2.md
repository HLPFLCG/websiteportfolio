# ULTIMATE MASTER WEBSITE COMMAND TEMPLATE - PART 2
## Phases 3-8: Core Website Structure

---

<a name="phase-3"></a>
## PHASE 3: HOME PAGE STRUCTURE (ULTRA-DETAILED)

### 3.1 NAVIGATION BAR (HEADER)

**Desktop Navigation (≥992px):**

```html
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-wrapper">
      <!-- Logo -->
      <a href="/" class="logo-container">
        <img src="/favicons/hlpflpfpaffinity.png" alt="HLPFL Logo" class="logo-img">
        <span class="logo-text">HLPFL</span>
      </a>
      
      <!-- Main Navigation -->
      <div class="nav-menu" id="nav-menu">
        <a href="/" class="nav-link active">Home</a>
        <a href="/portfolio" class="nav-link">Portfolio</a>
        <a href="/services" class="nav-link">Services</a>
        <a href="/pricing" class="nav-link">Pricing</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/contact" class="btn btn-primary">Get Started</a>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>
```

**Navigation Specifications:**

*Layout:*
- Position: Fixed top
- Z-index: 1000
- Height: 80px (desktop), 70px (mobile)
- Background: rgba(26, 29, 35, 0.95) with backdrop-filter blur
- Border-bottom: 1px solid rgba(226, 232, 240, 0.1)

*Logo:*
- Image: 45px height (desktop), 35px (mobile)
- Text: 'DM Sans', 1.25rem, weight 700
- Color: White
- Hover: translateY(-2px) with 0.3s transition
- Link: Home page

*Navigation Links:*
- Font: 'Inter', 1rem, weight 500
- Color: rgba(255, 255, 255, 0.9)
- Hover: #c87941 (copper)
- Active: #c87941 with underline
- Spacing: 2rem gap between links
- Transition: 0.3s ease

*CTA Button:*
- Style: Primary button (see Phase 2)
- Text: "Get Started"
- Link: /contact
- Hover: Lift effect

*Sticky Behavior:*
- Trigger: After 80px scroll
- Animation: Slide down, 0.3s
- Shadow: Increase on scroll
- Background: Slightly more opaque

**Mobile Navigation (<992px):**

*Hamburger Menu:*
- Position: Top right
- Size: 30px x 24px
- Lines: 3 horizontal bars (3px height, white)
- Animation: Transform to X when active
- Transition: 0.3s ease

*Mobile Menu Overlay:*
- Position: Fixed, full screen
- Top: 70px (below navbar)
- Background: rgba(26, 29, 35, 0.98)
- Animation: Slide from right, 0.3s
- Backdrop: Blur effect

*Mobile Menu Items:*
- Layout: Vertical stack
- Font-size: 1.125rem
- Padding: 1rem 0
- Border-bottom: 1px solid rgba(255, 255, 255, 0.1)
- Tap target: Minimum 44px height

*Close Behavior:*
- Click hamburger again
- Click any menu link
- Click outside menu
- Press Escape key
- Window resize to desktop

### 3.2 HERO SECTION

**Hero Structure:**

```html
<section class="hero">
  <!-- Animated Background -->
  <div class="hero-background" id="particles-js"></div>
  
  <!-- Hero Content -->
  <div class="container">
    <div class="hero-content">
      <!-- Badge -->
      <div class="hero-badge" data-aos="fade-down">
        Premium Web Development
      </div>
      
      <!-- Main Headline -->
      <h1 class="hero-title" data-aos="fade-up" data-aos-delay="100">
        Exceptional <span class="typed-text" id="typed-text"></span>
      </h1>
      
      <!-- Subtitle -->
      <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
        Professional web development and digital solutions built with excellence
      </p>
      
      <!-- CTA Buttons -->
      <div class="hero-cta" data-aos="fade-up" data-aos-delay="300">
        <a href="/contact" class="btn btn-primary btn-lg">
          Get Started
          <i class="fas fa-arrow-right"></i>
        </a>
        <a href="/portfolio" class="btn btn-secondary btn-lg">
          View Our Work
        </a>
      </div>
      
      <!-- Trust Signals -->
      <div class="hero-stats" data-aos="fade-up" data-aos-delay="400">
        <div class="stat">
          <span class="stat-number">500+</span>
          <span class="stat-label">Websites Built</span>
        </div>
        <div class="stat">
          <span class="stat-number">72hrs</span>
          <span class="stat-label">Delivery Time</span>
        </div>
        <div class="stat">
          <span class="stat-number">$50M+</span>
          <span class="stat-label">Revenue Generated</span>
        </div>
        <div class="stat">
          <span class="stat-number">98%</span>
          <span class="stat-label">Client Satisfaction</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="scroll-indicator" data-aos="fade-up" data-aos-delay="500">
    <span>Scroll to explore</span>
    <i class="fas fa-chevron-down"></i>
  </div>
</section>
```

**Hero Specifications:**

*Layout:*
- Height: 100vh (desktop), 70vh (mobile)
- Display: Flex, center aligned
- Padding: 120px 0 (desktop), 80px 0 (mobile)
- Position: Relative
- Overflow: Hidden

*Background:*
- Type: Animated gradient + Particles.js
- Gradient: Linear from #1a1d23 to #2d323c
- Animation: 20-second color cycle
- Particles: Copper (#c87941) and teal (#2c5f6f)
- Overlay: Dark overlay for text readability

*Badge:*
- Background: rgba(200, 121, 65, 0.1)
- Border: 1px solid rgba(200, 121, 65, 0.3)
- Color: #e09560
- Padding: 8px 16px
- Border-radius: 20px
- Font-size: 14px
- Font-weight: 600
- Text-transform: uppercase
- Letter-spacing: 0.05em

*Headline (H1):*
- Font: 'DM Sans', 700
- Size: 56px (desktop), 36px (mobile)
- Color: #ffffff
- Line-height: 1.1
- Max-width: 800px
- Margin: 0 auto
- Text-align: Center

*Typed Text:*
- Library: Typed.js
- Strings: ['Web Development', 'Days, Not Months', 'Record Time']
- Type Speed: 80ms
- Back Speed: 50ms
- Back Delay: 2000ms
- Loop: true
- Cursor: '|'
- Color: #c87941 (copper)

*Subtitle:*
- Font: 'Inter', 400
- Size: 20px (desktop), 16px (mobile)
- Color: rgba(255, 255, 255, 0.8)
- Line-height: 1.6
- Max-width: 600px
- Margin: 24px auto 0

*CTA Buttons:*
- Layout: Flex, center, gap 16px
- Margin-top: 40px
- Mobile: Stack vertically, full width

*Stats:*
- Layout: Grid, 4 columns (desktop), 2 columns (mobile)
- Gap: 32px
- Margin-top: 60px
- Padding-top: 60px
- Border-top: 1px solid rgba(255, 255, 255, 0.1)

*Stat Number:*
- Font: 'DM Sans', 700
- Size: 36px (desktop), 28px (mobile)
- Color: #c87941
- Animation: Count-up on scroll

*Stat Label:*
- Font: 'Inter', 400
- Size: 14px
- Color: rgba(255, 255, 255, 0.7)
- Text-transform: uppercase
- Letter-spacing: 0.05em

*Scroll Indicator:*
- Position: Absolute, bottom 40px
- Display: Flex, column, center
- Color: rgba(255, 255, 255, 0.6)
- Font-size: 14px
- Animation: Bounce, 2s infinite
- Cursor: pointer
- Click: Smooth scroll to next section

**Particles.js Configuration:**

```javascript
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#c87941', '#2c5f6f']
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#c87941',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});
```

**Parallax Effect (Desktop Only):**

```javascript
// Mouse parallax on hero
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth >= 992) {
    const hero = document.querySelector('.hero');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});
```

### 3.3 TRUSTED BY SECTION

**Section Structure:**

```html
<section class="trusted-by">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header" data-aos="fade-up">
      <h2 class="section-title">Trusted by Innovative Companies</h2>
      <p class="section-subtitle">
        We've partnered with leading brands across industries
      </p>
    </div>
    
    <!-- Client Logos Grid -->
    <div class="client-logos" data-aos="fade-up" data-aos-delay="100">
      <div class="client-logo">
        <img src="/images/clients/hlpfl-org.png" alt="HLPFL.org">
      </div>
      <div class="client-logo">
        <img src="/images/clients/zaitsev.png" alt="Zaitsev.co">
      </div>
      <div class="client-logo">
        <img src="/images/clients/hcjk.png" alt="HCJK.org">
      </div>
      <div class="client-logo">
        <img src="/images/clients/smoke-shack.png" alt="The Smoke Shack">
      </div>
      <div class="client-logo">
        <img src="/images/clients/takeout.png" alt="Takeout">
      </div>
      <div class="client-logo">
        <img src="/images/clients/rvnu.png" alt="RVNU">
      </div>
      <div class="client-logo">
        <img src="/images/clients/grippy-sox.png" alt="Grippy Sox Club">
      </div>
      <div class="client-logo">
        <img src="/images/clients/hlpfl-fitness.png" alt="HLPFL Fitness">
      </div>
    </div>
  </div>
</section>
```

**Section Specifications:**

*Layout:*
- Padding: 100px 0 (desktop), 60px 0 (mobile)
- Background: #f7fafc (light gray)
- Text-align: Center

*Section Header:*
- Max-width: 800px
- Margin: 0 auto 60px

*Section Title:*
- Font: 'DM Sans', 700
- Size: 42px (desktop), 28px (mobile)
- Color: #1a1d23
- Margin-bottom: 16px

*Section Subtitle:*
- Font: 'Inter', 400
- Size: 18px (desktop), 16px (mobile)
- Color: #4a5568
- Line-height: 1.6

*Client Logos Grid:*
- Display: Grid
- Columns: 4 (desktop), 2 (mobile)
- Gap: 48px (desktop), 32px (mobile)
- Align-items: Center
- Justify-items: Center

*Client Logo:*
- Width: 140px (desktop), 100px (mobile)
- Height: Auto
- Filter: grayscale(100%)
- Opacity: 0.6
- Transition: all 0.3s ease
- Hover: grayscale(0%), opacity 1

*Alternative: Carousel (if 20+ clients):*
```javascript
// Auto-scrolling carousel
const carousel = new Swiper('.client-carousel', {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    768: {
      slidesPerView: 4
    },
    992: {
      slidesPerView: 6
    }
  }
});
```

### 3.4 SERVICES OVERVIEW SECTION

**Section Structure:**

```html
<section class="services-overview">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header" data-aos="fade-up">
      <span class="section-badge">What We Do</span>
      <h2 class="section-title">Complete Digital Solutions</h2>
      <p class="section-subtitle">
        From concept to launch, we handle every aspect of your digital presence
      </p>
    </div>
    
    <!-- Services Grid -->
    <div class="services-grid">
      <!-- Service Card 1 -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="100">
        <div class="service-icon">
          <i class="fas fa-code"></i>
        </div>
        <h3 class="service-title">Web Design & Development</h3>
        <p class="service-description">
          Custom websites built for speed, performance, and conversions. From landing pages to complex web applications, we deliver pixel-perfect designs that work.
        </p>
        <ul class="service-features">
          <li><i class="fas fa-check"></i> Responsive Design</li>
          <li><i class="fas fa-check"></i> Custom Development</li>
          <li><i class="fas fa-check"></i> Performance Optimized</li>
          <li><i class="fas fa-check"></i> SEO Ready</li>
        </ul>
        <a href="/services/web-development" class="service-link">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      
      <!-- Service Card 2 -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="200">
        <div class="service-icon">
          <i class="fas fa-palette"></i>
        </div>
        <h3 class="service-title">Logo & Brand Identity</h3>
        <p class="service-description">
          Professional logo design and complete brand identity systems. We create memorable brands that stand out and connect with your audience.
        </p>
        <ul class="service-features">
          <li><i class="fas fa-check"></i> Custom Logo Design</li>
          <li><i class="fas fa-check"></i> Brand Guidelines</li>
          <li><i class="fas fa-check"></i> Color Palettes</li>
          <li><i class="fas fa-check"></i> Typography Systems</li>
        </ul>
        <a href="/services/logo-design" class="service-link">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      
      <!-- Service Card 3 -->
      <div class="service-card" data-aos="fade-up" data-aos-delay="300">
        <div class="service-icon">
          <i class="fas fa-bullseye"></i>
        </div>
        <h3 class="service-title">Branding & Strategy</h3>
        <p class="service-description">
          Strategic branding that positions your business for success. From naming to messaging, we build brands that resonate.
        </p>
        <ul class="service-features">
          <li><i class="fas fa-check"></i> Brand Strategy</li>
          <li><i class="fas fa-check"></i> Messaging Framework</li>
          <li><i class="fas fa-check"></i> Visual Identity</li>
          <li><i class="fas fa-check"></i> Brand Guidelines</li>
        </ul>
        <a href="/services/branding" class="service-link">
          Learn More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Section Specifications:**

*Layout:*
- Padding: 100px 0 (desktop), 60px 0 (mobile)
- Background: #ffffff (white)

*Section Badge:*
- Background: rgba(200, 121, 65, 0.1)
- Color: #c87941
- Padding: 6px 12px
- Border-radius: 16px
- Font-size: 14px
- Font-weight: 600
- Text-transform: uppercase
- Letter-spacing: 0.05em
- Display: inline-block
- Margin-bottom: 16px

*Services Grid:*
- Display: Grid
- Columns: 3 (desktop), 1 (mobile)
- Gap: 32px
- Margin-top: 60px

*Service Card:*
- Background: #ffffff
- Border: 1px solid #e2e8f0
- Border-radius: 12px
- Padding: 32px
- Transition: all 0.3s ease
- Hover: 
  - Transform: translateY(-8px)
  - Box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1)
  - Border-color: #c87941

*Service Icon:*
- Width: 64px
- Height: 64px
- Background: linear-gradient(135deg, #c87941 0%, #e09560 100%)
- Border-radius: 12px
- Display: flex
- Align-items: center
- Justify-content: center
- Color: #ffffff
- Font-size: 28px
- Margin-bottom: 24px
- Transition: transform 0.3s ease
- Card Hover: transform scale(1.1)

*Service Title:*
- Font: 'DM Sans', 700
- Size: 24px
- Color: #1a1d23
- Margin-bottom: 16px

*Service Description:*
- Font: 'Inter', 400
- Size: 16px
- Color: #4a5568
- Line-height: 1.6
- Margin-bottom: 24px

*Service Features:*
- List-style: None
- Padding: 0
- Margin: 0 0 24px

*Service Feature Item:*
- Display: flex
- Align-items: center
- Gap: 12px
- Padding: 8px 0
- Font: 'Inter', 400
- Size: 15px
- Color: #2d3748

*Feature Icon:*
- Color: #10B981 (green)
- Font-size: 14px

*Service Link:*
- Display: inline-flex
- Align-items: center
- Gap: 8px
- Color: #c87941
- Font-weight: 600
- Text-decoration: none
- Transition: gap 0.3s ease
- Hover: gap 12px

### 3.5 PROCESS SECTION

**Section Structure:**

```html
<section class="process">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header" data-aos="fade-up">
      <span class="section-badge">How We Work</span>
      <h2 class="section-title">Our Proven Process</h2>
      <p class="section-subtitle">
        A streamlined approach that delivers results in 72 hours
      </p>
    </div>
    
    <!-- Process Timeline -->
    <div class="process-timeline">
      <!-- Step 1 -->
      <div class="process-step" data-aos="fade-right" data-aos-delay="100">
        <div class="step-number">01</div>
        <div class="step-content">
          <div class="step-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="step-title">Discovery</h3>
          <p class="step-description">
            We start with a deep dive into your goals, audience, and requirements. Quick kickoff call to align on vision and gather all necessary assets.
          </p>
          <div class="step-duration">Day 1</div>
        </div>
      </div>
      
      <!-- Connector Line -->
      <div class="process-connector" data-aos="fade-in" data-aos-delay="200"></div>
      
      <!-- Step 2 -->
      <div class="process-step" data-aos="fade-left" data-aos-delay="300">
        <div class="step-number">02</div>
        <div class="step-content">
          <div class="step-icon">
            <i class="fas fa-pencil-ruler"></i>
          </div>
          <h3 class="step-title">Design & Development</h3>
          <p class="step-description">
            Our team builds your solution using modern technologies and best practices. You'll see progress updates and can provide feedback throughout.
          </p>
          <div class="step-duration">Days 1-3</div>
        </div>
      </div>
      
      <!-- Connector Line -->
      <div class="process-connector" data-aos="fade-in" data-aos-delay="400"></div>
      
      <!-- Step 3 -->
      <div class="process-step" data-aos="fade-right" data-aos-delay="500">
        <div class="step-number">03</div>
        <div class="step-content">
          <div class="step-icon">
            <i class="fas fa-rocket"></i>
          </div>
          <h3 class="step-title">Launch & Support</h3>
          <p class="step-description">
            We deploy your site, ensure everything works perfectly, and provide ongoing support. You're live and ready to grow.
          </p>
          <div class="step-duration">Day 3+</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Section Specifications:**

*Layout:*
- Padding: 100px 0 (desktop), 60px 0 (mobile)
- Background: #f7fafc (light gray)

*Process Timeline:*
- Display: Flex
- Direction: Row (desktop), Column (mobile)
- Align-items: Center
- Gap: 0
- Margin-top: 60px
- Position: Relative

*Process Step:*
- Flex: 1
- Display: Flex
- Flex-direction: Column
- Align-items: Center
- Text-align: Center
- Position: Relative
- Z-index: 2

*Step Number:*
- Width: 80px
- Height: 80px
- Background: linear-gradient(135deg, #c87941 0%, #e09560 100%)
- Border-radius: 50%
- Display: flex
- Align-items: center
- Justify-content: center
- Font: 'DM Sans', 700
- Size: 32px
- Color: #ffffff
- Margin-bottom: 24px
- Box-shadow: 0 4px 12px rgba(200, 121, 65, 0.3)

*Step Content:*
- Max-width: 300px

*Step Icon:*
- Width: 48px
- Height: 48px
- Background: rgba(200, 121, 65, 0.1)
- Border-radius: 8px
- Display: flex
- Align-items: center
- Justify-content: center
- Color: #c87941
- Font-size: 20px
- Margin: 0 auto 16px

*Step Title:*
- Font: 'DM Sans', 700
- Size: 24px
- Color: #1a1d23
- Margin-bottom: 12px

*Step Description:*
- Font: 'Inter', 400
- Size: 16px
- Color: #4a5568
- Line-height: 1.6
- Margin-bottom: 16px

*Step Duration:*
- Display: inline-block
- Background: rgba(200, 121, 65, 0.1)
- Color: #c87941
- Padding: 6px 12px
- Border-radius: 16px
- Font-size: 14px
- Font-weight: 600

*Process Connector:*
- Width: 100% (desktop), 2px (mobile)
- Height: 2px (desktop), 60px (mobile)
- Background: linear-gradient(90deg, #c87941 0%, #e09560 100%)
- Position: Relative
- Z-index: 1
- Desktop: Top 40px
- Mobile: Left 40px

*Mobile Adjustments:*
- Timeline: Vertical layout
- Steps: Full width
- Connectors: Vertical lines
- Numbers: Smaller (60px)

### 3.6 FEATURED WORK SECTION

**Section Structure:**

```html
<section class="featured-work">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header" data-aos="fade-up">
      <span class="section-badge">Our Work</span>
      <h2 class="section-title">Real Projects, Real Results</h2>
      <p class="section-subtitle">
        See how we've helped companies like yours achieve their goals
      </p>
    </div>
    
    <!-- Projects Grid -->
    <div class="projects-grid">
      <!-- Project Card 1 -->
      <div class="project-card" data-aos="fade-up" data-aos-delay="100">
        <div class="project-image">
          <img src="/images/portfolio/hlpfl-org.jpg" alt="HLPFL.org Website">
          <div class="project-overlay">
            <a href="/portfolio/hlpfl-org" class="project-view">
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="project-content">
          <div class="project-meta">
            <span class="project-category">Music Business</span>
            <img src="/images/clients/hlpfl-org-logo.png" alt="HLPFL" class="project-logo">
          </div>
          <h3 class="project-title">HLPFL Music Business Platform</h3>
          <p class="project-description">
            Complete website redesign for music business services company, featuring modern design and comprehensive service showcase.
          </p>
          <div class="project-tech">
            <span class="tech-badge">HTML</span>
            <span class="tech-badge">CSS</span>
            <span class="tech-badge">JavaScript</span>
            <span class="tech-badge">Responsive</span>
          </div>
          <div class="project-results">
            <div class="result">
              <span class="result-value">+150%</span>
              <span class="result-label">User Engagement</span>
            </div>
            <div class="result">
              <span class="result-value">72hrs</span>
              <span class="result-label">Delivery</span>
            </div>
            <div class="result">
              <span class="result-value">5/5</span>
              <span class="result-label">Client Rating</span>
            </div>
          </div>
          <a href="/portfolio/hlpfl-org" class="project-link">
            View Full Case Study <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      
      <!-- Project Card 2 -->
      <div class="project-card" data-aos="fade-up" data-aos-delay="200">
        <!-- Similar structure -->
      </div>
      
      <!-- Project Card 3 -->
      <div class="project-card" data-aos="fade-up" data-aos-delay="300">
        <!-- Similar structure -->
      </div>
    </div>
    
    <!-- View All CTA -->
    <div class="section-cta" data-aos="fade-up" data-aos-delay="400">
      <a href="/portfolio" class="btn btn-primary btn-lg">
        View All Projects
      </a>
    </div>
  </div>
</section>
```

**Section Specifications:**

*Layout:*
- Padding: 100px 0 (desktop), 60px 0 (mobile)
- Background: #ffffff (white)

*Projects Grid:*
- Display: Grid
- Columns: 3 (desktop), 1 (mobile)
- Gap: 32px
- Margin-top: 60px

*Project Card:*
- Background: #ffffff
- Border-radius: 12px
- Overflow: hidden
- Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Transition: all 0.3s ease
- Hover:
  - Transform: translateY(-8px)
  - Box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15)

*Project Image:*
- Width: 100%
- Height: 240px
- Object-fit: Cover
- Position: Relative
- Overflow: Hidden

*Project Image Hover:*
- Transform: scale(1.05)
- Transition: 0.3s ease

*Project Overlay:*
- Position: Absolute
- Top: 0
- Left: 0
- Right: 0
- Bottom: 0
- Background: rgba(200, 121, 65, 0.9)
- Display: flex
- Align-items: center
- Justify-content: center
- Opacity: 0
- Transition: opacity 0.3s ease
- Card Hover: opacity 1

*Project View Button:*
- Width: 60px
- Height: 60px
- Background: #ffffff
- Border-radius: 50%
- Display: flex
- Align-items: center
- Justify-content: center
- Color: #c87941
- Font-size: 20px
- Transform: scale(0.8)
- Transition: transform 0.3s ease
- Overlay Hover: scale(1)

*Project Content:*
- Padding: 24px

*Project Meta:*
- Display: flex
- Justify-content: space-between
- Align-items: center
- Margin-bottom: 16px

*Project Category:*
- Background: rgba(200, 121, 65, 0.1)
- Color: #c87941
- Padding: 4px 12px
- Border-radius: 12px
- Font-size: 12px
- Font-weight: 600
- Text-transform: uppercase

*Project Logo:*
- Height: 24px
- Width: auto
- Filter: grayscale(100%)
- Opacity: 0.6

*Project Title:*
- Font: 'DM Sans', 700
- Size: 20px
- Color: #1a1d23
- Margin-bottom: 12px
- Line-height: 1.3

*Project Description:*
- Font: 'Inter', 400
- Size: 15px
- Color: #4a5568
- Line-height: 1.6
- Margin-bottom: 16px

*Project Tech:*
- Display: flex
- Flex-wrap: wrap
- Gap: 8px
- Margin-bottom: 20px

*Tech Badge:*
- Background: #f7fafc
- Color: #2d3748
- Padding: 4px 10px
- Border-radius: 12px
- Font-size: 12px
- Font-weight: 500

*Project Results:*
- Display: Grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 16px
- Padding: 20px 0
- Border-top: 1px solid #e2e8f0
- Border-bottom: 1px solid #e2e8f0
- Margin-bottom: 20px

*Result:*
- Text-align: Center

*Result Value:*
- Display: block
- Font: 'DM Sans', 700
- Size: 20px
- Color: #c87941
- Margin-bottom: 4px

*Result Label:*
- Display: block
- Font: 'Inter', 400
- Size: 12px
- Color: #718096
- Text-transform: uppercase
- Letter-spacing: 0.05em

*Project Link:*
- Display: inline-flex
- Align-items: center
- Gap: 8px
- Color: #c87941
- Font-weight: 600
- Text-decoration: none
- Transition: gap 0.3s ease
- Hover: gap 12px

*Section CTA:*
- Text-align: Center
- Margin-top: 60px

---

*[Continuing with remaining sections in next part due to length...]*

**STATUS:** Part 2 of Ultimate Master Website Command
**COMPLETED:** Phase 3 sections 3.1-3.6
**REMAINING:** Phase 3 sections 3.7-3.14, Phases 4-16
**CURRENT LENGTH:** ~25,000 words total

Would you like me to continue with the remaining sections?