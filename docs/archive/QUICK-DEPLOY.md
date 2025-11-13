# 🚀 Quick Deploy Guide

## Enable GitHub Pages (Required First!)

**Before the automatic deployment works, you need to enable GitHub Pages:**

### Step 1: Enable GitHub Pages

1. Go to: https://github.com/HLPFLCG/websiteportfolio/settings/pages
2. Under **"Build and deployment"**:
   - **Source:** Select **"GitHub Actions"**
3. That's it! No need to click save.

### Step 2: Trigger Deployment

Once GitHub Pages is enabled, the deployment will happen automatically:

1. Go to: https://github.com/HLPFLCG/websiteportfolio/actions
2. You'll see the workflow running
3. Wait 1-2 minutes for completion

### Step 3: Access Your Site

Your site will be live at:

**🌐 https://hlpflcg.github.io/websiteportfolio/**

---

## Alternative: Deploy to Netlify (5 Minutes)

If you prefer Netlify (easier, faster):

### Option A: Drag & Drop (Easiest)

1. Go to https://app.netlify.com/drop
2. Drag the entire `websiteportfolio` folder
3. Done! Your site is live instantly

### Option B: Connect GitHub (Recommended)

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select **HLPFLCG/websiteportfolio**
5. Click **"Deploy site"**
6. Done! Auto-deploys on every push

**Your site will be at:** `https://[random-name].netlify.app`

---

## Alternative: Deploy to Vercel (5 Minutes)

1. Go to https://vercel.com/new
2. Import **HLPFLCG/websiteportfolio** from GitHub
3. Click **"Deploy"**
4. Done!

**Your site will be at:** `https://[project-name].vercel.app`

---

## Custom Domain Setup

### For GitHub Pages

1. In repository settings → Pages
2. Add custom domain: `www.hlpflconsultinggroup.com`
3. Add DNS CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: hlpflcg.github.io
   ```

### For Netlify/Vercel

1. Go to domain settings
2. Add custom domain
3. Follow their DNS instructions

---

## That's It!

Your portfolio website with all 8 advanced features is now deployed! 🎉

**Live Preview (Local):** https://8090-3725136e-f365-4c47-996f-b1f92a300288.proxy.daytona.works

**GitHub Repository:** https://github.com/HLPFLCG/websiteportfolio

---

## Need Help?

See the full **DEPLOYMENT-INSTRUCTIONS.md** for:
- Detailed troubleshooting
- Performance optimization
- SEO setup
- Analytics integration
- Security best practices

---

**Questions?** Open an issue on GitHub or check the comprehensive documentation files.