#!/usr/bin/env node

/**
 * Script de vérification de configuration
 * Vérifie que tous les fichiers et variables sont en place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration RemixCuisine Mini App...\n');

// Couleurs pour le terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`${colors.green}✅${colors.reset} ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`${colors.red}❌${colors.reset} ${description} - ${filePath} not found`);
    checks.failed++;
    return false;
  }
}

function checkEnvVar(varName, description) {
  require('dotenv').config({ path: '.env.local' });
  const value = process.env[varName];
  
  if (value && value !== 'your_' && value !== '0x0000') {
    console.log(`${colors.green}✅${colors.reset} ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`${colors.yellow}⚠️${colors.reset}  ${description} - ${varName} not configured`);
    checks.warnings++;
    return false;
  }
}

// Vérification des fichiers essentiels
console.log(`${colors.blue}📁 Fichiers essentiels:${colors.reset}`);
checkFile('package.json', 'Package.json');
checkFile('next.config.js', 'Next.js config');
checkFile('tailwind.config.js', 'Tailwind config');
checkFile('tsconfig.json', 'TypeScript config');
checkFile('src/app/page.tsx', 'Page principale');
checkFile('src/app/layout.tsx', 'Layout');
checkFile('src/app/providers.tsx', 'Providers');
checkFile('public/.well-known/farcaster.json', 'Manifest Farcaster');

console.log();

// Vérification des composants
console.log(`${colors.blue}🧩 Composants:${colors.reset}`);
checkFile('src/components/LuckyDrawCard.tsx', 'LuckyDrawCard component');
checkFile('src/components/ConnectButton.tsx', 'ConnectButton component');
checkFile('src/components/StatsDisplay.tsx', 'StatsDisplay component');
checkFile('src/components/WinnersList.tsx', 'WinnersList component');

console.log();

// Vérification du smart contract
console.log(`${colors.blue}📝 Smart Contract:${colors.reset}`);
checkFile('src/contracts/LuckyDraw.sol', 'Smart contract Solidity');

console.log();

// Vérification des variables d'environnement
console.log(`${colors.blue}🔐 Variables d'environnement:${colors.reset}`);
if (fs.existsSync('.env.local')) {
  checkEnvVar('NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID', 'OnchainKit Project ID');
  checkEnvVar('NEXT_PUBLIC_CDP_API_KEY', 'CDP API Key (Paymaster)');
  checkEnvVar('NEXT_PUBLIC_LUCKY_DRAW_CONTRACT', 'Lucky Draw Contract Address');
} else {
  console.log(`${colors.red}❌${colors.reset} Fichier .env.local non trouvé`);
  console.log(`   ${colors.yellow}→${colors.reset} Copie .env.example vers .env.local`);
  checks.failed++;
}

console.log();

// Vérification des images
console.log(`${colors.blue}🎨 Assets (images):${colors.reset}`);
const hasIcon = checkFile('public/icon.png', 'Icon (512x512)');
const hasSplash = checkFile('public/splash.png', 'Splash screen (1200x630)');
const hasOg = checkFile('public/og-image.png', 'OG Image (1200x630)');
if (!hasIcon || !hasSplash || !hasOg) {
  console.log(`   ${colors.yellow}→${colors.reset} Crée les images manquantes dans le style cyberpunk/neon`);
}

console.log();

// Vérification du manifest
console.log(`${colors.blue}🔗 Manifest Farcaster:${colors.reset}`);
if (fs.existsSync('public/.well-known/farcaster.json')) {
  const manifest = JSON.parse(fs.readFileSync('public/.well-known/farcaster.json', 'utf8'));
  
  if (manifest.miniApp && manifest.miniApp.name) {
    console.log(`${colors.green}✅${colors.reset} Nom de l'app: ${manifest.miniApp.name}`);
    checks.passed++;
  }
  
  if (manifest.frame && manifest.frame.imageUrl) {
    const urlCheck = manifest.frame.imageUrl.includes('remixcuisine-dao.vercel.app');
    if (urlCheck) {
      console.log(`${colors.yellow}⚠️${colors.reset}  URLs encore en mode template`);
      console.log(`   ${colors.yellow}→${colors.reset} Remplace remixcuisine-dao.vercel.app par ton URL Vercel`);
      checks.warnings++;
    } else {
      console.log(`${colors.green}✅${colors.reset} URLs du manifest configurées`);
      checks.passed++;
    }
  }
  
  const hasAssociation = manifest.accountAssociation && 
                        manifest.accountAssociation.signature && 
                        !manifest.accountAssociation.signature.includes('MHg...');
  
  if (hasAssociation) {
    console.log(`${colors.green}✅${colors.reset} Account Association configurée`);
    checks.passed++;
  } else {
    console.log(`${colors.yellow}⚠️${colors.reset}  Account Association non configurée`);
    console.log(`   ${colors.yellow}→${colors.reset} Va sur https://www.base.dev/ pour générer`);
    checks.warnings++;
  }
}

console.log();

// Résumé
console.log('─'.repeat(60));
console.log(`${colors.blue}📊 Résumé:${colors.reset}`);
console.log(`${colors.green}✅ Passés:${colors.reset} ${checks.passed}`);
if (checks.warnings > 0) {
  console.log(`${colors.yellow}⚠️  Warnings:${colors.reset} ${checks.warnings}`);
}
if (checks.failed > 0) {
  console.log(`${colors.red}❌ Échecs:${colors.reset} ${checks.failed}`);
}

console.log();

// Prochaines étapes
if (checks.failed > 0 || checks.warnings > 0) {
  console.log(`${colors.yellow}📋 Prochaines étapes:${colors.reset}`);
  if (checks.failed > 0) {
    console.log('1. Résous les erreurs (❌) ci-dessus');
    console.log('2. Réfère-toi au GUIDE_DEPLOIEMENT.md pour les instructions');
  }
  if (checks.warnings > 0) {
    console.log('3. Configure les éléments avec warnings (⚠️)');
    console.log('4. Teste localement avec: npm run dev');
  }
} else {
  console.log(`${colors.green}🎉 Tout est prêt!${colors.reset}`);
  console.log();
  console.log('Prochaines étapes:');
  console.log('1. Lance le dev server: npm run dev');
  console.log('2. Teste l\'app localement');
  console.log('3. Deploy sur Vercel quand prêt');
  console.log('4. Configure le manifest pour Base Mini App');
}

console.log();
console.log(`Pour plus d'aide, lis: ${colors.blue}GUIDE_DEPLOIEMENT.md${colors.reset}`);
console.log('─'.repeat(60));
