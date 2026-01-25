# 🎨 Guide de Personnalisation du Style

Ce fichier explique comment customiser le design cyberpunk/neon de ton Mini App.

## 🌈 Couleurs

### Palette Actuelle (Cyberpunk/Neon)

Les couleurs sont définies dans `tailwind.config.js`:

```javascript
colors: {
  'neon-pink': '#FF00FF',    // Rose néon principal
  'neon-cyan': '#00FFFF',    // Cyan néon pour les accents
  'neon-purple': '#9D00FF',  // Violet pour les gradients
  'cyber-dark': '#0a0a0f',   // Background sombre
  'cyber-darker': '#050508',  // Background ultra-sombre
}
```

### Changer les Couleurs

**Option 1: Modifier dans tailwind.config.js**

```javascript
colors: {
  'neon-pink': '#votre_couleur',
  'neon-cyan': '#votre_couleur',
  // etc...
}
```

**Option 2: Ajouter de nouvelles couleurs**

```javascript
colors: {
  // Couleurs existantes...
  'neon-green': '#00FF00',
  'neon-yellow': '#FFFF00',
  'cyber-blue': '#0A1628',
}
```

Utilise-les ensuite:
```jsx
<div className="text-neon-green bg-cyber-blue">
  Mon texte
</div>
```

## ✨ Effets de Glow

### Text Glow

Défini dans `globals.css`:

```css
.text-glow-pink {
  text-shadow: 0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF;
}

.text-glow-cyan {
  text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF;
}
```

**Utilisation:**
```jsx
<h1 className="text-glow-pink">Titre qui brille!</h1>
```

**Créer un nouveau glow:**
```css
.text-glow-green {
  text-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00;
}
```

### Border Glow

```css
.border-glow-pink {
  box-shadow: 0 0 10px #FF00FF, 0 0 20px #FF00FF, inset 0 0 10px #FF00FF;
}
```

**Pour créer un glow plus intense:**
```css
.border-glow-intense {
  box-shadow: 
    0 0 20px #FF00FF, 
    0 0 40px #FF00FF, 
    0 0 60px #FF00FF,
    inset 0 0 20px #FF00FF;
}
```

## 🎭 Effets Spéciaux

### Glass Effect (Glassmorphism)

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Variations:**
```css
/* Glass plus transparent */
.glass-light {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
}

/* Glass plus opaque */
.glass-heavy {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}
```

### Cyber Grid Background

```css
.cyber-grid {
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

**Variations de grid:**
```css
/* Grid plus serré */
.cyber-grid-tight {
  background-size: 20px 20px;
}

/* Grid avec autre couleur */
.cyber-grid-pink {
  background-image: 
    linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px);
}
```

## 🔄 Animations

### Animations Existantes

Définies dans `tailwind.config.js`:

```javascript
animation: {
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

**Utilisation:**
```jsx
<div className="animate-glow">Texte qui pulse entre pink et cyan</div>
```

### Ajouter Nouvelles Animations

Dans `tailwind.config.js`:

```javascript
animation: {
  // Existantes...
  'spin-slow': 'spin 3s linear infinite',
  'bounce-slow': 'bounce 2s infinite',
  'float': 'float 3s ease-in-out infinite',
}

keyframes: {
  // Existantes...
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}
```

## 🎯 Customiser les Composants

### LuckyDrawCard

Le card principal est dans `src/components/LuckyDrawCard.tsx`.

**Changer le gradient du bouton:**
```jsx
// Actuel:
className="bg-gradient-to-r from-neon-pink to-neon-purple"

// Nouveau:
className="bg-gradient-to-r from-neon-cyan to-neon-purple"
// ou
className="bg-gradient-to-br from-neon-pink via-neon-purple to-neon-cyan"
```

**Changer le glow du card:**
```jsx
// Actuel:
className="glass-effect rounded-2xl p-8 border-glow-pink"

// Nouveau:
className="glass-effect rounded-2xl p-8 border-glow-cyan"
```

### Header

Dans `src/app/page.tsx`:

```jsx
<h1 className="text-5xl sm:text-7xl font-bold mb-4">
  <span className="text-glow-pink animate-glow">Remix</span>
  <span className="text-glow-cyan">Cuisine</span>
</h1>
```

**Pour changer les couleurs:**
```jsx
<span className="text-glow-cyan animate-glow">Remix</span>
<span className="text-glow-pink">Cuisine</span>
```

## 🌟 Background Effects

Les orbes de glow en arrière-plan sont dans `src/app/page.tsx`:

```jsx
<div className="fixed inset-0 pointer-events-none">
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink opacity-10 blur-[100px] rounded-full animate-pulse-slow"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan opacity-10 blur-[100px] rounded-full animate-pulse-slow"></div>
</div>
```

**Ajouter plus d'orbes:**
```jsx
<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-purple opacity-5 blur-[80px] rounded-full animate-pulse"></div>
```

**Changer la taille/position:**
```jsx
// Plus gros
<div className="... w-[500px] h-[500px] ..."></div>

// Différente position
<div className="absolute top-1/4 right-1/3 ..."></div>
```

## 📱 Responsive Design

### Breakpoints Tailwind

- `sm:` - 640px et plus
- `md:` - 768px et plus
- `lg:` - 1024px et plus
- `xl:` - 1280px et plus

**Exemple:**
```jsx
<h1 className="text-3xl sm:text-5xl lg:text-7xl">
  Responsive Title
</h1>
```

## 🎨 Exemples de Thèmes Alternatifs

### Thème Matrix (Vert)

```javascript
// tailwind.config.js
colors: {
  'matrix-green': '#00FF41',
  'matrix-dark': '#0D0208',
}

// Utilisation
<span className="text-matrix-green">The Matrix</span>
```

### Thème Vaporwave

```javascript
colors: {
  'vapor-pink': '#FF71CE',
  'vapor-blue': '#01CDFE',
  'vapor-purple': '#B967FF',
  'vapor-yellow': '#FFFB96',
}
```

### Thème Dark Orange/Blue

```javascript
colors: {
  'dark-orange': '#FF6B35',
  'dark-blue': '#004E89',
  'dark-teal': '#1B998B',
}
```

## 💡 Tips & Tricks

### 1. Hover Effects
```jsx
<button className="hover:scale-105 hover:shadow-neon-pink transition-all duration-300">
  Button
</button>
```

### 2. Layering Glows
```jsx
<div className="text-glow-pink border-glow-cyan">
  Multiple glows!
</div>
```

### 3. Smooth Transitions
```jsx
<div className="transition-all duration-500 ease-in-out">
  Smooth changes
</div>
```

### 4. Custom Gradients
```jsx
<div className="bg-gradient-to-tr from-neon-pink via-neon-purple to-neon-cyan">
  Rainbow gradient
</div>
```

## 🔧 Outils Utiles

- **Coolors.co** - Générer des palettes
- **Gradient Generator** - cssgradient.io
- **Box Shadow Generator** - cssmatic.com/box-shadow
- **Tailwind Play** - play.tailwindcss.com pour tester

---

**Amuse-toi bien avec le style! 🎨💜**
