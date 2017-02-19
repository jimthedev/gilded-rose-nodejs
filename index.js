class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;

  }

  updateQuality() { }
}

class Inn {
  constructor() {
    this.items = [];

    this.items.push(new NormalItem('+5 Dexterity Vest', 10, 20));
    this.items.push(new BrieItem('Aged Brie', 2, 0));
    this.items.push(new NormalItem('Elixir of the Mongoose', 5, 7));
    this.items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    this.items.push(new BackstageItem('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    this.items.push(new ConjuredItem('Conjured Mana Cake', 3, 6));
    this.items.push(new ConjuredItem("Conjured Muffin", 1, 5));
  }

  updateQuality() {
    this.items.forEach(item => {
      item.updateQuality()
    })
  }

}

class NormalItem extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.quality -= 1;
    if (this.sellIn < 0) this.quality -= 1;
    this.quality = Math.max(this.quality, 0);
  }
}

class BrieItem extends Item {
  updateQuality() {
    this.sellIn -= 1;
    if (this.quality >= 50) return;
    this.quality += 1;
    if (this.sellIn < 0 && this.quality < 50) {
      this.quality += 1;
    }
  }
}

class BackstageItem extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.quality += 1;
    if (this.sellIn < 10) this.quality += 1;
    if (this.sellIn < 5) this.quality += 1;
    this.quality = Math.min(this.quality, 50);
    if (this.sellIn < 0) this.quality = 0;
  }
}

class ConjuredItem extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.quality -= 2;
    if (this.sellIn < 0) this.quality -= 2;
    this.quality = Math.max(this.quality, 0);
  }
}

module.exports = Inn;
