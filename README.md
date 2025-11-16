# 🤪🕊️ Meme Flappy Bird

Meme Flappy Bird is a fun, fast-paced arcade game that mixes the classic flappy-style gameplay with popular Indian memes. Instead of a normal bird, players control funny meme characters, each with their own personality and look. The game challenges you to fly through endless obstacles while enjoying different meme-themed backgrounds, cities, and environments. Players can unlock new characters, switch themes, collect coins, and make their way through random obstacles inspired by everyday desi humor. With clean visuals, smooth motion, and a playful vibe, the game delivers a light-hearted experience designed to make people laugh while competing for high scores.

Play the classic Flappy Bird gameplay with hilarious Indian meme characters and city-themed backgrounds! 🤣

---

## 🗺️ Architecture Diagram


<img width="1839" height="1452" alt="Screenshot 2025-11-16 024610" src="https://github.com/user-attachments/assets/8a718115-30b1-4e31-a1bb-b9d9842ffe08" />


---
## ✨ Features

### 🕹️ **Core Gameplay**
- ✅ Classic Flappy Bird mechanics with smooth controls
- 🎯 Tap / Click / Space to flap
- 📈 Increasing difficulty as you progress
- 🎨 Smooth animations with Canvas API
- 🎲 Random obstacles for every game
- 💥 Clean collision detection
- 📱 Mobile and desktop supported

### 🤣 **Meme Characters**
- 🎭 Multiple hilarious meme characters to choose from
- 🖼️ Premium circular avatar display
- 🔓 Unlock characters using in-game coins
- 💰 Mix of free and paid characters
- 💾 Character ownership saved permanently

### 🌆 **Themes & Backgrounds**
- 🏙️ Multiple Indian city-themed backgrounds (Hyderabad, Mumbai, Delhi)
- 📐 Auto-resizing fullscreen backgrounds
- 🎨 Theme selector with glassmorphic UI
- 💾 Theme preference stored in localStorage

### 🚧 **Dynamic Obstacles**
- 🎲 Random obstacle images per pipe
- 📏 Perfectly scaled (no stretching)
- ⚖️ Fair gameplay with small obstacle sizes
- 🎯 Smooth pipe movement
- ⚙️ Adjustable gap for difficulty tuning

### 💰 **Coins & Shop System**
- 🪙 Earn coins by scoring points
- 🛒 Spend coins in the in-game shop
- 💎 Premium glassmorphic store interface
- 🔒 "Owned" badge for purchased characters
- 💾 Secure coin saving with localStorage

### 🎵 **Audio System**
- 🎶 Background music with seamless loop
- 🔊 Jump sound effects
- 💀 Death sound effects
- 🔇 Music toggle from navigation bar
- 🛡️ Error-proof audio handling

### 🎨 **Modern UI/UX**
- 🪟 Glassmorphic navigation bar
- 🎭 Premium modal panels (Shop, Theme, Character, Game Over)
- ✨ Smooth show/hide transitions
- 🔄 Auto-closing overlapping panels
- 📱 Responsive design for all screen sizes
- 🎯 Perfect spacing and alignment

---

## 🚀 Getting Started

### **Prerequisites**
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/meme-flappy-bird.git
   cd meme-flappy-bird
   ```

2. **Run locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js
     npx serve
     ```

3. **Access the game**
   - Open `http://localhost:8000` in your browser

---

## 🎮 How to Play

### **Controls**

| Action | Input |
|--------|-------|
| **Flap** | Click / Tap / Spacebar |
| **Pause** | Leave screen |
| **Restart** | Click Retry button |
| **Navigation** | Bottom navigation bar |

### **Game Rules**
1. 🐦 Keep your character flying by tapping/clicking
2. 🚧 Avoid hitting obstacles and pipes
3. 🪙 Earn coins for every pipe you pass
4. 🎯 Try to beat your high score!
5. 🛒 Use coins to unlock new characters in the shop

---

## 🔧 Customization

### **Adjust Game Difficulty**
Edit `game.js`:
```javascript
this.pipeGap = 220;     // Gap between obstacles (bigger = easier)
this.speed = 2.5;       // Pipe movement speed (higher = harder)
this.gravity = 0.6;     // Fall gravity (higher = falls faster)
this.lift = -11;        // Flap strength (lower = jumps higher)
```

---

### **Game Architecture**
- **Game Loop**: Uses `requestAnimationFrame()` for smooth 60fps gameplay
- **Physics Engine**: Custom gravity and lift mechanics
- **Collision Detection**: Circular collision for character, rectangular for pipes
- **State Management**: Pure JavaScript with localStorage persistence
- **Canvas Rendering**: HTML5 Canvas API for high-performance graphics

### **Data Persistence**
All game data is stored in browser's localStorage:
- `selectedChar` → Currently selected character
- `selectedTheme` → Active theme
- `shopOwned` → Owned characters/skins
- `shopCoins` → Coin balance

Everything persists across browser sessions!

---

## 🛠️ Built With

- **HTML5** - Canvas API for rendering
- **CSS3** - Glassmorphism effects
- **JavaScript (ES6+)** - Game logic and interactions
- **LocalStorage API** - Data persistence

**No external libraries or frameworks required!** 🎉

---

## 📱 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ Yes |
| Firefox | ✅ Yes |
| Safari | ✅ Yes |
| Edge | ✅ Yes |
| Mobile Safari | ✅ Yes |
| Chrome Mobile | ✅ Yes |

---

## ⭐ Star this repo if you enjoyed the game!

**Made with ❤️ and lots of memes** 🤣

---

**Happy Flapping! 🐦✨**
