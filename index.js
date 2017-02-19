class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Inn {
  constructor() {
    this.items = [];

    this.items.push(new Item('+5 Dexterity Vest', 10, 20));
    this.items.push(new Item('Aged Brie', 2, 0));
    this.items.push(new Item('Elixir of the Mongoose', 5, 7));
    this.items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    this.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    this.items.push(new Item('Conjured Mana Cake', 3, 6));
    this.items.push(new Item("Conjured Muffin", 1, 5));
  }

  updateQuality() {
    this.items.forEach(item => {
      switch(item.name) {
        case '+5 Dexterity Vest':
          return vestUpdate(item);
        case 'Aged Brie':
          return agiedBrieUpdate(item);
        case 'Elixir of the Mongoose':
          return elixirUpdate(item);
        case 'Sulfuras, Hand of Ragnaros':
          return sulfurasUpdate(item);
        case 'Backstage passes to a TAFKAL80ETC concert':
          return backstagePassesUpdate(item);
      }
    })
  }

}

function vestUpdate(item) {
  item.sellIn -= 1;
  item.quality -= 1;
  if (item.sellIn < 0) item.quality -= 1;
  item.quality = Math.max(item.quality, 0);
}

function agiedBrieUpdate(item) {
  item.sellIn -= 1;
  if (item.quality >= 50) return;
  item.quality += 1;
  if (item.sellIn < 0 && item.quality < 50) {
    item.quality += 1;
  }
}

function elixirUpdate(item) {
  item.sellIn -= 1;
  if (item.quality <= 0) return;
  item.quality -= 1;
  if (item.quality <= 0) return;
  if (item.sellIn <= 0) item.quality -= 1;
}

function sulfurasUpdate(item) {

}

function backstagePassesUpdate(item) {
  item.sellIn -= 1;
  item.quality += 1;
  if (item.sellIn < 10) item.quality += 1;
  if (item.sellIn < 5) item.quality += 1;
  item.quality = Math.min(item.quality, 50);
  if (item.sellIn < 0) item.quality = 0;
}

module.exports = Inn;
