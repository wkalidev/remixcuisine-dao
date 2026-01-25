# 🚀 GUIDE DE DÉPLOIEMENT - ÉTAPE PAR ÉTAPE

## 📋 AVANT DE COMMENCER

Tu auras besoin de:
- [ ] Un compte Coinbase (pour CDP/OnchainKit)
- [ ] Un wallet avec ETH sur Base (pour déployer le contrat)
- [ ] Un compte Vercel (gratuit)
- [ ] Un compte GitHub (optionnel mais recommandé)

---

## ÉTAPE 1: SETUP DU PROJET 🛠

### 1.1 Clone ou télécharge le projet

```bash
cd remixcuisine-miniapp
npm install
```

### 1.2 Créé ton fichier .env.local

```bash
cp .env.example .env.local
```

---

## ÉTAPE 2: OBTENIR LES CLÉS API 🔑

### 2.1 Coinbase Developer Platform

1. Va sur https://portal.cdp.coinbase.com/
2. Connecte-toi avec ton compte Coinbase
3. Crée un nouveau projet "RemixCuisine"
4. Note ces valeurs:
   - **Project ID** (pour OnchainKit)
   - **API Key** (pour Paymaster - transactions gasless)

5. Colle-les dans `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=ton_project_id_ici
NEXT_PUBLIC_CDP_API_KEY=ta_api_key_ici
```

---

## ÉTAPE 3: DÉPLOYER LE SMART CONTRACT 📝

### Option A: Avec Remix IDE (Le plus simple)

1. **Ouvre Remix**
   - Va sur https://remix.ethereum.org/

2. **Crée le fichier**
   - Clique sur "+" pour nouveau fichier
   - Nom: `LuckyDraw.sol`
   - Copie tout le contenu de `src/contracts/LuckyDraw.sol`

3. **Compile**
   - Va dans l'onglet "Solidity Compiler" (icône à gauche)
   - Sélectionne version: `0.8.20` ou plus
   - Clique "Compile LuckyDraw.sol"
   - Attends le ✅ vert

4. **Connecte ton Wallet**
   - Va dans l'onglet "Deploy & Run Transactions"
   - Environment: Sélectionne "Injected Provider - MetaMask"
   - Connecte ton wallet
   - **IMPORTANT**: Assure-toi d'être sur **Base Mainnet** ou **Base Sepolia**

5. **Déploie le Contrat**
   - Constructor Parameters:
     - `_USDC`: 
       - Base Mainnet: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
       - Base Sepolia: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
     - `_DAOT REASURY`: Ton wallet address (où tu veux recevoir les 10%)
   
   - Clique "Deploy"
   - Confirme dans MetaMask
   - **Attends la confirmation** ⏳

6. **Copie l'adresse du contrat**
   - Une fois déployé, tu verras le contrat dans "Deployed Contracts"
   - Clique sur l'icône "copy" à côté de l'adresse
   - Colle dans `.env.local`:
   ```
   NEXT_PUBLIC_LUCKY_DRAW_CONTRACT=0xTON_ADRESSE_ICI
   ```

### Option B: Avec Foundry (Avancé)

```bash
forge create src/contracts/LuckyDraw.sol:LuckyDraw \
  --rpc-url https://mainnet.base.org \
  --private-key $PRIVATE_KEY \
  --constructor-args 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 $TON_WALLET
```

---

## ÉTAPE 4: CRÉER LES IMAGES 🎨

Crée ces 4 images dans ton style cyberpunk/neon:

