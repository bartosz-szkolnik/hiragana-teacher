export interface Alphabet<T extends string = string> {
  getSymbols: () => T[];
  getSymbolsBasedOnDifficulty: () => T[];
  translate: (symbol: T) => string;
}
