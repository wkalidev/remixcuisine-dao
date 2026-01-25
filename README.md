# 🍕 RemixCuisine DAO - Daily Lucky Draw Mini App

Une Mini App Base pour gagner des USDC quotidiennement ! Style cyberpunk/neon avec intégration complète sur Base Network.

## 🎯 Features

- ✅ **Daily Lucky Draw** - Loterie quotidienne avec USDC
- ✅ **Base Mini App** - Intégration Farcaster + Base App
- ✅ **Gasless UX** - Paymaster pour sponsoriser le gas
- ✅ **Smart Contract** - Contrat Solidity sécurisé
- ✅ **Cyberpunk Design** - Neon pink/cyan aesthetic
- ✅ **OnchainKit** - Composants Web3 modernes

## 🚀 Quick Start

### 1. Installation

```bash
cd remixcuisine-miniapp
npm install
```

### 2. Configuration

Copie `.env.example` vers `.env.local` et remplis les variables:

```bash
cp .env.example .env.local
```

**Variables requises:**
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID` - De https://portal.cdp.coinbase.com/
- `NEXT_PUBLIC_CDP_API_KEY` - Pour Paymaster
- `NEXT_PUBLIC_LUCKY_DRAW_CONTRACT` - Après déploiement du contrat

### 3. Développement Local

```bash
npm run dev
```

Ouvre http://localhost:3000

## 📝 Déploiement du Smart Contract

### Option 1: Remix IDE (Recommandé pour débutants)

1. Va sur https://remix.ethereum.org/
2. Crée un nouveau fichier `LuckyDraw.sol`
3. Copie le contrat depuis `src/contracts/LuckyDraw.sol`
4. Compile avec Solidity 0.8.20+
5. Déploie sur Base Mainnet ou Base Sepolia:
   - Constructor args:
     - `_usdc`: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (Base Mainnet)
     - `_daoTreasury`: Ton wallet address

6. Copie l'adresse du contrat déployé dans `.env.local`

### Option 2: Hardhat/Foundry

```bash
# Avec Hardhat
npx hardhat run scripts/deploy.js --network base

# Avec Foundry
forge create src/contracts/LuckyDraw.sol:LuckyDraw \
  --rpc-url https://mainnet.base.org \
  --private-key $PRIVATE_KEY \
  --constructor-args 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 $YOUR_TREASURY
```

## 🌐 Déploiement Vercel

### 1. Deploy sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

Ou manuellement:

```bash
npm run build
vercel --prod
```

### 2. Configure les Variables d'Environnement

Dans Vercel Dashboard → Settings → Environment Variables, ajoute:
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID`
- `NEXT_PUBLIC_CDP_API_KEY`
- `NEXT_PUBLIC_LUCKY_DRAW_CONTRACT`

### 3. Désactive Vercel Authentication

⚠️ **IMPORTANT** - Sans ça, le manifest ne sera pas accessible!

1. Va dans Vercel Dashboard
2. Settings → Deployment Protection
3. Toggle "Vercel Authentication" à **OFF**
4. Save

## 🔗 Configuration Base Mini App

### 1. Update Manifest

Édite `public/.well-known/farcaster.json`:
- Remplace toutes les URLs par ton domaine Vercel
- Garde la structure existante

### 2. Account Association

1. Va sur https://www.base.dev/
2. Entre ton URL: `your-app.vercel.app`
3. Clique "Submit"
4. Clique "Verify" et suis les instructions
5. Copie l'objet `accountAssociation` généré
6. Colle-le dans `farcaster.json`
7. Redéploie sur Vercel

### 3. Vérifie le Manifest

Teste que ton manifest est accessible:
```
https://your-app.vercel.app/.well-known/farcaster.json
```

Tu devrais voir le JSON complet.

## 🎨 Assets Requis

Crée ces images dans ton style cyberpunk/neon:

### icon.png (512x512px)
- Logo RemixCuisine
- Background transparent
- Style: Neon pink/cyan

### splash.png (1200x630px)
- Écran de chargement
- Texte: "RemixCuisine Lucky Draw"
- Background: Cyberpunk grid

### og-image.png (1200x630px)
- Preview dans le feed
- Include: Logo + "Win USDC Daily"

### screenshots (1080x1920px)
- `screenshot1.png` - Main draw interface
- `screenshot2.png` - Winners list

Place tous les assets dans `/public/`

## 🧪 Test sur Base App

### 1. Via URL directe
```
https://base.app/frame/your-app.vercel.app
```

### 2. Via Farcaster Cast
Cast ton URL sur Farcaster et elle devrait render comme une Mini App

## 📊 Smart Contract Functions

### User Functions
```solidity
// Entre le draw (coûte 0.1 USDC)
enterDraw()

// View functions
getCurrentPrizePool() → uint256
getTotalEntries() → uint256
```

### Admin Functions (Owner only)
```solidity
// Sélectionne le winner du jour
selectWinner()

// Emergency
emergencyWithdraw()
```

## 💡 Améliorer la Randomisation

⚠️ Le contrat actuel utilise une randomisation simple (unsafe).

**Pour production, utilise Chainlink VRF:**

1. Installe `@chainlink/contracts`
2. Implemente `VRFConsumerBaseV2`
3. Configure VRF Subscription sur Base
4. Update `selectWinner()` pour utiliser VRF

Documentation: https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number

## 🔐 Sécurité

- ✅ ReentrancyGuard sur toutes les functions critiques
- ✅ Ownable pour admin functions
- ✅ Input validation
- ⚠️ Randomisation à améliorer avec Chainlink VRF
- ✅ Emergency withdraw pour l'owner

## 📱 Mobile Testing

### Activer Eruda (Console mobile)
```typescript
// Dans src/app/layout.tsx
{process.env.NODE_ENV === 'development' && (
  <Script src="https://cdn.jsdelivr.net/npm/eruda" />
)}
```

## 🎯 Roadmap

- [x] Basic Lucky Draw
- [x] Base Mini App Integration
- [x] Cyberpunk Design
- [ ] Chainlink VRF Integration
- [ ] Multi-prize tiers
- [ ] NFT rewards pour winners
- [ ] Recipe submission system
- [ ] DAO governance
- [ ] Mobile push notifications

## 🛠 Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS + Custom Neon Theme
- **Web3:** Wagmi + Viem
- **UI:** OnchainKit (Coinbase)
- **Smart Contract:** Solidity 0.8.20
- **Network:** Base (L2)
- **Token:** USDC

## 📞 Support

Des questions? Trouve-moi sur:
- Farcaster: @zcodebase
- Twitter/X: @zcodebase
- Email: (ton email)

## 📄 License

MIT

---

**Built with 💜 by zcodebase**

*Bon appétit et bonne chance! 🍕🎲*
