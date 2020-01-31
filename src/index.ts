import { isPrime } from './utils';

/**
 * Generates Dobble card configurations.
 * @param {number} n - Total number of symbols available
 * @returns {Array} List of generated cards (which are lists of symbol indices)
 */
export const generate = (n: number): number[][] => {
  const deck: number[][] = [];

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
          (n - 1) * (k - 1) +
          (((i - 1) * (k - 1) + (j - 1))) % (n - 1)
        );
      }

      deck.push(card);
    }
  }

  return deck;
};

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
  if (n <= 0) {
    return 0;
  }

  for (let i = 1; i < n; i++) {
    if (getTotalSymbolCount(i) > n) {
      return i - 1;
    }
  }

  return 1;
};
