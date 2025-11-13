# Visual Design Mockup Specifications
## HLPFL Consulting Group Portfolio Website

---

## COLOR SYSTEM

### Primary Palette (Recommended)

```css
/* Deep Navy - Sophistication & Trust */
--color-dark-900: #0A0E27;
--color-dark-800: #1E293B;
--color-dark-700: #334155;
--color-dark-600: #475569;

/* Indigo - Innovation & Modernity */
--color-primary-500: #6366F1;
--color-primary-600: #4F46E5;
--color-primary-700: #4338CA;

/* Emerald - Success & Growth */
--color-accent-500: #10B981;
--color-accent-600: #059669;

/* Neutrals */
--color-white: #FFFFFF;
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
```

### Color Usage Guidelines

**Primary Dark (#0A0E27):**
- Hero section backgrounds
- Footer backgrounds
- Text headings
- Navigation bar (when scrolled)

**Primary Indigo (#6366F1):**
- Primary CTA buttons
- Links and interactive elements
- Accent highlights
- Icons and decorative elements

**Accent Emerald (#10B981):**
- Secondary CTA buttons
- Success states
- Highlights and badges
- Trust indicators

**Neutrals:**
- White: Main backgrounds, card backgrounds
- Gray-50: Alternate section backgrounds
- Gray-100: Subtle borders and dividers

---

## TYPOGRAPHY SYSTEM

### Font Stack

```css
/* Headings & Display */
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Type Scale

```css
/* Desktop */
--text-7xl: 4.5rem;    /* 72px - Hero headlines */
--text-6xl: 4rem;      /* 64px - Major headlines */
--text-5xl: 3rem;      /* 48px - Section headers */
--text-4xl: 2.25rem;   /* 36px - Subsection headers */
--text-3xl: 1.875rem;  /* 30px - Card titles */
--text-2xl: 1.5rem;    /* 24px - Small headers */
--text-xl: 1.25rem;    /* 20px - Large body */
--text-lg: 1.125rem;   /* 18px - Body text */
--text-base: 1rem;     /* 16px - Base text */
--text-sm: 0.875rem;   /* 14px - Small text */
--text-xs: 0.75rem;    /* 12px - Tiny text */

/* Mobile (scale down 25-30%) */
--text-7xl-mobile: 2.5rem;   /* 40px */
--text-6xl-mobile: 2.25rem;  /* 36px */
--text-5xl-mobile: 2rem;     /* 32px */
--text-4xl-mobile: 1.5rem;   /* 24px */
--text-3xl-mobile: 1.25rem;  /* 20px */
```

### Typography Examples

**Hero Headline:**
```
Font: Space Grotesk
Size: 72px (desktop) / 40px (mobile)
Weight: 700 (Bold)
Line Height: 1.1
Letter Spacing: -0.02em
Color: White or Dark-900
```

**Section Headers:**
```
Font: Inter
Size: 48px (desktop) / 32px (mobile)
Weight: 700 (Bold)
Line Height: 1.2
Color: Dark-900
```

**Body Text:**
```
Font: Inter
Size: 18px (desktop) / 16px (mobile)
Weight: 400 (Regular)
Line Height: 1.7
Color: Dark-700
```

---

## SPACING SYSTEM

### Base Unit: 4px

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Section Spacing

```css
/* Vertical section padding */
--section-padding-mobile: 4rem;    /* 64px */
--section-padding-tablet: 6rem;    /* 96px */
--section-padding-desktop: 8rem;   /* 128px */

/* Container max-width */
--container-max-width: 1280px;

/* Container padding */
--container-padding-mobile: 1rem;   /* 16px */
--container-padding-tablet: 2rem;   /* 32px */
--container-padding-desktop: 3rem;  /* 48px */
```

---

## COMPONENT SPECIFICATIONS

### Buttons

**Primary Button:**
```css
Background: #6366F1 (Primary-500)
Text: White
Padding: 16px 32px
Border Radius: 8px
Font Size: 18px
Font Weight: 600
Transition: all 0.3s ease

Hover State:
  Background: #4F46E5 (Primary-600)
  Transform: translateY(-2px)
  Box Shadow: 0 10px 20px rgba(99, 102, 241, 0.3)

Active State:
  Transform: translateY(0)
  Box Shadow: 0 5px 10px rgba(99, 102, 241, 0.2)
```

**Secondary Button:**
```css
Background: Transparent
Border: 2px solid #6366F1
Text: #6366F1
Padding: 14px 30px (account for border)
Border Radius: 8px
Font Size: 18px
Font Weight: 600
Transition: all 0.3s ease

Hover State:
  Background: #6366F1
  Text: White
  Transform: translateY(-2px)
```

**Accent Button:**
```css
Background: #10B981 (Accent-500)
Text: White
Padding: 16px 32px
Border Radius: 8px
Font Size: 18px
Font Weight: 600

Hover State:
  Background: #059669 (Accent-600)
  Transform: translateY(-2px)
  Box Shadow: 0 10px 20px rgba(16, 185, 129, 0.3)
```

### Cards

**Portfolio Card:**
```css
Background: White
Border Radius: 12px
Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
Padding: 0 (image full-width)
Overflow: hidden
Transition: all 0.3s ease

Hover State:
  Transform: translateY(-8px)
  Box Shadow: 0 20px 40px rgba(0, 0, 0, 0.15)

Structure:
  - Image (full-width, aspect-ratio 16:9)
  - Content padding: 24px
  - Title: 24px, Bold
  - Description: 16px, Regular
  - Tags: 14px, with colored backgrounds
  - CTA: Link or button
```

**Service Card:**
```css
Background: White
Border: 2px solid #E5E7EB
Border Radius: 16px
Padding: 32px
Transition: all 0.3s ease

Hover State:
  Border Color: #6366F1
  Box Shadow: 0 10px 30px rgba(99, 102, 241, 0.1)
  Transform: translateY(-4px)

Structure:
  - Icon (48px, colored)
  - Title: 24px, Bold
  - Price: 36px, Bold, Gradient
  - Features list: 16px
  - CTA button
```

### Navigation

**Desktop Navigation:**
```css
Height: 80px
Background: White (with backdrop blur)
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Position: Fixed, top
Z-index: 50

Logo:
  Font Size: 24px
  Font Weight: 700
  Gradient text

Links:
  Font Size: 16px
  Font Weight: 500
  Color: #475569
  Hover Color: #6366F1
  Spacing: 32px between links

CTA Button:
  Primary button style
  Slightly smaller: 14px 24px padding
```

**Mobile Navigation:**
```css
Hamburger Menu:
  Size: 24px
  Color: #0A0E27
  
Mobile Menu:
  Background: White
  Full width
  Slide down animation
  Padding: 16px
  
Links:
  Display: block
  Padding: 12px 0
  Border bottom: 1px solid #E5E7EB
```

---

## LAYOUT SPECIFICATIONS

### Hero Section

**Desktop Layout:**
```
Height: 100vh (minimum)
Background: Gradient from #0A0E27 to #6366F1
Particle background overlay (20% opacity)

Content Container:
  Max-width: 1024px
  Centered
  Padding: 0 48px

Headline:
  72px, Bold
  White color
  Max-width: 900px
  Margin bottom: 24px

Subheadline:
  24px, Regular
  Gray-300 color
  Max-width: 800px
  Margin bottom: 48px

CTA Buttons:
  Flex row, gap 16px
  Centered

Trust Indicators:
  Grid 3 columns
  Gap: 32px
  Margin top: 64px
  Icon + Text layout
```

**Mobile Layout:**
```
Height: auto (min-height: 100vh)
Padding: 80px 16px 64px

Headline: 40px
Subheadline: 18px
Buttons: Stack vertically, gap 12px
Trust Indicators: Stack vertically
```

### Statistics Section

**Desktop Layout:**
```
Background: White
Padding: 64px 0

Container:
  Max-width: 1280px
  Grid 4 columns
  Gap: 48px

Each Stat:
  Text align: center
  Number: 60px, Bold, Gradient
  Label: 16px, Gray-600
```

**Mobile Layout:**
```
Grid 2 columns
Gap: 32px
Number: 48px
```

### Portfolio Grid

**Desktop Layout:**
```
Grid 3 columns
Gap: 32px
Each card: aspect-ratio 4:3

Filter Buttons:
  Flex row, gap 16px
  Margin bottom: 48px
  Center aligned
```

**Tablet Layout:**
```
Grid 2 columns
Gap: 24px
```

**Mobile Layout:**
```
Grid 1 column
Gap: 24px
```

---

## ANIMATION SPECIFICATIONS

### Page Load Animations

**Hero Section:**
```javascript
Timeline:
  0ms: Headline fades in from bottom (30px)
  200ms: Subheadline fades in from bottom (30px)
  400ms: CTA buttons fade in and scale (0.9 to 1)
  600ms: Trust indicators fade in

Duration: 600ms each
Easing: ease-out
```

**Scroll Animations:**
```javascript
Trigger: Element enters viewport (85% from top)
Animation: Fade in + Slide up (30px)
Duration: 600ms
Easing: ease-out
Stagger: 100ms between elements
```

### Hover Animations

**Cards:**
```css
Transform: translateY(-8px)
Box Shadow: Increase
Duration: 300ms
Easing: ease-out
```

**Buttons:**
```css
Transform: translateY(-2px)
Box Shadow: Add glow
Duration: 300ms
Easing: ease-out
```

**Images:**
```css
Transform: scale(1.05)
Duration: 400ms
Easing: ease-out
```

### Scroll Effects

**Parallax Background:**
```javascript
Scroll Speed: 0.5x (slower than content)
Applied to: Hero background, section backgrounds
Subtle effect, not distracting
```

**Navbar Scroll:**
```javascript
Trigger: Scroll > 80px
Changes:
  - Add shadow
  - Reduce height slightly (80px to 72px)
  - Increase background opacity
Duration: 300ms
```

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */

/* Small Mobile */
@media (min-width: 320px) {
  /* Base styles */
}

/* Mobile */
@media (min-width: 640px) {
  /* Slightly larger mobile */
}

/* Tablet */
@media (min-width: 768px) {
  /* 2-column layouts start */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 3-column layouts, full navigation */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Max container width reached */
}

/* Extra Large */
@media (min-width: 1536px) {
  /* Larger spacing, typography */
}
```

---

## ACCESSIBILITY SPECIFICATIONS

### Color Contrast

**Text on White Background:**
- Dark-900 (#0A0E27): 15.8:1 ✓ AAA
- Dark-700 (#334155): 9.2:1 ✓ AAA
- Primary-500 (#6366F1): 4.8:1 ✓ AA

**Text on Dark Background:**
- White on Dark-900: 15.8:1 ✓ AAA
- Gray-300 on Dark-900: 10.5:1 ✓ AAA

### Focus States

```css
All Interactive Elements:
  outline: 2px solid #6366F1
  outline-offset: 2px
  border-radius: 4px
```

### Touch Targets

```css
Minimum Size: 44px × 44px
Spacing: 8px minimum between targets
```

---

## IMAGE SPECIFICATIONS

### Hero Images

```
Format: WebP with JPEG fallback
Dimensions: 1920×1080px (16:9)
File Size: < 200KB
Optimization: 85% quality
```

### Portfolio Screenshots

```
Format: WebP with PNG fallback
Dimensions: 1200×900px (4:3)
File Size: < 150KB
Optimization: 85% quality
Alt Text: Required, descriptive
```

### Icons

```
Format: SVG (preferred) or PNG
Size: 48×48px, 64×64px, 96×96px
Color: Inherit from parent or specified
```

### Mockups

```
Format: PNG with transparency
Dimensions: Variable, maintain aspect ratio
File Size: < 300KB
Use: Device mockups (laptop, mobile, tablet)
```

---

## PERFORMANCE TARGETS

### Core Web Vitals

```
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
```

### Lighthouse Scores

```
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

### Page Weight

```
Total Page Size: < 2MB
JavaScript: < 300KB
CSS: < 100KB
Images: < 1.5MB (with lazy loading)
```

---

## DESIGN SYSTEM SUMMARY

This design system provides:
- ✓ Consistent color palette
- ✓ Scalable typography system
- ✓ Flexible spacing system
- ✓ Reusable component specifications
- ✓ Responsive layout guidelines
- ✓ Animation specifications
- ✓ Accessibility standards
- ✓ Performance targets

Use this as a reference when building the website to ensure consistency and quality across all pages and components.