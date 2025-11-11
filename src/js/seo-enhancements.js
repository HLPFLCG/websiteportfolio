/* ===================================
   SEO ENHANCEMENTS
   Structured Data & Meta Tags
   =================================== */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSEO);
    } else {
        initSEO();
    }

    function initSEO() {
        addStructuredData();
        optimizeMetaTags();
        addBreadcrumbs();
        implementCanonicalURL();
        addSocialMetaTags();
    }

    /* ===================================
       1. STRUCTURED DATA (Schema.org)
       =================================== */
    function addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "HLPFL",
            "description": "Professional web development and digital solutions. Custom services tailored to your needs.",
            "url": "https://hlpfl.dev",
            "logo": "https://hlpfl.dev/favicons/logo-header.png",
            "image": "https://hlpfl.dev/favicons/favicon-512.png",
            "telephone": "+1-XXX-XXX-XXXX",
            "email": "hello@hlpfl.dev",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
            },
            "sameAs": [
                "https://linkedin.com/company/hlpfl",
                "https://twitter.com/hlpfl"
            ],
            "priceRange": "$$$",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "50"
            },
            "offers": [
                {
                    "@type": "Offer",
                    "name": "Custom Web Design",
                    "price": "5000",
                    "priceCurrency": "USD",
                    "description": "Fully custom website design with up to 10 pages"
                },
                {
                    "@type": "Offer",
                    "name": "Logo Design",
                    "price": "1500",
                    "priceCurrency": "USD",
                    "description": "Professional logo design with multiple iterations"
                },
                {
                    "@type": "Offer",
                    "name": "Branding Kit",
                    "price": "500",
                    "priceCurrency": "USD",
                    "description": "Complete brand guidelines and style guide"
                }
            ]
        };

        // Add Organization schema
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HLPFL",
            "url": "https://hlpfl.dev",
            "logo": "https://hlpfl.dev/favicons/logo-header.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "Customer Service",
                "email": "hello@hlpfl.dev",
                "availableLanguage": "English"
            },
            "sameAs": [
                "https://linkedin.com/company/hlpfl",
                "https://twitter.com/hlpfl"
            ]
        };

        // Add WebSite schema
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HLPFL",
            "url": "https://hlpfl.dev",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://hlpfl.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        // Insert structured data
        insertStructuredData(structuredData, 'business-schema');
        insertStructuredData(organizationSchema, 'organization-schema');
        insertStructuredData(websiteSchema, 'website-schema');

        // Add portfolio item schemas if on portfolio page
        if (window.location.pathname.includes('portfolio')) {
            addPortfolioSchemas();
        }
    }

    function insertStructuredData(data, id) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    function addPortfolioSchemas() {
        const portfolioItems = document.querySelectorAll('.portfolio-card');
        
        portfolioItems.forEach((item, index) => {
            const title = item.querySelector('.portfolio-title')?.textContent;
            const description = item.querySelector('.portfolio-description')?.textContent;
            const image = item.querySelector('img')?.src;
            const link = item.querySelector('a')?.href;

            if (title) {
                const schema = {
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": title,
                    "description": description,
                    "image": image,
                    "url": link,
                    "creator": {
                        "@type": "Organization",
                        "name": "HLPFL"
                    }
                };

                insertStructuredData(schema, `portfolio-item-${index}`);
            }
        });
    }

    /* ===================================
       2. OPTIMIZE META TAGS
       =================================== */
    function optimizeMetaTags() {
        // Ensure viewport meta tag
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
            document.head.appendChild(viewport);
        }

        // Add theme color
        if (!document.querySelector('meta[name="theme-color"]')) {
            const themeColor = document.createElement('meta');
            themeColor.name = 'theme-color';
            themeColor.content = '#1a1d23';
            document.head.appendChild(themeColor);
        }

        // Add robots meta
        if (!document.querySelector('meta[name="robots"]')) {
            const robots = document.createElement('meta');
            robots.name = 'robots';
            robots.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
            document.head.appendChild(robots);
        }

        // Add author
        if (!document.querySelector('meta[name="author"]')) {
            const author = document.createElement('meta');
            author.name = 'author';
            author.content = 'HLPFL';
            document.head.appendChild(author);
        }

        // Add keywords (if not present)
        if (!document.querySelector('meta[name="keywords"]')) {
            const keywords = document.createElement('meta');
            keywords.name = 'keywords';
            keywords.content = 'web design, web development, custom websites, logo design, branding, digital solutions, HLPFL';
            document.head.appendChild(keywords);
        }
    }

    /* ===================================
       3. BREADCRUMBS
       =================================== */
    function addBreadcrumbs() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        
        if (segments.length === 0) return;

        const breadcrumbList = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hlpfl.dev/"
                }
            ]
        };

        let currentPath = 'https://hlpfl.dev';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const name = segment.replace('.html', '').replace(/-/g, ' ');
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            
            breadcrumbList.itemListElement.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": capitalizedName,
                "item": currentPath
            });
        });

        insertStructuredData(breadcrumbList, 'breadcrumb-schema');

        // Create visual breadcrumbs
        createVisualBreadcrumbs(breadcrumbList.itemListElement);
    }

    function createVisualBreadcrumbs(items) {
        const breadcrumbContainer = document.querySelector('.breadcrumbs');
        if (!breadcrumbContainer) return;

        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'Breadcrumb');
        nav.className = 'breadcrumb-nav';

        const ol = document.createElement('ol');
        ol.className = 'breadcrumb-list';

        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';

            if (index === items.length - 1) {
                li.setAttribute('aria-current', 'page');
                li.textContent = item.name;
            } else {
                const a = document.createElement('a');
                a.href = item.item;
                a.textContent = item.name;
                li.appendChild(a);
            }

            ol.appendChild(li);
        });

        nav.appendChild(ol);
        breadcrumbContainer.appendChild(nav);
    }

    /* ===================================
       4. CANONICAL URL
       =================================== */
    function implementCanonicalURL() {
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href.split('?')[0].split('#')[0];
            document.head.appendChild(canonical);
        }
    }

    /* ===================================
       5. SOCIAL META TAGS
       =================================== */
    function addSocialMetaTags() {
        const pageTitle = document.title || 'HLPFL - Professional Web Development';
        const pageDescription = document.querySelector('meta[name="description"]')?.content || 
            'Professional web development and digital solutions. Custom services tailored to your needs.';
        const pageImage = 'https://hlpfl.dev/favicons/favicon-512.png';
        const pageUrl = window.location.href;

        // Open Graph tags
        const ogTags = {
            'og:type': 'website',
            'og:site_name': 'HLPFL',
            'og:title': pageTitle,
            'og:description': pageDescription,
            'og:image': pageImage,
            'og:url': pageUrl,
            'og:locale': 'en_US'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            if (!document.querySelector(`meta[property="${property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('property', property);
                meta.content = content;
                document.head.appendChild(meta);
            }
        });

        // Twitter Card tags
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': '@hlpfl',
            'twitter:title': pageTitle,
            'twitter:description': pageDescription,
            'twitter:image': pageImage
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            if (!document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = name;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }

    /* ===================================
       6. SITEMAP GENERATOR (Client-side)
       =================================== */
    function generateSitemap() {
        const pages = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/portfolio.html', priority: '0.9', changefreq: 'weekly' },
            { url: '/services.html', priority: '0.9', changefreq: 'monthly' },
            { url: '/pricing.html', priority: '0.8', changefreq: 'monthly' },
            { url: '/contact.html', priority: '0.8', changefreq: 'monthly' },
            { url: '/about.html', priority: '0.7', changefreq: 'monthly' }
        ];

        const sitemap = {
            pages: pages,
            lastGenerated: new Date().toISOString()
        };

        console.log('Sitemap data:', sitemap);
        return sitemap;
    }

    /* ===================================
       7. EXPORT FUNCTIONS
       =================================== */
    window.seoUtils = {
        generateSitemap,
        addStructuredData,
        optimizeMetaTags
    };

})();