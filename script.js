/* =====================================================
    MAIN ELEMENTS
===================================================== */
const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);

/* ⭐ HIGH SCORE ADDITION */
const highScoreEl = document.getElementById('highScore');
let bestScore = parseInt(localStorage.getItem("bestScore") || "0");
if (highScoreEl) highScoreEl.textContent = "Best: " + bestScore;

/* SHOP ELEMENTS */
const shopPanel = document.getElementById('shopPanel');
const closeShop = document.getElementById('closeShop');

const shopCharactersGrid = document.getElementById('shopCharactersGrid');
const shopThemesGrid = document.getElementById('shopThemesGrid');

const tabCharacters = document.getElementById('tabCharacters');
const tabThemes = document.getElementById('tabThemes');

const coinsDisplay = document.getElementById('coinsDisplay');

/* OUTSIDE PANELS */
const themePanel = document.getElementById('themePanel');
const themeGrid = document.getElementById('themeGrid');
const closeThemeBtn = document.getElementById('closeThemeBtn');

const charPanel = document.getElementById('charPanel');
const charGrid = document.getElementById('charGrid');
const closeCharBtn = document.getElementById('closeCharBtn');

const gameOverPanel = document.getElementById('gameOverPanel');
const finalScore = document.getElementById('finalScore');
const scoreEl = document.getElementById('score');

/* NAV */
const navPlay = document.getElementById('navPlay');
const navShop = document.getElementById('navShop');
const navTheme = document.getElementById('navTheme');
const navChar = document.getElementById('navChar');
const navMusic = document.getElementById('navMusic');

/* AUDIO */
const musicToggleState = { on: true };

/* =====================================================
      RARITY SYSTEM
===================================================== */
const RARITY = {
  raju: "common",
  moye: "common",
  carry: "rare",
  bramha: "legendary",
  "bua lipa": "rare",
  chiti: "epic",
  kajol: "common",
  "kim jethalal": "epic",
  "  Rajpal Yadav": "rare",
  sharuk: "legendary"
};

/* =====================================================
      CLOSE ALL PANELS
===================================================== */
function closeAllPanels() {
  shopPanel.classList.add('hidden');
  themePanel.classList.add('hidden');
  charPanel.classList.add('hidden');
  gameOverPanel.classList.add('hidden');
}

/* =====================================================
      SHOP — CHARACTER GRID
===================================================== */
function refreshShopCharacters() {
  shopCharactersGrid.innerHTML = '';
  coinsDisplay.textContent = 'Coins: ' + Shop.coins;

  for (const c of CHARACTERS) {
    const rarity = RARITY[c.id] || "common";

    const card = document.createElement('div');
    card.className = `skinCard ${rarity}`;

    const img = document.createElement('img');
    img.src = c.img;

    const name = document.createElement('div');
    name.textContent = c.name;

    const price = document.createElement('div');
    price.textContent = c.price === 0 ? "Free" : `Price: ${c.price}`;

    const badge = document.createElement('div');
    badge.className = 'badge';

    const btn = document.createElement('button');

    if (Shop.owned[c.id]) {
      badge.textContent = "OWNED";
      badge.classList.add("owned");
      btn.textContent = "Owned";
      btn.disabled = true;
    } else {
      badge.textContent = "LOCKED";
      badge.classList.add("locked");

      btn.textContent = "Buy";
      btn.onclick = () => {
        if (Shop.buy(c.id, c.price)) {
          refreshShopCharacters();
          alert("Bought " + c.name);
        } else {
          alert("Not enough coins!");
        }
      };
    }

    card.appendChild(badge);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(btn);

    shopCharactersGrid.appendChild(card);
  }
}

