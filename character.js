const CHAR_RARITY = {
  raju: "common",
  moye: "common",
  carry: "rare",
  bramha: "legendary",
  "bua lipa": "rare",
  chiti: "epic",
  kajol: "common",
  jethalal: "epic",
  "Rajpal Yadav": "rare",
  sharuk: "legendary"
};

const CHAR_PRICE = {
  raju: 0,
  moye: 1000,
  carry: 3000,
  bramha: 10000,
  "bua lipa": 5500,
  chiti: 6000,
  kajol: 3500,
  jethalal: 8500,
  "Rajpal Yadav": 6500,
  sharuk: 9500
};

const CHARACTERS = [
  { id:'raju', name:'Raju', img:'assets/characters/raju.png' },
  { id:'moye', name:'Moye', img:'assets/characters/moye_moye.png' },
  { id:'carry', name:'Carry', img:'assets/characters/carry.png' },
  { id:'bramha', name:'Brahma', img:'assets/characters/bramha.png' },
  { id:'bua lipa', name:'Bua Lipa', img:'assets/characters/bua lipa.png' },
  { id:'chiti', name:'Chitti', img:'assets/characters/chiti.png' },
  { id:'kajol', name:'Kajol', img:'assets/characters/kajol.png' },
  { id:'jethalal', name:'Kim', img:'assets/characters/jethalal.png' },
  { id:'Rajpal Yadav', name:'Rajpal Yadav', img:'assets/characters/Rajpal Yadav.png' },
  { id:'sharuk', name:'Sharuk', img:'assets/characters/sharuk.png' }
];

for (const c of CHARACTERS) {
  c.rarity = CHAR_RARITY[c.id] || "common";
  c.price = CHAR_PRICE[c.id] ?? 999;
  const img = new Image();
  img.src = c.img;
  c._img = img;
}