### icon.png (512x512)
- Logo de RemixCuisine
- Format: PNG avec fond transparent
- Couleurs: Neon pink (#FF00FF) + Cyan (#00FFFF)

### splash.png (1200x630)
- Image de chargement
- Texte: "RemixCuisine Lucky Draw"
- Background: Grid cyberpunk + effets neon

### og-image.png (1200x630)  
- Preview pour les réseaux sociaux
- Include: Logo + "Win USDC Daily on Base"

### screenshots (1080x1920)
- screenshot1.png: Interface principale du draw
- screenshot2.png: Liste des winners

**Place tout dans `/public/`**

---

## ÉTAPE 5: TESTER LOCALEMENT ✅

```bash
npm run dev
```

Ouvre http://localhost:3000

Vérifie que:
- ✅ Le site charge
- ✅ Le design est correct
- ✅ Le wallet connect fonctionne
- ✅ Tu peux voir le prize pool

---

## ÉTAPE 6: DEPLOY SUR VERCEL 🌐

### 6.1 Push sur GitHub (Recommandé)

```bash
git init
git add .
git commit -m "Initial commit - RemixCuisine Mini App"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/remixcuisine-miniapp.git
git push -u origin main
```

### 6.2 Deploy sur Vercel

1. Va sur https://vercel.com
2. Connecte ton compte GitHub
3. Clique "New Project"
4. Import ton repo `remixcuisine-miniapp`
5. **AVANT de deploy**, ajoute les Environment Variables:
   - `NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID`
   - `NEXT_PUBLIC_CDP_API_KEY`
   - `NEXT_PUBLIC_LUCKY_DRAW_CONTRACT`
6. Clique "Deploy"
7. Attends 2-3 minutes ⏳

### 6.3 Configure Vercel

**SUPER IMPORTANT** ⚠️

1. Va dans ton projet Vercel
2. Settings → Deployment Protection
3. **Désactive "Vercel Authentication"** (toggle à OFF)
4. Save

Sans ça, le manifest Farcaster ne sera pas accessible!

---

## ÉTAPE 7: CONFIGURATION BASE MINI APP 🔗

### 7.1 Update le Manifest

1. Ouvre `public/.well-known/farcaster.json`
2. Remplace **TOUTES** les URLs `remixcuisine-dao.vercel.app` par:
   ```
   TON-APP-NAME.vercel.app
   ```
3. Save et push:
   ```bash
   git add .
   git commit -m "Update manifest with production URLs"
   git push
   ```

### 7.2 Account Association (Important!)

1. Va sur https://www.base.dev/
2. Dans "App URL", entre: `ton-app-name.vercel.app`
3. Clique "Submit"
4. Clique "Verify"
5. Signe le message avec ton wallet
6. **Copie TOUT l'objet `accountAssociation` généré**
7. Colle-le dans `farcaster.json` (remplace l'existant)
8. Save et push:
   ```bash
   git add .
   git commit -m "Add account association"
   git push
   ```

### 7.3 Vérifie le Manifest

Test dans ton navigateur:
```
https://ton-app-name.vercel.app/.well-known/farcaster.json
```

Tu dois voir le JSON complet. Si erreur 404 ou 403, retourne à l'étape 6.3.

---

## ÉTAPE 8: TEST DANS BASE APP 🎯

### Test 1: URL directe
```
https://base.app/frame/ton-app-name.vercel.app
```

### Test 2: Via Farcaster
1. Va sur Warpcast ou autre client Farcaster
2. Cast ton URL: `https://ton-app-name.vercel.app`
3. La Mini App devrait s'afficher!

---

## ÉTAPE 9: LANCER LE PREMIER DRAW 🎲

### 9.1 Fund le Contrat (Optionnel)

Tu peux envoyer des USDC au contrat pour booster le prize pool initial.

### 9.2 Première Participation

1. Ouvre ton app
2. Connecte ton wallet
3. Approve USDC (première fois uniquement)
4. Enter Draw (0.1 USDC)
5. Vérifie que ça fonctionne! ✅

### 9.3 Sélectionner un Winner (Admin)

Quand tu es prêt (23:59 UTC ou quand tu veux):

1. Va sur Remix IDE
2. Charge ton contrat déployé ("At Address")
3. Appelle `selectWinner()`
4. Confirme la transaction
5. Le winner est sélectionné et payé automatiquement! 🎉

---

## 🎊 FÉLICITATIONS!

Ton RemixCuisine Daily Lucky Draw est LIVE! 🚀

### Prochaines Étapes:

1. **Marketing**
   - Share sur Farcaster
   - Post sur X/Twitter
   - Join Base community channels

2. **Améliorations**
   - Implemente Chainlink VRF pour randomisation sécurisée
   - Ajoute des notifications push
   - Crée des tiers de prizes multiples

3. **Grow**
   - Track analytics dans Vercel
   - Écoute le feedback des users
   - Iterate et améliore!

---

## 🆘 PROBLÈMES COURANTS

### "Manifest not found" (404)
→ Vérifie que Vercel Authentication est désactivé

### "Transaction failed"
→ Assure-toi d'avoir approuvé USDC d'abord

### "Cannot read contract"
→ Vérifie que `NEXT_PUBLIC_LUCKY_DRAW_CONTRACT` est correct

### "No providers available"
→ Installe MetaMask ou Coinbase Wallet

---

## 📞 BESOIN D'AIDE?

- Re-lis ce guide étape par étape
- Check le README.md pour plus de détails techniques
- DM moi sur Farcaster: @zcodebase

**Bon courage et que la chance soit avec toi! 🍕💜**
