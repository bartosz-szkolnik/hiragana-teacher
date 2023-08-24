import { Alphabet } from './alphabet';

type SingleCharacters = 'ア' | 'イ' | 'ウ' | 'エ' | 'オ';
type K_Characters = 'カ' | 'キ' | 'ク' | 'ケ' | 'コ';

export type KatakanaChar = SingleCharacters | K_Characters;

export class Katakana implements Alphabet<KatakanaChar> {
  private readonly symbols = Object.keys(KATAKANA_TO_LATIN_MAP) as KatakanaChar[];
  private readonly translations = KATAKANA_TO_LATIN_MAP;

  getSymbols() {
    return [...this.symbols];
  }

  getSymbolsBasedOnDifficulty() {
    return this.getSymbols();
  }

  translate(symbol: string) {
    return this.translations[symbol as KatakanaChar];
  }

  toLatin(latin: string) {
    const [found] = this.symbols.find(([, value]) => value === latin) ?? [];
    return found!;
  }
}

const KATAKANA_TO_LATIN_MAP: { [K in KatakanaChar]: string } = {
  ア: 'a',
  イ: 'i',
  ウ: 'u',
  エ: 'e',
  オ: 'o',
  カ: 'ka',
  キ: 'ki',
  ク: 'ku',
  ケ: 'ke',
  コ: 'ko',
};

export const KATAKANA_ARRAY = Object.keys(KATAKANA_TO_LATIN_MAP) as KatakanaChar[];
