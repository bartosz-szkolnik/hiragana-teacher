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
type OtherCharacters = 'ん' | 'れ' | 'つんでれ' | 'くうでれ';

export type Hiragana =
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
  | OtherCharacters;

const HIRAGANA_TO_LATIN_MAP: { [K in Hiragana]: string } = {
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
  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'hu',
  へ: 'he',
  ほ: 'ho',
  ん: 'n',
  れ: 're',
  つんでれ: 'tsundere',
  くうでれ: 'kuudere',
};

export function getHiraganaArray() {
  return Object.keys(HIRAGANA_TO_LATIN_MAP) as Hiragana[];
}

export function mapHiraganaToLatin(symbol: Hiragana) {
  return HIRAGANA_TO_LATIN_MAP[symbol];
}
