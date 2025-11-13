# HLPFL Style Guide Implementation Plan

## Overview
This document outlines the implementation of the HLPFL Web Design Style Guide (Version 1.0) to the existing website.

## Key Style Guide Elements

### 1. Brand Identity
- **Mission**: Help independent musicians create legally solid, privacy-first music businesses
- **Brand Values**: Professional Excellence, Artist Empowerment, Privacy First, Transparency, Innovation
- **Design Philosophy**: Sleek, readable, distinctive yet timeless - inspired by recording studios and vinyl records

### 2. Color Palette

#### Background Colors
- Deep Charcoal: `#1a1d23` (--c-bg-primary)
- Charcoal Secondary: `#23272f` (--c-bg-secondary)
- Mid Charcoal: `#2d323c` (--c-bg-tertiary)
- Pure White: `#ffffff` (--c-bg-card)

#### Text Colors
- Deep Slate: `#2d3748` (--c-text)
- Muted Slate: `#64748b` (--c-text-muted)
- Light Slate: `#94a3b8` (--c-text-light)
- Off-White: `#f8fafc` (--c-text-on-dark)

#### Signature Copper/Bronze Accent
- Rich Copper: `#c87941` (--c-gold)
- Light Copper: `#e09560` (--c-gold-light)
- Deep Copper: `#a65f2f` (--c-gold-dark)
- Pale Copper: `#f4e4d7` (--c-gold-subtle)

#### Secondary Teal Accent
- Deep Teal: `#2c5f6f` (--c-accent)
- Light Teal: `#3d7a8c` (--c-accent-light)
- Darker Teal: `#1e4450` (--c-accent-dark)
- Pale Teal: `#e6f2f5` (--c-accent-subtle)

#### Border Colors
- Light Gray: `#e2e8f0` (--c-border)
- Very Light Gray: `#f1f5f9` (--c-border-light)
- Medium Gray: `#cbd5e1` (--c-border-dark)

#### Semantic Colors
- Success: `#059669` (--c-success)
- Warning: `#d97706` (--c-warning)
- Danger: `#dc2626` (--c-danger)
- Info: `#0284c7` (--c-info)

#### Gradients
- Gold Gradient: `linear-gradient(135deg, #c87941 0%, #e09560 100%)`
- Accent Gradient: `linear-gradient(135deg, #2c5f6f 0%, #3d7a8c 100%)`
- Hero Gradient: `linear-gradient(135deg, #1a1d23 0%, #23272f 100%)`

### 3. Typography

#### Font Stack
Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
Weights: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

#### Type Scale
- H1 Hero: 56px / 1.1 / 700 (with gradient text effect)
- H2 Section: 42px / 1.2 / 700
- H3 Subsection: 32px / 1.3 / 600
- H4 Card: 24px / 1.4 / 600
- Body Large: 20px / 1.6 / 400
- Body Regular: 16px / 1.6 / 400
- Body Small: 14px / 1.5 / 400

### 4. Spacing Scale
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px
- 4XL: 80px

### 5. Components

#### Buttons
- **Primary**: Copper gradient background, white text, shadow-md, 14px 28px padding
- **Secondary**: Transparent background, 2px copper border, copper text
- **Accent**: Teal gradient background, white text, shadow-md
- **Hover**: translateY(-2px), shadow-lg, glow effect
- **Border Radius**: 8px
- **Font Weight**: 600
- **Transition**: 300ms cubic-bezier

#### Form Elements
- **Input Height**: 48px
- **Padding**: 12px
- **Border**: 2px solid #e2e8f0
- **Border Radius**: 8px
- **Focus Border**: 2px solid #c87941
- **Focus Shadow**: 0 0 0 3px rgba(200, 121, 65, 0.1)

#### Cards
- **Background**: #ffffff
- **Border**: 1px solid #e2e8f0
- **Border Radius**: 12px
- **Padding**: 32px
- **Shadow Default**: --shadow-sm
- **Shadow Hover**: --shadow-xl
- **Hover Border**: 1px solid #c87941

#### Navigation
- **Height**: 80px
- **Background**: rgba(26, 29, 35, 0.95)
- **Position**: Fixed to top
- **Link Color**: #f8fafc
- **Link Hover**: #e09560 with glow
- **CTA Button**: Copper gradient

### 6. Shadows
- sm: 0 1px 2px rgba(0, 0, 0, 0.05)
- md: 0 4px 6px rgba(0, 0, 0, 0.1)
- lg: 0 10px 15px rgba(0, 0, 0, 0.1)
- xl: 0 20px 25px rgba(0, 0, 0, 0.15)
- 2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
- Gold Glow: 0 0 20px rgba(200, 121, 65, 0.4)
- Accent Glow: 0 0 20px rgba(44, 95, 111, 0.4)

### 7. Animations
- **Quick**: 150ms ease-out
- **Smooth**: 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Bounce**: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)

### 8. Responsive Breakpoints
- **Mobile**: 0-767px (1 column)
- **Tablet**: 768-1023px (2 columns)
- **Desktop**: 1024px+ (3-4 columns)

### 9. Accessibility
- WCAG 2.1 Level AA compliance
- Focus states: 3px solid copper outline with 2px offset
- Minimum font size: 16px for body text
- Line height: 1.6 for body text
- Respects prefers-reduced-motion

## Implementation Priority

### Phase 1: Core CSS Variables (High Priority)
1. Create new CSS file with all color variables
2. Create spacing scale variables
3. Create shadow variables
4. Create gradient variables

### Phase 2: Typography (High Priority)
1. Update font stack
2. Implement type scale
3. Apply proper weights and line heights

### Phase 3: Component Updates (Medium Priority)
1. Update button styles
2. Redesign form elements
3. Update card styles
4. Refresh navigation

### Phase 4: Layout & Spacing (Medium Priority)
1. Apply spacing scale throughout
2. Update container widths
3. Implement responsive grid

### Phase 5: Polish & Animations (Low Priority)
1. Add hover effects
2. Implement transitions
3. Add glow effects

## Files to Update
1. `src/css/styles.css` - Main stylesheet with variables
2. `src/css/navigation-fix.css` - Navigation updates
3. `src/css/premium-experience.css` - Component updates
4. All HTML files - Update classes and structure as needed

## Testing Checklist
- [ ] All colors match style guide
- [ ] Typography scales correctly
- [ ] Buttons have proper hover states
- [ ] Forms are accessible and styled correctly
- [ ] Cards have proper shadows and hover effects
- [ ] Navigation is responsive
- [ ] All pages are mobile-friendly
- [ ] Accessibility standards met
- [ ] Performance is optimized