export const CHARS = "BCDGHJKLNPQRSTWZbcdghjklnpqrstwz";

const BASE = BigInt(CHARS.length);

/**
 * Encodes a non-negative bigint into a Basepura string.
 * 
 * @param n - A non-negative bigint to encode
 * @returns A Basepura string representation of the input number
 * @throws {RangeError} If the input is negative
 */
export function encode(n: bigint): string {
  if (n < 0n) {
    throw new RangeError("Input must be a non-negative integer.");
  }
  if (n === 0n) {
    return CHARS[0];
  }

  let result = "";
  while (n > 0n) {
    result = CHARS[Number(n % BASE)] + result;
    n /= BASE;
  }
  return result;
}

/**
 * Decodes a Basepura string into a bigint.
 * 
 * @param s - A Basepura string to decode
 * @returns The decoded bigint value
 * @throws {RangeError} If the input is empty or contains invalid characters
 */
export function decode(s: string): bigint {
  if (s.length === 0) {
    throw new RangeError("Input must not be empty.");
  }

  let result = 0n;
  for (let i = 0; i < s.length; i++) {
    const index = CHARS.indexOf(s[i]);
    if (index < 0) {
      throw new RangeError("Invalid character in input.");
    }
    result = result * BASE + BigInt(index);
  }
  return result;
}
