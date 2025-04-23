import { describe, it, expect } from 'vitest';
import { encode, decode } from './index';

describe('encode', () => {

  it('should encode small numbers', () => {
    expect(encode(0n)).toBe('B');
    expect(encode(1n)).toBe('C');
    expect(encode(2n)).toBe('D');
    expect(encode(3n)).toBe('G');
    expect(encode(4n)).toBe('H');
    expect(encode(5n)).toBe('J');
    expect(encode(6n)).toBe('K');
    expect(encode(7n)).toBe('L');
    expect(encode(8n)).toBe('N');
    expect(encode(9n)).toBe('P');
    expect(encode(10n)).toBe('Q');
    expect(encode(11n)).toBe('R');
    expect(encode(12n)).toBe('S');
    expect(encode(13n)).toBe('T');
    expect(encode(14n)).toBe('W');
    expect(encode(15n)).toBe('Z');
    expect(encode(16n)).toBe('b');
    expect(encode(17n)).toBe('c');
    expect(encode(18n)).toBe('d');
    expect(encode(19n)).toBe('g');
    expect(encode(20n)).toBe('h');
    expect(encode(21n)).toBe('j');
    expect(encode(22n)).toBe('k');
    expect(encode(23n)).toBe('l');
    expect(encode(24n)).toBe('n');
    expect(encode(25n)).toBe('p');
    expect(encode(26n)).toBe('q');
    expect(encode(27n)).toBe('r');
    expect(encode(28n)).toBe('s');
    expect(encode(29n)).toBe('t');
    expect(encode(30n)).toBe('w');
    expect(encode(31n)).toBe('z');
  });

  it('should encode larger numbers', () => {
    expect(encode(32n)).toBe('CB');
    expect(encode(32767n)).toBe('zzz');
    expect(encode(32768n)).toBe('CBBB');
    expect(encode(1234567890n)).toBe('CHpSBkd');
    expect(encode(0xffffffffffffffffn)).toBe('Zzzzzzzzzzzzz');
  });

  it('should throw an error for negative numbers', () => {
    expect(() => encode(-1n)).toThrow(RangeError);
  });
});

describe('decode', () => {
  it('should decode single characters', () => {
    expect(decode('B')).toBe(0n);
    expect(decode('C')).toBe(1n);
    expect(decode('D')).toBe(2n);
    expect(decode('G')).toBe(3n);
    expect(decode('H')).toBe(4n);
    expect(decode('J')).toBe(5n);
    expect(decode('K')).toBe(6n);
    expect(decode('L')).toBe(7n);
    expect(decode('N')).toBe(8n);
    expect(decode('P')).toBe(9n);
    expect(decode('Q')).toBe(10n);
    expect(decode('R')).toBe(11n);
    expect(decode('S')).toBe(12n);
    expect(decode('T')).toBe(13n);
    expect(decode('W')).toBe(14n);
    expect(decode('Z')).toBe(15n);
    expect(decode('b')).toBe(16n);
    expect(decode('c')).toBe(17n);
    expect(decode('d')).toBe(18n);
    expect(decode('g')).toBe(19n);
    expect(decode('h')).toBe(20n);
    expect(decode('j')).toBe(21n);
    expect(decode('k')).toBe(22n);
    expect(decode('l')).toBe(23n);
    expect(decode('n')).toBe(24n);
    expect(decode('p')).toBe(25n);
    expect(decode('q')).toBe(26n);
    expect(decode('r')).toBe(27n);
    expect(decode('s')).toBe(28n);
    expect(decode('t')).toBe(29n);
    expect(decode('w')).toBe(30n);
    expect(decode('z')).toBe(31n);
  });

  it('should decode multi-character strings', () => {
    expect(decode('CB')).toBe(32n);
    expect(decode('zzz')).toBe(32767n);
    expect(decode('CBBB')).toBe(32768n);
    expect(decode('CHpSBkd')).toBe(1234567890n);
    expect(decode('Zzzzzzzzzzzzz')).toBe(0xffffffffffffffffn);
  });

  it('should throw an error for empty strings', () => {
    expect(() => decode('')).toThrow(RangeError);
  });

  it('should throw an error for invalid characters', () => {
    expect(() => decode('1')).toThrow(RangeError);
    expect(() => decode('0')).toThrow(RangeError);
    expect(() => decode('O')).toThrow(RangeError);
    expect(() => decode('I')).toThrow(RangeError);
    expect(() => decode('U')).toThrow(RangeError);
    expect(() => decode('V')).toThrow(RangeError);
    expect(() => decode('a')).toThrow(RangeError);
    expect(() => decode('e')).toThrow(RangeError);
    expect(() => decode(' www')).toThrow(RangeError);
    expect(() => decode('zzz ')).toThrow(RangeError);
    expect(() => decode('tst-strng')).toThrow(RangeError);
    expect(() => decode('什么鬼')).toThrow(RangeError);
  });
});
