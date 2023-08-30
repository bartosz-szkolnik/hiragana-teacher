import { HiraganaChar } from './hiragana';
import { KatakanaChar } from './katakana';

export type SymbolChar = HiraganaChar | KatakanaChar | (string & {});

export interface Alphabet<T = any> {
  getSymbols: () => T[];
  getSymbolsBasedOnDifficulty: () => T[];
  translate: (symbol: T) => string;
}