/* =====================================================
      SHOP — THEME GRID
===================================================== */
function refreshShopThemes() {
  shopThemesGrid.innerHTML = '';
  coinsDisplay.textContent = 'Coins: ' + Shop.coins;

  THEMES.forEach(t => {
    const rarityClass = "theme-" + t.rarity;

    const card = document.createElement("div");
    card.className = `skinCard ${rarityClass}`;

    const img = document.createElement("img");
    img.src = t.bg;

    const name = document.createElement("div");
    name.textContent = t.name;

    const priceVal = t.price ?? 0;
    const price = document.createElement("div");
    price.textContent = priceVal === 0 ? "Free" : `Price: ${priceVal}`;

    const badge = document.createElement("div");
    badge.className = "badge";

    const key = "THEME_" + t.id;
    const isOwned = Shop.owned[key] || priceVal === 0;

    const btn = document.createElement("button");

    if (isOwned) {
      badge.textContent = "OWNED";
      badge.classList.add("owned");

      btn.textContent = "Owned";
      btn.disabled = true;

      card.onclick = () => {
        localStorage.setItem("selectedTheme", t.id);
        alert("Theme Selected: " + t.name);
        shopPanel.classList.add("hidden");
      };

    } else {
      badge.textContent = "LOCKED";
      badge.classList.add("locked");

      btn.textContent = "Buy";
      btn.onclick = () => {
        if (Shop.buy(key, priceVal)) {
          alert("Purchased theme: " + t.name);
          refreshShopThemes();
        } else {
          alert("Not enough coins!");
        }
      };
    }

    card.appendChild(badge);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(btn);

    shopThemesGrid.appendChild(card);
  });
}

/* =====================================================
      SHOP TABS
===================================================== */
tabCharacters.onclick = () => {
  tabCharacters.classList.add("active");
  tabThemes.classList.remove("active");

  shopCharactersGrid.classList.remove("hidden");
  shopThemesGrid.classList.add("hidden");

  refreshShopCharacters();
};

tabThemes.onclick = () => {
  tabThemes.classList.add("active");
  tabCharacters.classList.remove("active");

  shopThemesGrid.classList.remove("hidden");
  shopCharactersGrid.classList.add("hidden");

  refreshShopThemes();
};

navShop.addEventListener('click', () => {
  closeAllPanels();
  tabCharacters.click();
  shopPanel.classList.remove('hidden');
});

/* =====================================================
      OUTSIDE CHARACTER PANEL
===================================================== */
function populateCharPanel() {
  charGrid.innerHTML = "";

  CHARACTERS.forEach(c => {
    const rarity = RARITY[c.id] || "common";

    const card = document.createElement("div");
    card.className = `grid-card ${rarity}`;

    const img = document.createElement("img");
    img.src = c.img;

    const name = document.createElement("div");
    name.textContent = c.name;

    const badge = document.createElement("div");
    badge.className = "badge";

    const isOwned = Shop.owned[c.id];

    if (isOwned) {
      badge.textContent = "OWNED";
      badge.classList.add("owned");
    } else {
      badge.textContent = "LOCKED";
      badge.classList.add("locked");
    }

    card.onclick = () => {
      if (!isOwned) {
        alert("Character not owned!");
        return;
      }
      localStorage.setItem("selectedChar", c.id);
      alert("Selected: " + c.name);
      charPanel.classList.add("hidden");
    };

    card.appendChild(badge);
    card.appendChild(img);
    card.appendChild(name);

    charGrid.appendChild(card);
  });
}

/* =====================================================
      OUTSIDE THEME PANEL
===================================================== */
function populateThemePanel() {
  themeGrid.innerHTML = "";

  THEMES.forEach(t => {
    const rarityClass = "theme-" + t.rarity;

    const card = document.createElement("div");
    card.className = `grid-card ${rarityClass}`;

    const img = document.createElement("img");
    img.src = t.bg;

    const name = document.createElement("div");
    name.textContent = t.name;

    const badge = document.createElement("div");
    badge.className = "badge";

    const key = "THEME_" + t.id;
    const isOwned = Shop.owned[key] || t.price === 0;

    if (isOwned) {
      badge.textContent = "OWNED";
      badge.classList.add("owned");
    } else {
      badge.textContent = "LOCKED";
      badge.classList.add("locked");
    }

    card.onclick = () => {
      if (!isOwned) {
        alert("Theme not owned!");
        return;
      }

      localStorage.setItem("selectedTheme", t.id);
      alert("Theme Set: " + t.name);
      themePanel.classList.add("hidden");
    };

    card.appendChild(badge);
    card.appendChild(img);
    card.appendChild(name);

    themeGrid.appendChild(card);
  });
}

