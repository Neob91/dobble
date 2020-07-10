import { isPrime } from './utils';

/**
 * Generates Dobble card configurations.
 * @param {number} n - Number of symbols per card
 * @param {boolean} [checkSanity=true] - Whether to run a sanity check on results
 * @returns {Array<number[]>} List of generated cards (which are lists of symbol indices)
 */
export const generate = (n: number, checkSanity = true): number[][] => {
  const deck: number[][] = [];

  if (!isCardSymbolCountValid(n)) {
    throw new Error('Symbol count per card is invalid.');
  }

  for (let i = 0; i < n; i++) {
    const card: number[] = [0];

    for (let j = 1; j < n; j++) {
      card.push((n - 1) * i + j);
    }

    deck.push(card);
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      const card: number[] = [i];

      for (let k = 1; k < n; k++) {
        card.push(
          n + (n - 1) * (k - 1) +
          (((i - 1) * (k - 1) + (j - 1))) % (n - 1)
        );
      }

      deck.push(card);
    }
  }

  if (checkSanity && !checkDeckSanity(deck)) {
    throw new Error('Deck is invalid!');
  }

  return deck;
};

/**
 * Returns whether the count of symbols per card is valid. It has to be a prime number + 1.
 * @param {number} n - Desired number of symbols per card
 * @returns {boolean}
 */
export const isCardSymbolCountValid = (n: number): boolean => isPrime(n - 1);

/**
 * Returns the total number of symbols needed to provide n symbols per card.
 * @param {number} n - Desired number of symbols per card
 * @returns {number} Total number of symbols needed
 */
export const getTotalSymbolCount = (n: number) => (n + (n - 1) * (n - 1));

/**
 * Returns the number of symbols per card that can be generated with n total symbols.
 * @param {number} n - Total number of symbols
 * @returns {number} Number of symbols per card
 */
export const getCardSymbolCount = (n: number) => {
  const validCardCounts = [];

  if (n <= 0) {
    return 0;
  }

  for (let i = 1; i < n; i++) {
    if (getTotalSymbolCount(i) > n) {
      if (!validCardCounts.length) {
        break;
      }

      return validCardCounts[0];
    }

    if (isCardSymbolCountValid(i)) {
      validCardCounts.unshift(i);
    }
  }

  return 1;
};

/**
 * Returns whether each card has exactly 1 symbol in common with any other card.
 * @param {Array<number[]>} deck - Value returned from generate
 * @returns {boolean}
 */
export const checkDeckSanity = (deck: number[][]): boolean => {
  const allSymbols = new Set();
  const matchedSymbols = new Set();
  const uniqueCounts = new Set();

  for (let i = 0; i < deck.length; i++) {
    allSymbols.add(deck[i]);
    uniqueCounts.add(new Set(deck[i]).size);

    for (let j = 0; j < deck.length; j++) {
      if (i === j) {
        continue;
      }

      const common = deck[i].filter(s => deck[j].indexOf(s) !== -1);
      if (common.length !== 1) {
        return false;
      }

      matchedSymbols.add(common[0]);
    }
  }

  // We're checking that all symbols have a match somewhere
  // and that all cards have the same correct number of unique symbols
  return (
    allSymbols.size === matchedSymbols.size &&
    uniqueCounts.size === 1 &&
    uniqueCounts.has(getCardSymbolCount(allSymbols.size))
  )
};
