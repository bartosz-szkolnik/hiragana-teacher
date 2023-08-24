import { HiraganaChar } from './hiragana';
import { KatakanaChar } from './katakana';

export type SymbolChar = HiraganaChar | KatakanaChar;

export interface Alphabet<T extends string = string> {
  getSymbols: () => T[];
  getSymbolsBasedOnDifficulty: () => T[];
  translate: (symbol: T) => string;
}
