import { useSettings } from '../domain/Settings';
import type { Alphabet } from './alphabet';

type SingleCharacters = 'あ' | 'い' | 'う' | 'え' | 'お';
type K_Characters = 'か' | 'き' | 'く' | 'け' | 'こ';
type G_Characters = 'が' | 'ぎ' | 'ぐ' | 'げ' | 'ご';
type S_Characters = 'さ' | 'し' | 'す' | 'せ' | 'そ';
type Z_Characters = 'ざ' | 'じ' | 'ず' | 'ぜ' | 'ぞ';
type T_Chatacters = 'た' | 'ち' | 'つ' | 'て' | 'と';
type D_Characters = 'だ' | 'ぢ' | 'づ' | 'で' | 'ど';
type N_Characters = 'な' | 'に' | 'ぬ' | 'ね' | 'の';
type H_Characters = 'は' | 'ひ' | 'ふ' | 'へ' | 'ほ';
type B_Characters = 'ば' | 'び' | 'ぶ' | 'べ' | 'ぼ';
type P_Characters = 'ぱ' | 'ぴ' | 'ぷ' | 'ぺ' | 'ぽ';
type M_Characters = 'ま' | 'み' | 'む' | 'め' | 'も';
type Y_Characters = 'や' | 'ゆ' | 'よ';
type R_Characters = 'ら' | 'り' | 'る' | 'れ' | 'ろ';
type W_Characters = 'わ' | 'ゐ' | 'ゑ' | 'を';
type OtherCharacters = 'ん' | 'つんでれ' | 'くうでれ';

export type HiraganaChar =
  | SingleCharacters
  | K_Characters
  | G_Characters
  | S_Characters
  | Z_Characters
  | T_Chatacters
  | D_Characters
  | N_Characters
  | H_Characters
  | B_Characters
  | P_Characters
  | M_Characters
  | Y_Characters
  | R_Characters
  | W_Characters
  | OtherCharacters;

export class Hiragana implements Alphabet<HiraganaChar> {
  private readonly symbols = Object.keys(HIRAGANA_TO_LATIN_MAP) as HiraganaChar[];
  private readonly translations = HIRAGANA_TO_LATIN_MAP;

  getSymbols() {
    return [...this.symbols];
  }

  getSymbolsBasedOnDifficulty() {
    const settings = useSettings();
    const array = this.getSymbols();

    switch (settings.difficulty()) {
      case 'easy':
        return array.slice(0, 20);

      case 'medium':
        return array.slice(20, 40);

      case 'hard':
        return array.slice(40, 55);

      case 'very-hard':
        return array.slice(40);

      case 'all-characters':
        return array;
    }
  }

  translate(symbol: HiraganaChar) {
    return this.translations[symbol];
  }

  toLatin(latin: string) {
    const [found] = this.symbols.find(([, value]) => value === latin) ?? [];
    return found!;
  }
}

const HIRAGANA_TO_LATIN_MAP: { [K in HiraganaChar]: string } = {
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  さ: 'sa',
  し: 'shi',
  す: 'su',
  せ: 'se',
  そ: 'so',
  ざ: 'za',
  じ: 'ji',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  た: 'ta',
  ち: 'chi',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  だ: 'da',
  ぢ: 'ji',
  づ: 'zu',
  で: 'de',
  ど: 'do',
  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'fu',
  へ: 'he',
  ほ: 'ho',
  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  わ: 'wa',
  ゐ: 'wi',
  ゑ: 'we',
  を: 'wo',
  ん: 'n',
  つんでれ: 'tsundere',
  くうでれ: 'kuudere',
};

export const HIRAGANA_ARRAY = Object.keys(HIRAGANA_TO_LATIN_MAP) as HiraganaChar[];