/* =====================================================
      GAME / UI HANDLING
===================================================== */
async function goFullscreen() {
  if (document.body.requestFullscreen)
    await document.body.requestFullscreen();
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

navPlay.addEventListener('click', async () => {
  closeAllPanels();
  await goFullscreen();

  const c = localStorage.getItem('selectedChar') || CHARACTERS[0].id;
  const t = localStorage.getItem('selectedTheme') || THEMES[0].id;

  if (!Shop.owned[c]) {
    alert("Buy or select a free character.");
    return;
  }

  game.start(c, t);
  if (musicToggleState.on) playBg();

  loopUI();
});

navTheme.addEventListener('click', () => {
  closeAllPanels();
  populateThemePanel();
  themePanel.classList.remove('hidden');
});

navChar.addEventListener('click', () => {
  closeAllPanels();
  populateCharPanel();
  charPanel.classList.remove('hidden');
});

navMusic.addEventListener('click', () => {
  musicToggleState.on = !musicToggleState.on;

  if (musicToggleState.on) {
    playBg();
    navMusic.innerHTML = '🔊<div class="nav-label">Music</div>';
  } else {
    pauseBg();
    navMusic.innerHTML = '🔈<div class="nav-label">Music</div>';
  }
});

closeShop.addEventListener('click', () => shopPanel.classList.add('hidden'));
closeThemeBtn.addEventListener('click', () => themePanel.classList.add('hidden'));
closeCharBtn.addEventListener('click', () => charPanel.classList.add('hidden'));

retryBtn.addEventListener('click', async () => {
  closeAllPanels();
  await goFullscreen();

  const c = localStorage.getItem('selectedChar') || CHARACTERS[0].id;
  const t = localStorage.getItem('selectedTheme') || THEMES[0].id;

  if (!Shop.owned[c]) {
    alert("Buy or select a free character.");
    return;
  }

  game.start(c, t);
  if (musicToggleState.on) playBg();

  loopUI();
});

/* =====================================================
      INPUT
===================================================== */
window.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    game.flap();
  }
});

canvas.addEventListener('pointerdown', () => game.flap());
canvas.addEventListener('touchstart', () => game.flap(), { passive: true });

/* =====================================================
      UI LOOP WITH HIGH SCORE UPDATE
===================================================== */
function loopUI() {
  if (!game.alive) {
    finalScore.textContent = game.score;

    /* ⭐ UPDATE BEST SCORE ON GAME OVER */
    if (game.score > bestScore) {
      bestScore = game.score;
      localStorage.setItem("bestScore", bestScore);

      if (highScoreEl) highScoreEl.textContent = "Best: " + bestScore;
    }

    gameOverPanel.classList.remove('hidden');
    return;
  }

  scoreEl.textContent = game.score;

  /* ⭐ LIVE HIGH SCORE UPDATE */
  if (game.score > bestScore) {
    bestScore = game.score;
    if (highScoreEl) highScoreEl.textContent = "Best: " + bestScore;
  }

  requestAnimationFrame(loopUI);
}

game.onGameOver = () => {
  closeAllPanels();
  pauseBg();
  playDeath();

  /* ⭐ Ensure saving best score here too */
  if (game.score > bestScore) {
    bestScore = game.score;
    localStorage.setItem("bestScore", bestScore);
  }

  gameOverPanel.classList.remove('hidden');
};

/* INITIAL LOAD */
populateCharPanel();
populateThemePanel();
refreshShopCharacters();

if (highScoreEl) highScoreEl.textContent = "Best: " + bestScore;

window.g = game;
