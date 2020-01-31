# Dobble &middot; [![](https://img.shields.io/npm/v/dobble?style=flat-square)](https://www.npmjs.com/package/dobble) ![](https://img.shields.io/npm/dm/dobble?style=flat-square)

A set of helper utilites for symbol configurations of the Dobble card game

### Examples

#### Generating a deck of cards

To generate a deck of cards, call `generate(n)` with `n` equal to the total number of symbols available. The method returns an array of cards, where each card is an array of numbers (each number being an index of a symbol).

```js
import { generate } from 'dobble';

generate(3)
// Output:
// [ [ 0, 1, 2 ],
//   [ 0, 3, 4 ],
//   [ 0, 5, 6 ],
//   [ 1, 0, 2 ],
//   [ 1, 1, 3 ],
//   [ 2, 0, 3 ],
//   [ 2, 1, 2 ] ]
```

#### Getting the number of total required symbols

To get the number of symbols required to have `n` symbols on each card, call `getTotalSymbolCount(n)`.

```js
import { getTotalSymbolCount } from 'dobble';

getTotalSymbolCount(8);
// Output
// 57
```

#### Getting the number of symbols per card

To get the number of symbols per card, given `n` total symbols, call `getCardSymbolCount(n)`.

```js
import { getCardSymbolCount } from 'dobble';

getCardSymbolCount(57);
// Output
// 8
```
