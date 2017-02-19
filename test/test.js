var expect = require('chai').expect;
var Inn = require('../');

describe('Gilded Rose', function () {

  var DEXTERITY_VEST_IDX = 0;
  var BRIE_IDX = 1;
  var MANGOOSE_ELIXIR_IDX = 2;
  var SULFURAS_IDX = 3;
  var BACKSTAGE_PASSES_IDX = 4;
  var CONJURED_MANA_CAKE_IDX = 5;
  var CONJURED_MUFFIN_IDX = 6;

  var inn;

  beforeEach(function () {
    inn = new Inn();
  });

  describe('Dexterity Vest', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(dexterityVest().sellIn).to.equal(9);
      inn.updateQuality();
      expect(dexterityVest().sellIn).to.equal(8);
    })
    it('should decrease quality', function() {
      inn.updateQuality();
      expect(dexterityVest().quality).to.equal(19);
      inn.updateQuality();
      expect(dexterityVest().quality).to.equal(18);
    })
    it('should decrease quality twice after sellIn reaches 0', function() {
      item = dexterityVest();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(8);
    })
    it('should never have a quality less than 0', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.least(0);
    })
  })

  describe('Aged Brie', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(brie().sellIn).to.equal(1);
      inn.updateQuality();
      expect(brie().sellIn).to.equal(0);
    })
    it('should increase quality', function() {
      inn.updateQuality();
      expect(brie().quality).to.equal(1);
      inn.updateQuality();
      expect(brie().quality).to.equal(2);
    })
    it('should increase quality twice after sellIn reaches 0', function() {
      item = brie();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(4);
    })
    it('should never have a quality greater than 50', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.most(50);
    })
  })

  describe('Elixir', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(mangooseElixir().sellIn).to.equal(4);
      inn.updateQuality();
      expect(mangooseElixir().sellIn).to.equal(3);
    })
    it('should decrease quality', function() {
      inn.updateQuality();
      expect(mangooseElixir().quality).to.equal(6);
      inn.updateQuality();
      expect(mangooseElixir().quality).to.equal(5);
    })
    it('should decrease quality twice after sellIn reaches 0', function() {
      item = mangooseElixir();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(0);
    })
    it('should never have a quality less than 0', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.least(0);
    })
  })

  describe('Sulfuras', function() {
    it('should never change sellIn', function() {
      inn.updateQuality();
      expect(sulfuras().sellIn).to.equal(0);
      inn.updateQuality();
      expect(sulfuras().sellIn).to.equal(0);
    })
    it('should never change quality', function() {
      inn.updateQuality();
      expect(sulfuras().quality).to.equal(80);
      inn.updateQuality();
      expect(sulfuras().quality).to.equal(80);
    })
  })

  describe('Backstage Passes', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(backstagePasses().sellIn).to.equal(14);
      inn.updateQuality();
      expect(backstagePasses().sellIn).to.equal(13);
    })
    it('should increase quality', function() {
      inn.updateQuality();
      expect(backstagePasses().quality).to.equal(21);
      inn.updateQuality();
      expect(backstagePasses().quality).to.equal(22);
    })
    it('should increase quality twice after sellIn reaches 10', function() {
      item = backstagePasses();
      moveToNthDayBeforeSellByDate(item, 11);
      inn.updateQuality();
      expect(item.quality).to.equal(27);
    })
    it('should increase quality thrice after sellIn reaches 5', function() {
      item = backstagePasses();
      moveToNthDayBeforeSellByDate(item, 6);
      inn.updateQuality();
      expect(item.quality).to.equal(38);
    })
    it('should lose all quality when sellIn reaches -1', function() {
      item = backstagePasses();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(0);
    })
    it('should never have a quality greater than 50', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.most(0);
    })
  })

  describe.skip('Conjured Mana Cake', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(conjuredManaCake().sellIn).to.equal(2);
      inn.updateQuality();
      expect(conjuredManaCake().sellIn).to.equal(1);
    })
    it('should decrease quality twice as fast', function() {
      inn.updateQuality();
      expect(conjuredManaCake().quality).to.equal(4);
      inn.updateQuality();
      expect(conjuredManaCake().quality).to.equal(2);
    })
    it('should decrease quality twice after sellIn reaches 0', function() {
      item = conjuredManaCake();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(0);
    })
    it('should never have a quality less than 0', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.least(0);
    })
  })

  describe.skip('Conjured Muffin', function() {
    it('should decrease sellIn', function() {
      inn.updateQuality();
      expect(conjuredMuffin().sellIn).to.equal(0);
    })
    it('should decrease quality twice as fast', function() {
      inn.updateQuality();
      expect(conjuredMuffin().quality).to.equal(3);
    })
    it('should decrease quality twice after sellIn reaches 0', function() {
      item = conjuredMuffin();
      moveToLastDayBeforeSellByDate(item);
      inn.updateQuality();
      expect(item.quality).to.equal(0);
    })
    it('should never have a quality less than 0', function() {
      makeALongTimePass();
      expect(item.quality).to.be.at.least(0);
    })
  })


  function makeALongTimePass() {
    for (var i = 0; i < 200; i++) {
      inn.updateQuality();
    }
  }

  function moveToLastDayBeforeSellByDate(item) {
    moveToNthDayBeforeSellByDate(item, 1);
  }

  function moveToNthDayBeforeSellByDate(item, n) {
    var limit = item.sellIn - n + 1;
    for (var i = 0; i < limit; i++) {
      inn.updateQuality();
    }
  }

  function dexterityVest() {
    return inn.items[DEXTERITY_VEST_IDX];
  }

  function brie() {
    return inn.items[BRIE_IDX];
  }

  function mangooseElixir() {
    return inn.items[MANGOOSE_ELIXIR_IDX];
  }

  function sulfuras() {
    return inn.items[SULFURAS_IDX];
  }

  function backstagePasses() {
    return inn.items[BACKSTAGE_PASSES_IDX];
  }

  function conjuredManaCake() {
    return inn.items[CONJURED_MANA_CAKE_IDX];
  }

  function conjuredMuffin() {
    return inn.items[CONJURED_MUFFIN_IDX];
  }
});