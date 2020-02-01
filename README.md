# Dobble &middot; [![](https://img.shields.io/npm/v/dobble?style=flat-square)](https://www.npmjs.com/package/dobble) ![](https://img.shields.io/npm/dm/dobble?style=flat-square)

### Description

A set of helper utilites for symbol configurations of the Dobble card game

### API documentation

#### `generate(n, checkSanity)`

Generates Dobble card configurations.

**Parameters**

*`n`* `{number}` Number of symbols per card

*`[checkSanity=true]`* `{boolean}` Whether to run a sanity check on results

**Returns**

&nbsp;&nbsp;&nbsp;&nbsp;`{Array.<Array.<number>>}` List of generated cards (which are lists of symbol indices)

**Example**

```js
> import { generate } from 'dobble';
> generate(3)
[ [ 0, 1, 2 ],
  [ 0, 3, 4 ],
  [ 0, 5, 6 ],
  [ 1, 3, 5 ],
  [ 1, 4, 6 ],
  [ 2, 3, 6 ],
  [ 2, 4, 5 ] ]
```


#### `isCardSymbolCountValid(n)`

Returns whether the count of symbols per card is valid. It has to be a prime number + 1.

**Parameters**

*`n`* `{number}` Desired number of symbols per card

**Returns**

&nbsp;&nbsp;&nbsp;&nbsp;`{boolean}`

**Example**

```js
> const { isCardSymbolCountValid } = require('dobble');
> isCardSymbolCountValid(8)
true
> isCardSymbolCountValid(9)
false
```


#### `getTotalSymbolCount(n)`

Returns the total number of symbols needed to provide n symbols per card.

**Parameters**

*`n`* `{number}` Desired number of symbols per card

**Returns**

&nbsp;&nbsp;&nbsp;&nbsp;`{number}` Total number of symbols needed

**Example**

```js
> import { getTotalSymbolCount } from 'dobble';
> getTotalSymbolCount(8);
57
```


#### `getCardSymbolCount(n)`

Returns the number of symbols per card that can be generated with n total symbols.

**Parameters**

*`n`* `{number}` Total number of symbols

**Returns**

&nbsp;&nbsp;&nbsp;&nbsp;`{number}` Number of symbols per card

**Example**

```js
> import { getCardSymbolCount } from 'dobble';
> getCardSymbolCount(57);
8
```


#### `checkDeckSanity(deck)`

Returns whether each card has exactly 1 symbol in common with any other card.

**Parameters**

*`deck`* `{Array.<Array.<number>>}` Value returned from `generate`

**Returns**

&nbsp;&nbsp;&nbsp;&nbsp;`{boolean}`

**Example**

```js
> import { checkDeckSanity } from 'dobble';
> checkDeckSanity([
  [ 0, 1, 2 ],
  [ 0, 3, 4 ],
  [ 0, 5, 6 ],
  [ 1, 3, 5 ],
  [ 1, 4, 6 ],
  [ 2, 3, 6 ],
  [ 2, 4, 5 ]
]);
true
> checkDeckSanity([
  [0, 1, 2],
  [0, 1, 3]
]);
false
```
