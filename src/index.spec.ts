import { expect } from 'chai';

import { checkDeckSanity, generate, getCardSymbolCount, getTotalSymbolCount, isCardSymbolCountValid } from '.';

describe('generate', () => {
  it('generates a valid deck', () => {
    const deck = generate(8);

    expect(deck).to.have.length(57);
    expect(checkDeckSanity(deck)).to.be.true;
  });
});

describe('isCardSymbolCountValid', () => {
  it('returns false for invalid symbol count per card', () => {
    expect(isCardSymbolCountValid(5)).to.be.false;
    expect(isCardSymbolCountValid(7)).to.be.false;
    expect(isCardSymbolCountValid(9)).to.be.false;
    expect(isCardSymbolCountValid(10)).to.be.false;
    expect(isCardSymbolCountValid(11)).to.be.false;
    expect(isCardSymbolCountValid(13)).to.be.false;
  });

  it('returns true for valid symbol count per card', () => {
    expect(isCardSymbolCountValid(2)).to.be.true;
    expect(isCardSymbolCountValid(3)).to.be.true;
    expect(isCardSymbolCountValid(4)).to.be.true;
    expect(isCardSymbolCountValid(6)).to.be.true;
    expect(isCardSymbolCountValid(8)).to.be.true;
    expect(isCardSymbolCountValid(12)).to.be.true;
  });
});

describe('getTotalSymbolCount', () => {
  it('returns a valid number', () => {
    expect(getTotalSymbolCount(4)).to.equal(13);
    expect(getTotalSymbolCount(6)).to.equal(31);
    expect(getTotalSymbolCount(8)).to.equal(57);
  });
});

describe('getCardSymbolCount', () => {
  it('returns a valid number for exact total symbol counts', () => {
    expect(getCardSymbolCount(13)).to.equal(4);
    expect(getCardSymbolCount(31)).to.equal(6);
    expect(getCardSymbolCount(57)).to.equal(8);
  });

  it('returns a valid number for inexact total symbol counts', () => {
    expect(getCardSymbolCount(16)).to.equal(4);
    expect(getCardSymbolCount(35)).to.equal(6);
    expect(getCardSymbolCount(80)).to.equal(8);
  });
});

describe('checkDeckSanity', () => {
  it('returns true for a valid deck of cards', () => {
    const deck = [
      [ 0, 1, 2 ],
      [ 0, 3, 4 ],
      [ 0, 5, 6 ],
      [ 1, 3, 5 ],
      [ 1, 4, 6 ],
      [ 2, 3, 6 ],
      [ 2, 4, 5 ]
    ];

    expect(checkDeckSanity(deck)).to.be.true;
  });

  it('returns false for a deck with multiple repeating symbols', () => {
    const deck = [
      [ 0, 1, 2 ], // 0, 2 repeating with the card below
      [ 0, 2, 4 ],
      [ 0, 5, 6 ],
      [ 1, 3, 5 ],
      [ 1, 4, 6 ],
      [ 2, 3, 6 ],
      [ 2, 4, 5 ]
    ];

    expect(checkDeckSanity(deck)).to.be.false;
  });

  it('returns false for a deck where some symbols never match', () => {
    const deck = [
      [ 0, 1, 2 ],
      [ 0, 3, 4 ], // 4 never matches
      [ 0, 5, 6 ],
      [ 1, 3, 5 ],
      [ 2, 3, 6 ],
    ];

    expect(checkDeckSanity(deck)).to.be.false;
  });
});
