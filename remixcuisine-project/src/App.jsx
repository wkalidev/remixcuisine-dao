import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChefHat, Wallet, TrendingUp, Users, Award, Star, Heart, Clock, DollarSign, Flame, Sparkles, Trophy, Share2, Download, Check, X, Coins, ShoppingCart, Filter, Search, Plus, Menu, Moon, Sun, Globe, Zap, Gift } from 'lucide-react';
import { sdk } from '@farcaster/miniapp-sdk';

// ==================== CONTEXT & HOOKS ====================

const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// ==================== MAIN APP ====================

export default function RemixCuisine() {
  const [currentPage, setCurrentPage] = useState('home');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userTokens, setUserTokens] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [showToast, setShowToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [farcasterReady, setFarcasterReady] = useState(false);
  const [farcasterUser, setFarcasterUser] = useState(null);

  // ==================== FARCASTER INITIALIZATION ====================
  useEffect(() => {
    const initFarcaster = async () => {
      try {
        console.log('🔍 Initializing Farcaster SDK...');
        
        // Get Farcaster context
        const context = await sdk.context;
        console.log('✅ Farcaster context:', context);
        
        // If user is logged in via Farcaster, use their info
        if (context?.user) {
          setFarcasterUser(context.user);
          setWalletConnected(true);
          setWalletAddress(context.user.custody || '0x' + Math.random().toString(16).substr(2, 40));
          console.log('✅ Farcaster user loaded:', context.user.username);
        }
        
        // Signal that the app is ready (CRITICAL!)
        await sdk.actions.ready();
        setFarcasterReady(true);
        console.log('✅ Farcaster SDK ready - splash screen removed');
      } catch (error) {
        console.error('❌ Farcaster initialization error:', error);
        // Always call ready() even on error to remove splash screen
        try {
          await sdk.actions.ready();
        } catch (e) {
          console.error('Failed to call ready():', e);
        }
        setFarcasterReady(true);
      }
    };

    initFarcaster();
  }, []);

  // Initialize data from storage (wait for Farcaster to be ready)
  useEffect(() => {
    if (farcasterReady) {
      initializeApp();
    }
  }, [farcasterReady]);

  const initializeApp = async () => {
    try {
      // Load user data
      const profileResult = await window.storage.get('remix_user_profile');
      if (profileResult) {
        const profile = JSON.parse(profileResult.value);
        setUserProfile(profile);
        setUserTokens(profile.tokens || 0);
      } else {
        // Create default profile (use Farcaster name if available)
        const defaultProfile = {
          name: farcasterUser?.displayName || 'Anonymous Chef',
          avatar: '👨‍🍳',
          tokens: 100,
          recipesCreated: 0,
          nftsOwned: 0,
          badges: ['Beginner'],
          joinDate: new Date().toISOString(),
          farcasterUsername: farcasterUser?.username || null,
          farcasterFid: farcasterUser?.fid || null
        };
        await window.storage.set('remix_user_profile', JSON.stringify(defaultProfile));
        setUserProfile(defaultProfile);
        setUserTokens(100);
      }

      // Load recipes
      const recipesResult = await window.storage.get('remix_user_recipes');
      if (recipesResult) {
        setRecipes(JSON.parse(recipesResult.value));
      }

      // Load NFTs
      const nftsResult = await window.storage.get('remix_marketplace_nfts', true);
      if (nftsResult) {
        setNfts(JSON.parse(nftsResult.value));
      } else {
        // Initialize marketplace with sample NFTs
        const sampleNFTs = generateSampleNFTs();
        await window.storage.set('remix_marketplace_nfts', JSON.stringify(sampleNFTs), true);
        setNfts(sampleNFTs);
      }

      // Load user's NFTs
      const myNFTsResult = await window.storage.get('remix_my_nfts');
      if (myNFTsResult) {
        setMyNFTs(JSON.parse(myNFTsResult.value));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  const connectWallet = async () => {
    try {
      // Try to get Farcaster context first
      const context = await sdk.context;
      if (context?.user) {
        setWalletAddress(context.user.custody || '0x' + Math.random().toString(16).substr(2, 40));
        setWalletConnected(true);
        toast('Wallet Connected via Farcaster! 🎉', 'success');
      } else {
        // Fallback to random address
        const address = '0x' + Math.random().toString(16).substr(2, 40);
        setWalletAddress(address);
        setWalletConnected(true);
        toast('Wallet Connected Successfully! 🎉', 'success');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      const address = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(address);
      setWalletConnected(true);
      toast('Wallet Connected Successfully! 🎉', 'success');
    }
  };

  const toast = (message, type = 'info') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const updateTokens = async (amount) => {
    const newAmount = userTokens + amount;
    setUserTokens(newAmount);
    if (userProfile) {
      const updated = { ...userProfile, tokens: newAmount };
      setUserProfile(updated);
      await window.storage.set('remix_user_profile', JSON.stringify(updated));
    }
  };

  const contextValue = {
    currentPage, setCurrentPage,
    walletConnected, connectWallet,
    walletAddress,
    userTokens, updateTokens,
    userProfile, setUserProfile,
    recipes, setRecipes,
    nfts, setNfts,
    myNFTs, setMyNFTs,
    toast,
    menuOpen, setMenuOpen,
    farcasterUser
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Neon Grid Background */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        
        {/* Animated Neon Glow */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-magenta-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10">
          <Header />
          <main className="pb-20">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'generator' && <RecipeGenerator />}
            {currentPage === 'marketplace' && <NFTMarketplace />}
            {currentPage === 'my-recipes' && <MyRecipes />}
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'tokens' && <TokensPage />}
          </main>
          <Footer />
        </div>
        {showToast && <Toast message={showToast.message} type={showToast.type} />}
      </div>
    </AppContext.Provider>
  );
}

// ==================== HEADER ====================

function Header() {
  const { currentPage, setCurrentPage, walletConnected, connectWallet, walletAddress, userTokens, menuOpen, setMenuOpen, farcasterUser } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: ChefHat },
    { id: 'generator', label: 'Generator', icon: Sparkles },
    { id: 'marketplace', label: 'NFT Market', icon: ShoppingCart },
    { id: 'my-recipes', label: 'My Recipes', icon: Heart },
    { id: 'tokens', label: 'Tokens', icon: Coins },
    { id: 'profile', label: 'Profile', icon: Users }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative bg-black border-2 border-cyan-500 p-2 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                <ChefHat className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
                RemixCuisine
              </h1>
              <p className="text-xs text-cyan-400/70 font-mono tracking-widest">DAO</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 font-mono text-sm ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.6)] font-bold'
                      : 'text-cyan-400 hover:text-magenta-400 hover:bg-cyan-500/10 border border-cyan-500/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Token Display */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-black border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              <Coins className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="font-bold text-cyan-400 font-mono">{userTokens.toLocaleString()}</span>
              <span className="text-sm text-magenta-400 font-mono">$REMIX</span>
            </div>

            {/* Wallet */}
            {walletConnected ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black border-2 border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.4)]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.8)]"></div>
                {farcasterUser ? (
                  <span className="text-sm font-mono hidden md:block text-green-400">@{farcasterUser.username}</span>
                ) : (
                  <span className="text-sm font-mono hidden md:block text-green-400">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black rounded-lg font-bold hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-all duration-300 font-mono"
              >
                <Wallet className="w-5 h-5" />
                <span className="hidden md:block">CONNECT</span>
              </button>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg border border-cyan-500/50 text-cyan-400"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all font-mono ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.6)]'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

// ==================== HOME PAGE ====================

function HomePage() {
  const { setCurrentPage, userProfile } = useApp();
  const [stats, setStats] = useState({ users: 1247, recipes: 3891, tokens: 125430 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        recipes: prev.recipes + Math.floor(Math.random() * 5),
        tokens: prev.tokens + Math.floor(Math.random() * 100)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const challenges = [
    { title: 'Max 5 Ingredients', reward: 50, time: '3d 12h', difficulty: 'Easy' },
    { title: 'Vegan Cooking', reward: 75, time: '5d 8h', difficulty: 'Medium' },
    { title: 'Master Chef', reward: 150, time: '1d 4h', difficulty: 'Expert' }
  ];

  const trendingRecipes = [
    { name: 'Wild Mushroom Risotto', creator: '@chef_mario', likes: 234, image: '🍄' },
    { name: 'Modern Tarte Tatin', creator: '@patissier_pro', likes: 189, image: '🍎' },
    { name: 'Tokyo-Paris Fusion Ramen', creator: '@fusion_master', likes: 312, image: '🍜' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mb-12 border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(0,255,255,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-black to-magenta-900/50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative px-8 py-16 md:py-24 text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full text-sm font-mono text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.3)] animate-pulse">
            ⚡ POWERED BY CLAUDE AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-mono">
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
              COOK. SHARE.
            </span>
            <br />
            <span className="text-white text-shadow-neon">EARN TOKENS</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-cyan-300/80 max-w-2xl mx-auto font-mono">
            The first Web3 community cooking platform with AI
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('generator')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black rounded-lg font-bold text-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all duration-300 flex items-center gap-2 font-mono"
            >
              <Sparkles className="w-6 h-6" />
              GENERATE RECIPE
            </button>
            <button 
              onClick={() => setCurrentPage('marketplace')}
              className="px-8 py-4 bg-black/50 backdrop-blur-sm text-cyan-400 border-2 border-cyan-500 rounded-lg font-bold text-lg hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300 flex items-center gap-2 font-mono"
            >
              <ShoppingCart className="w-6 h-6" />
              EXPLORE MARKET
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Users, label: 'Active Chefs', value: stats.users.toLocaleString(), color: 'cyan' },
          { icon: ChefHat, label: 'Recipes Created', value: stats.recipes.toLocaleString(), color: 'magenta' },
          { icon: Coins, label: 'Tokens Distributed', value: stats.tokens.toLocaleString(), color: 'yellow' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300 hover:scale-105">
            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 border border-${stat.color}-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,255,255,0.4)]`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
            </div>
            <div className="text-4xl font-bold mb-1 font-mono bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">{stat.value}</div>
            <div className="text-sm text-cyan-400/70 font-mono">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Weekly Challenges */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 font-mono">
            <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]" />
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">WEEKLY CHALLENGES</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-magenta-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)] hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] transition-all duration-300 hover:border-magenta-500/50">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500' :
                  challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500' :
                  'bg-red-500/20 text-red-400 border border-red-500'
                }`}>
                  {challenge.difficulty.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-cyan-400 font-mono">
                  <Coins className="w-4 h-4" />
                  <span className="font-bold">+{challenge.reward}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-cyan-400 font-mono">{challenge.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-magenta-400/70 mb-4 font-mono">
                <Clock className="w-4 h-4" />
                <span>Remaining: {challenge.time}</span>
              </div>
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black rounded-lg font-bold hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all font-mono">
                JOIN CHALLENGE
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Recipes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2 font-mono">
            <Flame className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]" />
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">TRENDING RECIPES</span>
          </h2>
          <button 
            onClick={() => setCurrentPage('marketplace')}
            className="text-cyan-400 hover:text-magenta-400 font-bold flex items-center gap-1 transition-colors font-mono"
          >
            VIEW ALL →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingRecipes.map((recipe, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-cyan-900 via-magenta-900 to-black flex items-center justify-center text-6xl relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>
                <span className="relative z-10 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">{recipe.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400 font-mono">{recipe.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-magenta-400/70 font-mono">{recipe.creator}</span>
                  <div className="flex items-center gap-1 text-red-400">
                    <Heart className="w-4 h-4 fill-current drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                    <span className="text-sm font-bold font-mono">{recipe.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==================== RECIPE GENERATOR ====================

function RecipeGenerator() {
  const { toast, updateTokens, recipes, setRecipes } = useApp();
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [formData, setFormData] = useState({
    cuisine: '',
    ingredients: '',
    restrictions: [],
    servings: 4,
    time: 30,
    budget: 'medium'
  });

  const cuisineTypes = ['French', 'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Fusion', 'Vegetarian'];
  const restrictions = ['Vegan', 'Gluten-Free', 'Lactose-Free', 'Halal', 'Kosher', 'Paleo'];

  const generateRecipe = async () => {
    if (!formData.cuisine || !formData.ingredients) {
      toast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Generate a unique and creative ${formData.cuisine} recipe using these ingredients: ${formData.ingredients}. 
      Dietary restrictions: ${formData.restrictions.join(', ') || 'none'}. 
      For ${formData.servings} servings, max prep time ${formData.time} minutes, ${formData.budget} budget.
      
      Respond ONLY with valid JSON in this exact format (no markdown, no backticks):
      {
        "title": "recipe name",
        "description": "short description",
        "difficulty": "Easy/Medium/Hard",
        "prep_time": number in minutes,
        "cook_time": number in minutes,
        "servings": number,
        "ingredients": ["ingredient 1", "ingredient 2", ...],
        "steps": ["step 1", "step 2", ...],
        "tips": "chef's tips",
        "nutrition": {"calories": number, "protein": "Xg", "carbs": "Xg"}
      }`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      const recipeText = data.content[0].text;
      
      // Clean and parse JSON
      const cleanedText = recipeText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const recipe = JSON.parse(cleanedText);
      
      recipe.id = Date.now();
      recipe.createdAt = new Date().toISOString();
      recipe.cuisine = formData.cuisine;
      
      setGeneratedRecipe(recipe);
      toast('Recipe Generated Successfully! 🎉', 'success');
      await updateTokens(10);
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast('Error generating recipe', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!generatedRecipe) return;
    
    const updatedRecipes = [...recipes, generatedRecipe];
    setRecipes(updatedRecipes);
    await window.storage.set('remix_user_recipes', JSON.stringify(updatedRecipes));
    toast('Recipe Saved! ✅', 'success');
    await updateTokens(5);
  };

  const mintNFT = async () => {
    if (!generatedRecipe) return;
    
    toast('Minting NFT... ⏳', 'info');
    setTimeout(async () => {
      toast('NFT Minted Successfully! 🎨', 'success');
      await updateTokens(25);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent font-mono">
            AI RECIPE GENERATOR
          </h1>
          <p className="text-lg text-cyan-400/70 font-mono">
            Let Claude create your next signature recipe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(0,255,255,0.2)]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono text-cyan-400">
              <Sparkles className="w-6 h-6" />
              PARAMETERS
            </h2>

            <div className="space-y-6">
              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400 font-mono">
                  CUISINE TYPE *
                </label>
                <select
                  value={formData.cuisine}
                  onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-cyan-500/50 bg-black/70 text-cyan-400 focus:border-magenta-500 focus:outline-none transition-colors font-mono shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]"
                >
                  <option value="">Select...</option>
                  {cuisineTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400 font-mono">
                  AVAILABLE INGREDIENTS *
                </label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  placeholder="Ex: chicken, tomatoes, basil, parmesan..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-cyan-500/50 bg-black/70 text-cyan-400 focus:border-magenta-500 focus:outline-none transition-colors h-24 resize-none font-mono shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]"
                />
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-bold mb-3 text-cyan-400 font-mono">
                  DIETARY RESTRICTIONS
                </label>
                <div className="flex flex-wrap gap-2">
                  {restrictions.map(restriction => (
                    <button
                      key={restriction}
                      onClick={() => {
                        const newRestrictions = formData.restrictions.includes(restriction)
                          ? formData.restrictions.filter(r => r !== restriction)
                          : [...formData.restrictions, restriction];
                        setFormData({...formData, restrictions: newRestrictions});
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all font-mono ${
                        formData.restrictions.includes(restriction)
                          ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {restriction}
                    </button>
                  ))}
                </div>
              </div>

              {/* Servings */}
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400 font-mono">
                  SERVINGS: {formData.servings}
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={formData.servings}
                  onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value)})}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400 font-mono">
                  MAX TIME (MINUTES): {formData.time}
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: parseInt(e.target.value)})}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-400 font-mono">
                  BUDGET
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map(budget => (
                    <button
                      key={budget}
                      onClick={() => setFormData({...formData, budget})}
                      className={`px-4 py-2 rounded-lg font-bold transition-all font-mono ${
                        formData.budget === budget
                          ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {budget.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateRecipe}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-mono"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    GENERATE WITH CLAUDE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recipe Display */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-magenta-500/30 shadow-[0_0_40px_rgba(255,0,255,0.2)]">
            {generatedRecipe ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-cyan-400 font-mono">{generatedRecipe.title}</h2>
                  <p className="text-cyan-400/70 mb-4 font-mono">{generatedRecipe.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border ${
                      generatedRecipe.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-green-500' :
                      generatedRecipe.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                      'bg-red-500/20 text-red-400 border-red-500'
                    }`}>
                      {generatedRecipe.difficulty.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500 rounded-lg text-xs font-bold font-mono">
                      {generatedRecipe.cuisine.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-3 text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                      <div className="text-sm font-bold font-mono text-cyan-400">{generatedRecipe.prep_time + generatedRecipe.cook_time} min</div>
                    </div>
                    <div className="bg-magenta-500/10 border border-magenta-500/50 rounded-lg p-3 text-center">
                      <Users className="w-5 h-5 mx-auto mb-1 text-magenta-400" />
                      <div className="text-sm font-bold font-mono text-magenta-400">{generatedRecipe.servings} ppl</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 text-center">
                      <Flame className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                      <div className="text-sm font-bold font-mono text-yellow-400">{generatedRecipe.nutrition.calories} kcal</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-cyan-400 font-mono">
                    <ShoppingCart className="w-5 h-5" />
                    INGREDIENTS
                  </h3>
                  <ul className="space-y-2">
                    {generatedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-mono text-cyan-400/80">
                        <span className="text-magenta-400 mt-1">▸</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-cyan-400 font-mono">
                    <ChefHat className="w-5 h-5" />
                    STEPS
                  </h3>
                  <ol className="space-y-3">
                    {generatedRecipe.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black rounded-lg flex items-center justify-center text-sm font-bold font-mono shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-cyan-400/80 font-mono">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-cyan-400 font-mono">
                    <Sparkles className="w-4 h-4" />
                    CHEF'S TIP
                  </h4>
                  <p className="text-sm text-cyan-400/70 font-mono">{generatedRecipe.tips}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={saveRecipe}
                    className="flex-1 px-4 py-3 bg-green-500/20 text-green-400 border-2 border-green-500 rounded-lg font-bold hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all flex items-center justify-center gap-2 font-mono"
                  >
                    <Check className="w-5 h-5" />
                    SAVE
                  </button>
                  <button
                    onClick={mintNFT}
                    className="flex-1 px-4 py-3 bg-purple-500/20 text-purple-400 border-2 border-purple-500 rounded-lg font-bold hover:bg-purple-500/30 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all flex items-center justify-center gap-2 font-mono"
                  >
                    <Zap className="w-5 h-5" />
                    MINT NFT
                  </button>
                  <button className="px-4 py-3 bg-blue-500/20 text-blue-400 border-2 border-blue-500 rounded-lg font-bold hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(0,100,255,0.5)] transition-all font-mono">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center text-6xl mb-6 shadow-[0_0_60px_rgba(0,255,255,0.6)] animate-pulse">
                  👨‍🍳
                </div>
                <h3 className="text-2xl font-bold mb-2 text-cyan-400 font-mono">
                  READY TO COOK?
                </h3>
                <p className="text-cyan-400/70 max-w-md font-mono">
                  Fill out the form and let Claude create a unique recipe for you
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== NFT MARKETPLACE ====================

function NFTMarketplace() {
  const { nfts, toast, userTokens, updateTokens, myNFTs, setMyNFTs } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNFT, setSelectedNFT] = useState(null);

  const categories = ['all', 'french', 'italian', 'asian', 'fusion', 'desserts'];

  const buyNFT = async (nft) => {
    if (userTokens < nft.price) {
      toast('Insufficient tokens', 'error');
      return;
    }

    toast('Transaction in progress... ⏳', 'info');
    setTimeout(async () => {
      await updateTokens(-nft.price);
      const updated = [...myNFTs, nft];
      setMyNFTs(updated);
      await window.storage.set('remix_my_nfts', JSON.stringify(updated));
      toast('NFT Purchased Successfully! 🎉', 'success');
      setSelectedNFT(null);
    }, 2000);
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesCategory = filter === 'all' || nft.category.toLowerCase() === filter;
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-mono">
          NFT MARKETPLACE
        </h1>
        <p className="text-lg text-cyan-400/70 font-mono">
          Discover and collect unique recipes
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-bold transition-all font-mono ${
                filter === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black shadow-[0_0_20px_rgba(255,0,255,0.6)]'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
              }`}
            >
              {cat === 'all' ? 'ALL' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-cyan-500/50 bg-black/70 text-cyan-400 focus:border-magenta-500 focus:outline-none font-mono shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]"
          />
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNFTs.map(nft => (
          <div
            key={nft.id}
            onClick={() => setSelectedNFT(nft)}
            className="bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)] hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className={`h-48 bg-gradient-to-br ${nft.gradient} flex items-center justify-center text-6xl relative`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <span className="relative z-10 drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]">{nft.emoji}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg font-mono border ${
                  nft.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400 border-purple-500' :
                  nft.rarity === 'Epic' ? 'bg-pink-500/20 text-pink-400 border-pink-500' :
                  'bg-blue-500/20 text-blue-400 border-blue-500'
                }`}>
                  {nft.rarity.toUpperCase()}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]" />
                  <span className="text-sm font-bold font-mono text-cyan-400">{nft.rating}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1 line-clamp-1 text-cyan-400 font-mono">{nft.name}</h3>
              <p className="text-sm text-magenta-400/70 mb-3 font-mono">{nft.creator}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-purple-400 font-mono">{nft.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-red-400">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="font-mono">{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedNFT(null)}>
          <div className="bg-black border-2 border-cyan-500 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(0,255,255,0.4)]" onClick={e => e.stopPropagation()}>
            <div className={`h-64 bg-gradient-to-br ${selectedNFT.gradient} flex items-center justify-center text-8xl relative`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <span className="relative z-10 drop-shadow-[0_0_30px_rgba(255,0,255,0.8)]">{selectedNFT.emoji}</span>
              <button
                onClick={() => setSelectedNFT(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm border border-cyan-500 rounded-lg flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-cyan-400" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-cyan-400 font-mono">{selectedNFT.name}</h2>
                  <p className="text-magenta-400/70 font-mono">{selectedNFT.creator}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold font-mono border ${
                  selectedNFT.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400 border-purple-500' :
                  selectedNFT.rarity === 'Epic' ? 'bg-pink-500/20 text-pink-400 border-pink-500' :
                  'bg-blue-500/20 text-blue-400 border-blue-500'
                }`}>
                  {selectedNFT.rarity.toUpperCase()}
                </span>
              </div>

              <p className="text-cyan-400/80 mb-6 font-mono">{selectedNFT.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4">
                  <div className="text-sm text-magenta-400/70 mb-1 font-mono">PRICE</div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-purple-400" />
                    <span className="text-2xl font-bold text-purple-400 font-mono">{selectedNFT.price}</span>
                    <span className="text-sm text-magenta-400/70 font-mono">$REMIX</span>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <div className="text-sm text-magenta-400/70 mb-1 font-mono">POPULARITY</div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400 fill-current" />
                    <span className="text-2xl font-bold text-red-400 font-mono">{selectedNFT.likes}</span>
                    <span className="text-sm text-magenta-400/70 font-mono">LIKES</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => buyNFT(selectedNFT)}
                disabled={userTokens < selectedNFT.price}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-black rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(255,0,255,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-mono"
              >
                <ShoppingCart className="w-6 h-6" />
                {userTokens < selectedNFT.price 
                  ? 'INSUFFICIENT TOKENS'
                  : 'BUY NOW'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MY RECIPES ====================

function MyRecipes() {
  const { recipes, toast } = useApp();

  const shareRecipe = async (recipe) => {
    try {
      // Try to share on Farcaster
      const shareText = `🍳 Check out my recipe: ${recipe.title}\n\nGenerated with RemixCuisine DAO!\nhttps://remixcuisine-dao.vercel.app`;
      await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`);
      toast('Opening Farcaster...', 'success');
    } catch (error) {
      // Fallback: copy to clipboard
      console.error('Error sharing to Farcaster:', error);
      toast('Share link copied!', 'success');
    }
  };

  const downloadRecipe = (recipe) => {
    toast('Downloading...', 'info');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent font-mono">
          MY RECIPES
        </h1>
        <p className="text-lg text-cyan-400/70 font-mono">
          Your personal collection
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-12 text-center shadow-[0_0_40px_rgba(0,255,255,0.2)]">
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-6xl mb-6 mx-auto shadow-[0_0_60px_rgba(0,255,0,0.6)] animate-pulse">
            📖
          </div>
          <h3 className="text-2xl font-bold mb-2 text-cyan-400 font-mono">
            NO SAVED RECIPES
          </h3>
          <p className="text-cyan-400/70 mb-6 font-mono">
            Start generating recipes to fill your collection
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-500/30 shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:shadow-[0_0_40px_rgba(0,255,0,0.4)] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-cyan-400 font-mono">{recipe.title}</h3>
                  <p className="text-sm text-cyan-400/70 line-clamp-2 font-mono">{recipe.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold font-mono border ${
                  recipe.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-green-500' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                  'bg-red-500/20 text-red-400 border-red-500'
                }`}>
                  {recipe.difficulty.toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500 rounded-lg text-xs font-bold font-mono">
                  {recipe.cuisine.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-2 text-center">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <div className="text-xs font-bold font-mono text-cyan-400">{recipe.prep_time + recipe.cook_time}min</div>
                </div>
                <div className="bg-magenta-500/10 border border-magenta-500/50 rounded-lg p-2 text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-magenta-400" />
                  <div className="text-xs font-bold font-mono text-magenta-400">{recipe.servings}</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-2 text-center">
                  <Flame className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                  <div className="text-xs font-bold font-mono text-yellow-400">{recipe.nutrition.calories}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => shareRecipe(recipe)}
                  className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500 rounded-lg text-sm font-bold hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(0,100,255,0.5)] transition-all flex items-center justify-center gap-1 font-mono"
                >
                  <Share2 className="w-4 h-4" />
                  SHARE
                </button>
                <button
                  onClick={() => downloadRecipe(recipe)}
                  className="flex-1 px-3 py-2 bg-green-500/20 text-green-400 border border-green-500 rounded-lg text-sm font-bold hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all flex items-center justify-center gap-1 font-mono"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== PROFILE PAGE ====================

function ProfilePage() {
  const { userProfile, farcasterUser } = useApp();

  const badges = [
    { name: 'Beginner', icon: '🌱', earned: true },
    { name: 'Amateur Chef', icon: '👨‍🍳', earned: userProfile?.recipesCreated >= 5 },
    { name: 'Master Chef', icon: '⭐', earned: userProfile?.recipesCreated >= 20 },
    { name: 'Collector', icon: '🎨', earned: userProfile?.nftsOwned >= 3 },
    { name: 'Ambassador', icon: '🏆', earned: userProfile?.tokens >= 500 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)] mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(0,255,255,0.6)]">
              {userProfile?.avatar || '👨‍🍳'}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 text-cyan-400 font-mono">{userProfile?.name || 'Anonymous Chef'}</h1>
              {farcasterUser && (
                <p className="text-sm text-magenta-400 font-mono mb-1">
                  @{farcasterUser.username} • FID: {farcasterUser.fid}
                </p>
              )}
              <p className="text-cyan-400/70 font-mono">
                Member since {userProfile?.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : 'today'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400 font-mono">{userProfile?.recipesCreated || 0}</div>
              <div className="text-sm text-cyan-400/70 font-mono">RECIPES CREATED</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-400 font-mono">{userProfile?.nftsOwned || 0}</div>
              <div className="text-sm text-purple-400/70 font-mono">NFTs OWNED</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-400 font-mono">{userProfile?.tokens || 0}</div>
              <div className="text-sm text-green-400/70 font-mono">$REMIX TOKENS</div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border-2 border-magenta-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,0,255,0.2)]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono text-magenta-400">
            <Award className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]" />
            BADGES
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                    : 'opacity-30 grayscale border-gray-700'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="text-sm font-bold font-mono text-cyan-400">{badge.name.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TOKENS PAGE ====================

function TokensPage() {
  const { userTokens, updateTokens, toast } = useApp();

  const earnings = [
    { action: 'Generate recipe', amount: 10, icon: Sparkles },
    { action: 'Save recipe', amount: 5, icon: Heart },
    { action: 'Complete challenge', amount: 50, icon: Trophy },
    { action: 'Sell NFT', amount: 25, icon: ShoppingCart }
  ];

  const claimDailyReward = async () => {
    await updateTokens(20);
    toast('Daily reward claimed! +20 $REMIX', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-mono">
            $REMIX TOKENS
          </h1>
          <p className="text-lg text-cyan-400/70 font-mono">
            Manage your tokens and claim rewards
          </p>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-br from-cyan-900/50 via-black to-magenta-900/50 border-2 border-cyan-500 rounded-2xl p-8 text-white shadow-[0_0_60px_rgba(0,255,255,0.4)] mb-8">
          <div className="text-center">
            <div className="text-sm text-cyan-400/70 mb-2 font-mono">TOTAL BALANCE</div>
            <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-mono">{userTokens.toLocaleString()}</div>
            <div className="text-xl text-magenta-400 font-mono">$REMIX</div>
          </div>
        </div>

        {/* Daily Reward */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,255,0,0.2)] mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.6)]">
                <Gift className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400 font-mono">DAILY REWARD</h3>
                <p className="text-sm text-cyan-400/70 font-mono">
                  Claim 20 $REMIX every day
                </p>
              </div>
            </div>
            <button
              onClick={claimDailyReward}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg font-bold hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] transition-all font-mono"
            >
              CLAIM
            </button>
          </div>
        </div>

        {/* How to Earn */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)] mb-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400 font-mono">
            HOW TO EARN TOKENS
          </h2>
          <div className="space-y-4">
            {earnings.map((earn, idx) => {
              const Icon = earn.icon;
              return (
                <div key={idx} className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-bold text-cyan-400 font-mono">{earn.action.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold font-mono">
                    <Plus className="w-4 h-4" />
                    <span>{earn.amount}</span>
                    <Coins className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Token Utility */}
        <div className="bg-black/50 backdrop-blur-sm border-2 border-magenta-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,0,255,0.2)]">
          <h2 className="text-2xl font-bold mb-6 text-magenta-400 font-mono">
            TOKEN UTILITY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Buy NFTs', icon: ShoppingCart },
              { title: 'Premium Access', icon: Star },
              { title: 'Vote (DAO)', icon: Users },
              { title: 'Staking Rewards', icon: TrendingUp }
            ].map((utility, idx) => {
              const Icon = utility.icon;
              return (
                <div key={idx} className="bg-magenta-500/10 border border-magenta-500/50 rounded-lg p-4 flex items-center gap-3">
                  <Icon className="w-6 h-6 text-magenta-400" />
                  <span className="font-bold text-magenta-400 font-mono">{utility.title.toUpperCase()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== FOOTER ====================

function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-xl border-t-2 border-cyan-500/50 mt-12 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-lg text-cyan-400 font-mono">RemixCuisine DAO</span>
            </div>
            <p className="text-sm text-cyan-400/70 font-mono">
              The first AI-powered Web3 community cooking platform
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-cyan-400 font-mono">PLATFORM</h3>
            <ul className="space-y-2 text-sm text-cyan-400/70 font-mono">
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Generator</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">NFT Market</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Challenges</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-cyan-400 font-mono">RESOURCES</h3>
            <ul className="space-y-2 text-sm text-cyan-400/70 font-mono">
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Guide</a></li>
              <li><a href="#" className="hover:text-magenta-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-cyan-400 font-mono">COMMUNITY</h3>
            <div className="flex gap-3">
              {['Twitter', 'Discord', 'Telegram', 'GitHub'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] rounded-lg flex items-center justify-center transition-all"
                >
                  <span className="text-xs font-bold text-cyan-400 font-mono">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-cyan-500/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cyan-400/70 font-mono">
            © 2026 RemixCuisine DAO. All rights reserved by <span className="text-cyan-400 font-bold">zcodebase</span>.
          </p>
          <div className="flex gap-6 text-sm font-mono">
            <a href="#" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">
              TERMS
            </a>
            <a href="#" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">
              PRIVACY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== TOAST ====================

function Toast({ message, type }) {
  const bgColors = {
    success: 'bg-green-500/90 border-green-400 shadow-[0_0_30px_rgba(0,255,0,0.5)]',
    error: 'bg-red-500/90 border-red-400 shadow-[0_0_30px_rgba(255,0,0,0.5)]',
    info: 'bg-blue-500/90 border-blue-400 shadow-[0_0_30px_rgba(0,100,255,0.5)]'
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-lg border-2 backdrop-blur-sm flex items-center gap-3 max-w-md font-mono`}>
        {type === 'success' && <Check className="w-5 h-5" />}
        {type === 'error' && <X className="w-5 h-5" />}
        {type === 'info' && <Sparkles className="w-5 h-5" />}
        <span className="font-bold">{message}</span>
      </div>
    </div>
  );
}

// ==================== HELPER FUNCTIONS ====================

function generateSampleNFTs() {
  const samples = [
    { name: 'White Truffle Risotto', category: 'italian', creator: '@chef_marco', price: 150, rarity: 'Epic', gradient: 'from-purple-900 via-black to-pink-900', emoji: '🍄', rating: 4.9, likes: 342, description: 'Creamy risotto elevated with white truffles from Alba' },
    { name: 'Tokyo-Paris Fusion Ramen', category: 'asian', creator: '@fusion_master', price: 120, rarity: 'Rare', gradient: 'from-red-900 via-black to-orange-900', emoji: '🍜', rating: 4.8, likes: 289, description: 'Bold fusion between Japanese and French flavors' },
    { name: 'Modern Bouillabaisse', category: 'french', creator: '@chef_provencal', price: 180, rarity: 'Epic', gradient: 'from-blue-900 via-black to-cyan-900', emoji: '🐟', rating: 4.9, likes: 412, description: 'Contemporary reinvention of the Marseille classic' },
    { name: 'Gourmet Lobster Tacos', category: 'fusion', creator: '@taco_innovator', price: 200, rarity: 'Legendary', gradient: 'from-yellow-900 via-black to-red-900', emoji: '🌮', rating: 5.0, likes: 501, description: 'Mexican tacos revisited with Brittany lobster' },
    { name: 'Deconstructed Tarte Tatin', category: 'desserts', creator: '@patissier_rebel', price: 90, rarity: 'Rare', gradient: 'from-orange-900 via-black to-pink-900', emoji: '🍎', rating: 4.7, likes: 234, description: 'Modern artistic version of Tarte Tatin' },
    { name: 'Sushi Burger Fusion', category: 'fusion', creator: '@sushi_burger', price: 110, rarity: 'Rare', gradient: 'from-green-900 via-black to-blue-900', emoji: '🍣', rating: 4.6, likes: 198, description: 'When sushi meets American burger' },
    { name: 'Truffle Carbonara', category: 'italian', creator: '@pasta_king', price: 140, rarity: 'Epic', gradient: 'from-yellow-900 via-black to-orange-900', emoji: '🍝', rating: 4.8, likes: 367, description: 'Roman carbonara enriched with black truffles' },
    { name: 'Exotic Fruit Pavlova', category: 'desserts', creator: '@sweet_artist', price: 85, rarity: 'Common', gradient: 'from-pink-900 via-black to-purple-900', emoji: '🍰', rating: 4.5, likes: 176, description: 'Light meringue crowned with tropical fruits' },
    { name: 'Premium Vegan Pho', category: 'asian', creator: '@vegan_viet', price: 95, rarity: 'Rare', gradient: 'from-green-900 via-black to-emerald-900', emoji: '🥬', rating: 4.7, likes: 245, description: 'Aromatic broth with seasonal vegetables' },
    { name: 'Sakura Duck Breast', category: 'fusion', creator: '@duck_master', price: 160, rarity: 'Epic', gradient: 'from-red-900 via-black to-pink-900', emoji: '🦆', rating: 4.9, likes: 389, description: 'Duck breast marinated with sake and cherry blossoms' },
    { name: 'Matcha Crème Brûlée', category: 'desserts', creator: '@zen_desserts', price: 100, rarity: 'Rare', gradient: 'from-green-900 via-black to-yellow-900', emoji: '🍮', rating: 4.6, likes: 213, description: 'French classic infused with Japanese matcha tea' },
    { name: 'Royal Neapolitan Pizza', category: 'italian', creator: '@pizza_napoli', price: 130, rarity: 'Rare', gradient: 'from-red-900 via-black to-yellow-900', emoji: '🍕', rating: 4.8, likes: 421, description: 'Traditional pizza with exceptional ingredients' }
  ];

  return samples.map((nft, idx) => ({
    ...nft,
    id: idx + 1
  }));
}
