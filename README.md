# 🍳 RemixCuisine DAO

> AI-powered Web3 community cooking platform with neon cyberpunk aesthetic

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

## ✨ Features

- 🤖 **AI Recipe Generator** - Generate unique recipes with Claude AI
- 🎨 **NFT Marketplace** - Buy and sell recipe NFTs
- 💰 **$REMIX Token System** - Earn tokens for creating and sharing
- 👤 **User Profiles** - Track stats, badges, and achievements
- 🏆 **Weekly Challenges** - Compete and earn rewards
- 🌐 **Web3 Integration** - Wallet connection and blockchain support
- 🎮 **Futuristic Neon UI** - Cyberpunk vintage aesthetic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/remixcuisine-dao.git
cd remixcuisine-dao

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🎨 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom neon theme
- **Icons**: Lucide React
- **AI**: Claude API (Anthropic)
- **Storage**: Window.storage API for persistence
- **Web3**: (Ready for integration)

## 🔧 Configuration

### Claude API

To enable AI recipe generation, you need a Claude API key:

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. The app uses the API directly in the browser (no backend required)
3. API calls are made from the RecipeGenerator component

### Environment Variables (Optional)

Create a `.env` file:

```env
VITE_CLAUDE_API_KEY=your_api_key_here
VITE_APP_NAME=RemixCuisine DAO
```

## 📁 Project Structure

```
remixcuisine-dao/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles + Tailwind
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── README.md           # Documentation
```

## 🎯 Key Components

- **HomePage**: Landing page with stats, challenges, and trending recipes
- **RecipeGenerator**: AI-powered recipe creation with Claude
- **NFTMarketplace**: Browse and purchase recipe NFTs
- **MyRecipes**: Personal recipe collection
- **ProfilePage**: User stats and badges
- **TokensPage**: $REMIX token management and rewards

## 💾 Data Persistence

The app uses `window.storage` API for data persistence:

- User profiles
- Generated recipes
- NFT ownership
- Token balances

Data is stored locally and persists across sessions.

## 🎨 Design System

### Colors

- **Neon Cyan**: `#00FFFF` - Primary
- **Neon Magenta**: `#FF00FF` - Secondary
- **Neon Green**: `#00FF00` - Success
- **Neon Pink**: `#FF1493` - Accents
- **Neon Yellow**: `#FFFF00` - Warnings

### Typography

- **Font Family**: Monospace (system-ui monospace)
- **Headers**: UPPERCASE with gradient animations
- **Body**: Cyan/Magenta tones

### Effects

- Neon glow shadows
- Animated gradients
- Grid backgrounds
- Hover scale effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Development Status & Roadmap

### 🚧 AI Recipe Generation (In Progress)

The AI-powered recipe generation feature uses Anthropic's Claude API, which requires an API key and funding to operate. The interface is fully functional and ready - we're currently raising funds to activate the AI backend!

**Current Status:**
- ✅ Cyberpunk interface complete
- ✅ Form and UX ready
- ✅ NFT marketplace designed
- ⏳ Claude API integration pending funding

**Estimated API Cost:** ~$20/month for moderate usage

### 💝 Help Us Activate AI Features!

**Every sponsor helps us reach our funding goals:**
- 🎯 **Goal:** 4 sponsors at $5/month = API activated!
- 💪 **Current:** Building our first supporter base
- 🚀 **Timeline:** API goes live once funded

[**Become a Sponsor**](https://github.com/sponsors/wkalidev) and help bring AI recipe generation to life! 

Your support directly funds:
- 💰 Claude API costs
- 🛠️ New features and improvements  
- 📚 Documentation and tutorials
- 🐛 Maintenance and bug fixes

**Building in public. Join the journey!** 🍳✨

---

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- [x] Core interface
- [x] GitHub Sponsors setup
- [x] Deployment to Vercel
- [ ] Claude API activation (pending funding)

### Phase 2: Features (Next)
- [ ] Real AI recipe generation
- [ ] Recipe NFT minting
- [ ] User authentication
- [ ] Recipe database

### Phase 3: Community (Future)
- [ ] Token system ($REMIX)
- [ ] Cooking challenges
- [ ] Community voting
- [ ] Mobile app

**Want to influence the roadmap?** Sponsors get priority feature requests! 💙

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**zcodebase(wkalidev)**

- Website: https://remixcuisine-dao.vercel.app/
- Twitter: https://x.com/RemixCuisineDAO
- Discord: https://discord.gg/EPR9WThd
  
## 🙏 Acknowledgments

- [Claude AI](https://anthropic.com) - AI recipe generation
- [Lucide Icons](https://lucide.dev) - Icon library
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [Vite](https://vitejs.dev) - Build tool

## 📞 Support

For support, email wkalidev@gmail.com or join our Discord server.

---

© 2026 RemixCuisine DAO. All rights reserved by zcodebase.
