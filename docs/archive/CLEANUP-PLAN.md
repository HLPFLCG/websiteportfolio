# Website Cleanup Plan

## Current Situation
- **23 CSS files** (167KB total)
- **28 JavaScript files** (215KB total)
- **Multiple backup HTML files**
- **Many redundant/overlapping files**

## Cleanup Strategy

### Phase 1: Remove Backup Files
- about_old.html
- index_backup.html
- portfolio_old.html
- services_old.html

### Phase 2: Consolidate CSS Files
**Keep (Essential):**
1. main.css - Core styles
2. navigation-fix.css - Navigation system
3. premium-experience.css - Premium features

**Merge into main.css:**
- font-overhaul.css
- footer-redesign.css
- animations.css

**Remove (Redundant/Conflicting):**
- advanced-features.css (not used effectively)
- critical-fixes.css (conflicts resolved)
- fixes.css (conflicts resolved)
- hero-fixes.css (conflicts resolved)
- visibility-fixes.css (conflicts resolved)
- overhaul-fixes.css (conflicts resolved)
- header-enhancements.css (merge into navigation-fix.css)
- hero-enhancements.css (merge into premium-experience.css)
- logo-styles.css (merge into navigation-fix.css)
- mobile-responsive.css (merge into main.css)
- mobile-enhancements.css (merge into main.css)
- about-page.css (merge into main.css)
- contact-redesign.css (merge into main.css)
- portfolio-redesign.css (merge into main.css)
- services-redesign.css (merge into main.css)
- services-simple.css (merge into main.css)
- pricing-redesign-clean.css (merge into main.css)

**Result: 3 CSS files instead of 23**

### Phase 3: Consolidate JavaScript Files
**Keep (Essential):**
1. main.js - Core functionality
2. navigation-fix.js - Navigation system
3. premium-features.js - Premium features

**Remove (Redundant/Not Used):**
- advanced-animations.js
- card-3d-effects.js
- critical-fixes.js
- header-enhancements.js
- hero-enhancements.js
- init-advanced-features.js
- interactive-timeline.js
- lazy-loader.js
- magnetic-buttons.js
- micro-interactions.js
- mobile-gestures.js
- mobile-optimizations.js
- page-transitions.js
- performance-monitor.js
- performance-optimizer.js
- portfolio-filter.js
- scroll-animations-enhanced.js
- skills-visualization.js
- theme-manager.js
- production-cleanup.js
- seo-enhancements.js

**Keep (Page-Specific):**
- contact.js (for contact page)
- contact-form-enhanced.js (for contact page)
- portfolio.js (for portfolio page)
- pricing.js (for pricing page)

**Result: 7 JS files instead of 28**

### Phase 4: Update HTML Files
Update all 6 HTML pages to reference only the consolidated files.

## Expected Results
- **CSS**: 23 files → 3 files (87% reduction)
- **JS**: 28 files → 7 files (75% reduction)
- **Total Size**: ~382KB → ~120KB (69% reduction)
- **Load Time**: Significantly faster
- **Maintainability**: Much easier