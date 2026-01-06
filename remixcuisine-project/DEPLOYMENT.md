# 🚀 Deployment Guide - RemixCuisine DAO

Complete guide to deploy RemixCuisine to production.

## Option 1: Vercel (Recommended) ⚡

### Why Vercel?
- ✅ Free for personal projects
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ Auto-deploy from Git
- ✅ Perfect for React/Vite apps

### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd remixcuisine-project
vercel
```

4. **Follow prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **remixcuisine-dao**
- In which directory is your code located? **.**
- Want to override settings? **N**

5. **Your site is live!**
```
✅ Production: https://remixcuisine-dao.vercel.app
```

### Add Custom Domain (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard → Settings → Domains
3. Add your domain
4. Update DNS records at your registrar
5. Wait 24-48h for propagation

---

## Option 2: Netlify 🌐

### Steps:

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Build the project**
```bash
npm run build
```

4. **Deploy**
```bash
netlify deploy --prod
```

5. **Configure:**
- Publish directory: **dist**
- Your site is live at: `https://random-name.netlify.app`

### Netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Option 3: GitHub Pages 📄

### Steps:

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "homepage": "https://yourusername.github.io/remixcuisine-dao",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  base: '/remixcuisine-dao/',
  // ... rest of config
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Enable GitHub Pages**
- Go to repository Settings → Pages
- Source: Deploy from branch
- Branch: gh-pages / root
- Save

---

## Environment Variables Setup 🔐

### For Vercel:

```bash
# Add environment variables
vercel env add VITE_CLAUDE_API_KEY
```

Or in Vercel Dashboard:
- Settings → Environment Variables
- Add each variable from `.env.example`

### For Netlify:

```bash
# Set environment variables
netlify env:set VITE_CLAUDE_API_KEY "your_key_here"
```

Or in Netlify Dashboard:
- Site settings → Environment variables
- Add variables

---

## Custom Domain Setup 🌍

### 1. Purchase Domain

**Recommended registrars:**
- Namecheap (~$10/year)
- GoDaddy (~$12/year)
- Google Domains (~$12/year)
- Porkbun (~$8/year)

**Suggested domains:**
- remixcuisine.io
- remixcuisine.xyz
- remixcuisine.gg
- remixcuisine.app

### 2. Configure DNS

**For Vercel:**

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Netlify:**

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### 3. Add Domain in Platform

**Vercel:**
- Dashboard → Domains → Add Domain
- Enter your domain
- Follow verification steps

**Netlify:**
- Site settings → Domain management → Add custom domain
- Enter your domain
- Verify ownership

---

## SSL/HTTPS Certificate 🔒

Both Vercel and Netlify provide **automatic SSL certificates** via Let's Encrypt.

- ✅ Free
- ✅ Auto-renewal
- ✅ No configuration needed

Certificate is issued within minutes of adding your domain.

---

## Performance Optimization 🚀

### 1. Code Splitting

Already configured in Vite! It automatically splits code for optimal loading.

### 2. Image Optimization

For future images, use:
```bash
npm install vite-plugin-imagemin --save-dev
```

### 3. Compression

Vercel/Netlify automatically compress assets (gzip/brotli).

### 4. Caching

Configure in `vercel.json` or `netlify.toml`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Monitoring & Analytics 📊

### Google Analytics

1. Create GA4 property
2. Add tracking ID to `.env`:
```
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

3. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

Enable in Vercel dashboard:
- Analytics tab → Enable
- Free: 100k pageviews/month

---

## Continuous Deployment 🔄

### Auto-deploy from GitHub

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/remixcuisine-dao.git
git push -u origin main
```

2. **Connect to Vercel/Netlify**
- Import project from GitHub
- Auto-deploy on every push
- Preview deployments for PRs

### Deployment Workflow

```
main branch → Production
develop branch → Staging
feature/* → Preview
```

---

## Troubleshooting 🔧

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Build failed"**
```bash
# Check build locally first
npm run build
npm run preview
```

### Environment Variables Not Working

- Ensure they start with `VITE_`
- Restart dev server after changes
- Re-deploy after adding in platform

### 404 on Refresh

Add redirect rules (see Netlify.toml example above).

---

## Checklist Before Going Live ✅

- [ ] Test all features locally
- [ ] Build production version
- [ ] Check responsive design
- [ ] Test on different browsers
- [ ] Verify Claude API integration
- [ ] Set up environment variables
- [ ] Configure custom domain (optional)
- [ ] Set up analytics
- [ ] Test wallet connection
- [ ] Create social media accounts
- [ ] Update copyright and branding

---

## Post-Deployment 🎉

### Share Your Launch

- Twitter/X announcement
- Product Hunt launch
- Reddit (r/web3, r/cryptocurrency)
- Discord servers
- Hacker News

### Monitor

- Check analytics daily
- Monitor error logs
- Track user feedback
- Iterate quickly

---

## Cost Breakdown 💰

**Free Tier:**
- Vercel hosting: Free
- Netlify hosting: Free
- GitHub: Free
- SSL certificate: Free
- **Total: $0/month**

**With Custom Domain:**
- Domain: $10/year ($0.83/month)
- Everything else: Free
- **Total: ~$1/month**

**With Premium:**
- Domain: $10/year
- Vercel Pro: $20/month (optional)
- Claude API: Pay per use (~$10-50/month)
- **Total: $30-70/month**

---

## Next Steps 🎯

1. Deploy to Vercel
2. Add custom domain
3. Set up analytics
4. Deploy smart contracts (see blockchain guide)
5. Marketing & growth
6. Iterate based on feedback

---

Need help? Open an issue on GitHub or contact support@remixcuisine.io

© 2026 RemixCuisine DAO. All rights reserved by zcodebase.
