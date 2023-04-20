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
  | 'そ'
  | 'た'
  | 'ち'
  | 'つ'
  | 'て'
  | 'と'
  | 'ん'
  | 'で'
  | 'れ'
  | 'つんでれ'
  | 'くうでれ';

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
  た: 'ta',
  ち: 'chi',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  ん: 'n',
  で: 'de',
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
