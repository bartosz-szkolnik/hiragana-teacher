export type Hiragana =
  | 'あ'
  | 'い'
  | 'う'
  | 'え'
  | 'お'
  | 'か'
  | 'き'
  | 'く'
  | 'け'
  | 'こ'
  | 'さ'
  | 'し'
  | 'す'
  | 'せ'
  | 'そ';

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
  さ: 'sa',
  し: 'shi',
  す: 'su',
  せ: 'se',
  そ: 'so',
};

export function getHiraganaArray() {
  return Object.keys(HIRAGANA_TO_LATIN_MAP) as Hiragana[];
}

export function hiraganaToLatin(symbol: Hiragana) {
  return HIRAGANA_TO_LATIN_MAP[symbol];
}
