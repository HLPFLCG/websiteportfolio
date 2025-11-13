# 🌐 Update hlpfl.dev to Point to GitHub Pages

## Current Situation
- Your domain `hlpfl.dev` is currently pointing to an **old server**
- The new website with all Phase 2 enhancements is on **GitHub Pages**
- You need to update your DNS settings to point to the new site

---

## 🎯 Quick Fix: Update DNS Records

### Where to Update
Go to your domain registrar where you purchased `hlpfl.dev` (likely Namecheap, GoDaddy, Cloudflare, etc.)

### DNS Records to Add/Update

#### Option A: Using CNAME (Recommended for www)
```
Type: CNAME
Name: www
Value: hlpflcg.github.io
TTL: 3600 (or Auto)
```

#### Option B: Using A Records (For root domain)
```
Type: A
Name: @ (or leave blank for root)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank for root)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank for root)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank for root)
Value: 185.199.111.153
TTL: 3600
```

---

## 📋 Step-by-Step Instructions

### Step 1: Access Your Domain Registrar
1. Log in to where you bought `hlpfl.dev`
2. Find DNS settings or DNS management
3. Look for "Manage DNS" or "DNS Records"

### Step 2: Update DNS Records

#### For www.hlpfl.dev:
- **Delete** any existing CNAME or A records for `www`
- **Add** new CNAME record:
  - Type: `CNAME`
  - Host/Name: `www`
  - Value/Points to: `hlpflcg.github.io`
  - TTL: `3600` or `Auto`

#### For hlpfl.dev (root domain):
- **Delete** any existing A records for `@` or root
- **Add** four new A records (all with same host, different IPs):
  - Type: `A`
  - Host/Name: `@` (or leave blank)
  - Value: `185.199.108.153`
  - TTL: `3600`
  
  Repeat for:
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

### Step 3: Configure GitHub Pages
1. Go to: https://github.com/HLPFLCG/websiteportfolio/settings/pages
2. Under "Custom domain", enter: `hlpfl.dev`
3. Wait for DNS check to pass (may take a few minutes)
4. Check "Enforce HTTPS" once DNS is verified
5. Click "Save"

### Step 4: Wait for Propagation
- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **15-30 minutes** for most users
- You can check status at: https://www.whatsmydns.net/#A/hlpfl.dev

---

## 🔍 Verify It's Working

### Check DNS Propagation
Visit: https://www.whatsmydns.net/#A/hlpfl.dev

You should see the GitHub Pages IP addresses:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### Test Your Site
Once DNS propagates, visit:
- http://hlpfl.dev (should redirect to https)
- https://hlpfl.dev (should show new site)
- https://www.hlpfl.dev (should show new site)

---

## 🚨 Common Issues & Solutions

### Issue 1: "DNS check failed" on GitHub
**Solution:** Wait 15-30 minutes and try again. DNS takes time to propagate.

### Issue 2: Still seeing old site
**Solution:** 
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Try incognito/private browsing mode
3. Try a different browser or device
4. Wait for DNS propagation (up to 48 hours)

### Issue 3: Certificate error
**Solution:** 
1. Make sure "Enforce HTTPS" is checked in GitHub Pages settings
2. Wait a few minutes for certificate to be issued
3. Try accessing with https:// prefix

### Issue 4: 404 error
**Solution:**
1. Make sure CNAME file exists in repository (it does now!)
2. Verify custom domain is set in GitHub Pages settings
3. Check that DNS records are correct

---

## 🎯 Alternative: Keep Both URLs

If you want to keep both working:

### Current URLs (Working Now):
- **GitHub Pages:** https://hlpflcg.github.io/websiteportfolio/
- **SuperNinja:** https://sites.super.myninja.ai/56e6e811-51f9-4ee0-b47a-fc7e2f7dcd0c/fe5463c7/index.html

### After DNS Update:
- **Custom Domain:** https://hlpfl.dev (points to GitHub Pages)
- **GitHub Pages:** https://hlpflcg.github.io/websiteportfolio/ (still works)
- **SuperNinja:** https://sites.super.myninja.ai/... (still works as backup)

---

## 📞 Need Help?

### Where is hlpfl.dev registered?
Common registrars and their DNS management pages:

**Namecheap:**
1. Dashboard → Domain List → Manage
2. Advanced DNS tab
3. Add/Edit records

**GoDaddy:**
1. My Products → Domains
2. DNS → Manage Zones
3. Add/Edit records

**Cloudflare:**
1. Select domain
2. DNS tab
3. Add/Edit records

**Google Domains:**
1. My domains → Manage
2. DNS tab
3. Custom records

---

## ✅ Checklist

Before updating DNS:
- [ ] Know where hlpfl.dev is registered
- [ ] Have access to DNS management
- [ ] Understand changes may take time to propagate

After updating DNS:
- [ ] Added CNAME record for www
- [ ] Added 4 A records for root domain
- [ ] Configured custom domain in GitHub Pages
- [ ] Enabled HTTPS enforcement
- [ ] Waited for DNS propagation
- [ ] Tested site in multiple browsers
- [ ] Cleared browser cache

---

## 🎉 Once Complete

After DNS updates propagate, your domain `hlpfl.dev` will show:
- ✅ All Phase 2 enhancements
- ✅ E-commerce style services cards
- ✅ Portfolio with iframe previews
- ✅ Interactive timeline on About page
- ✅ Enhanced contact form
- ✅ Fixed footer with CTA button
- ✅ Loading screen with particles
- ✅ Cookie consent banner
- ✅ All animations and easter eggs

**Your new website will be live at hlpfl.dev!**

---

**Need immediate access?**  
Use these URLs while DNS propagates:
- https://hlpflcg.github.io/websiteportfolio/
- https://sites.super.myninja.ai/56e6e811-51f9-4ee0-b47a-fc7e2f7dcd0c/fe5463c7/index.html