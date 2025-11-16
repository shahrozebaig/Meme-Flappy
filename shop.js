const Shop = {
  coins: Number(localStorage.getItem('coins') || 0),
  owned: JSON.parse(localStorage.getItem('owned') || '{}'),

  buy(id, price) {
    if (this.owned[id] || this.coins < price) return false;
    this.coins -= price;
    this.owned[id] = true;
    this.save();
    return true;
  },

  save() {
    localStorage.setItem('coins', JSON.stringify(this.coins));
    localStorage.setItem('owned', JSON.stringify(this.owned));
  },

  grantCoins(n) {
    this.coins += n;
    this.save();
  }
};

if (!Shop.owned['raju']) Shop.owned['raju'] = true;
Shop.save();
