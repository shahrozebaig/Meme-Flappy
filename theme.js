/* =====================================================
      ⭐ THEME RARITY + PRICE
===================================================== */

const THEME_RARITY = {
  hyderabad: "common",
  mumbai: "rare",
  boom: "epic",
  dhoom: "legendary",
  uff: "rare",
  zaap: "epic"
};

const THEME_PRICE = {
  hyderabad: 0,
  mumbai: 1500,
  boom: 3000,
  dhoom: 4000,
  uff: 2000,
  zaap: 3500
};

/* =====================================================
      ⭐ THEMES LIST
===================================================== */
const THEMES = [
  { id:'hyderabad', name:'Hyderabad', bg:'assets/themes/hyderabad.png' },

  { id:'mumbai', name:'Mumbai', bg:'assets/themes/mumbai.png' },
  { id:'boom', name:'Boom', bg:'assets/themes/boom.png' },
  { id:'dhoom', name:'Dhoom', bg:'assets/themes/dhoom.png' },
  { id:'uff', name:'Uff', bg:'assets/themes/uff.png' },
  { id:'zaap', name:'Zaap', bg:'assets/themes/zaap.png' }
];

/* =====================================================
      ⭐ APPLY RARITY + PRICE + PRELOAD
===================================================== */
for (const t of THEMES) {
  t.rarity = THEME_RARITY[t.id];          // ← add rarity (common/rare/epic/legendary)
  t.price = THEME_PRICE[t.id];            // ← add price

  // Preload theme images
  const img = new Image();
  img.src = t.bg;
  t._img = img;
}
