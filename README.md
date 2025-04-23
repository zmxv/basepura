# Basepura

## Introduction

Basepura is an encoding scheme that converts integers into human-readable strings while preventing accidental offensive words in Latin alphabet languages. This npm package provides a dependency-free TypeScript implementation.

## Problem

Standard base-N encoding schemes (Base32, Base36, Base64 etc.) can inadvertently generate offensive substrings when creating public-facing identifiers. Crockford's Base32 partially addresses this but still permits problematic words like *twat* and *merde*. Removing vowels is insufficient as obscenities like *zmrd* (fucker in Czech/Slovak) and acronyms like *BDSM* remain possible. Digits also enable leetspeak variants (*sh1t*, *0rg4sm*).

## Solution

Basepura uses a carefully selected character set to minimize offensive word generation. The encoding has been verified against offensive terms in over 20 languages.

## Basepura character set
`BCDGHJKLNPQRSTWZbcdghjklnpqrstwz` (32 characters)

## Excluded characters

| Characters | Reason for exclusion |
|------------|----------------------|
| `A`, `a`   | `fag`, `twat`...     |
| `E`, `e`   | `sex`, `merde`...    |
| `F`, `f`   | `WTF`, `af`...       |
| `I`, `i`   | `clit`, `dick`...    |
| `M`, `m`   | `BDSM`, `zmrd`...    |
| `O`, `o`   | `homo`, `sodomy`...  |
| `U`, `u`   | `fuck`, `cunt`...    |
| `V`, `v`   | Resemble `U`, `u`    |
| `X`, `x`   | `xxx`, `shxt`...     |
| `Y`, `y`   | `dirty`, `doggy`...  |

## Installation

`npm i basepura`

## Usage

```javascript
import { encode, decode } from 'basepura';

// Encoding a bigint
const numberToEncode = 12345678901234567890n;
const encodedString = encode(numberToEncode);
console.log(`Encoded ${numberToEncode} to: ${encodedString}`);
// Encoded 12345678901234567890n to: QkjJPcgjcwDkd

// Decoding a string
const stringToDecode = 'QkjJPcgjcwDkd';
const decodedNumber = decode(stringToDecode);
console.log(`Decoded ${stringToDecode} to: ${decodedNumber}`); 
// Decoded QkjJPcgjcwDkd to: 12345678901234567890n

// Handling errors
try {
  decode('Invalid');
} catch (e) {
  console.error(e);
  // RangeError: Invalid character in input.
}

try {
  encode(-1n);
} catch (e) {
  console.error(e);
  // RangeError: Input must be a non-negative integer.
}
```


## License

MIT
