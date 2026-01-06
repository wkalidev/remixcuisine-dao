# ⚡ QUICKSTART - RemixCuisine DAO

Get up and running in 5 minutes!

## 📋 Prerequisites

Make sure you have:
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ Git installed ([Download](https://git-scm.com/))
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Line access

## 🚀 Installation (Local)

### Step 1: Open Terminal

**Windows:** Press `Win + R`, type `cmd`, press Enter  
**Mac:** Press `Cmd + Space`, type `terminal`, press Enter  
**Linux:** Press `Ctrl + Alt + T`

### Step 2: Navigate to Project

```bash
# If you have the files on your computer
cd path/to/remixcuisine-project

# Example:
# cd C:\Users\YourName\Desktop\remixcuisine-project    (Windows)
# cd ~/Desktop/remixcuisine-project                    (Mac/Linux)
```

### Step 3: Install Dependencies

```bash
npm install
```

⏱️ This will take 1-2 minutes. Wait for it to finish.

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

🎉 **Done!** Your app is now running locally!

---

## 🌐 Deploy to Internet (Vercel - FREE)

### Step 1: Create Vercel Account

Go to [vercel.com](https://vercel.com) and sign up (it's free!)

### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 3: Login

```bash
vercel login
```

Follow the instructions to verify your email.

### Step 4: Deploy

```bash
# Make sure you're in the project folder
cd remixcuisine-project

# Deploy
vercel
```

### Step 5: Answer Prompts

```
? Set up and deploy? Yes
? Which scope? [Select your account]
? Link to existing project? No
? What's your project's name? remixcuisine-dao
? In which directory is your code located? ./
? Want to override the settings? No
```

### Step 6: Done! 🎉

Your site is now live! Vercel will give you a URL like:
```
https://remixcuisine-dao-xxx.vercel.app
```

Share this URL with anyone in the world!

---

## 🔧 Common Issues & Fixes

### "npm: command not found"

**Fix:** Install Node.js from [nodejs.org](https://nodejs.org/)

### "Module not found" errors

**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

**Fix:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

Or change port in `vite.config.js`:
```javascript
server: {
  port: 3001  // Change to any available port
}
```

### Build fails

**Fix:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📝 Quick Commands Reference

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `vercel` | Deploy to internet |
| `vercel --prod` | Deploy to production |

---

## 🎨 Make It Yours

### Change the Name

1. Open `package.json`
2. Change `"name": "your-project-name"`
3. Change `"description": "Your description"`

### Update Copyright

1. Open `src/App.jsx`
2. Search for "zcodebase"
3. Replace with your name/company

### Add Your Logo

1. Add logo file to `public/` folder
2. Update `index.html` to reference your logo

---

## 🆘 Need Help?

- **Documentation:** Check README.md and DEPLOYMENT.md
- **Discord:** Join our community (coming soon)
- **Email:** support@remixcuisine.io
- **Issues:** GitHub Issues page

---

## ✅ Next Steps

Once your site is running:

1. ✅ Test all features
2. ✅ Create your custom recipes
3. ✅ Share with friends
4. ✅ Set up custom domain (optional)
5. ✅ Deploy smart contracts (see blockchain guide)
6. ✅ Start earning! 💰

---

**Pro Tip:** Keep the terminal window open while developing. It shows helpful error messages!

© 2026 RemixCuisine DAO. All rights reserved by zcodebase.
