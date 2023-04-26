import { TranslationMode } from './TranslationModeSelector';
import {
  Hiragana,
  getHiraganaArray,
  getLatinArray,
  translateHiraganaToLatin,
  translateLatinToHiragana,
} from './model/hiragana';
import { Latin } from './model/latin';

export function translate(to: TranslationMode, what: string) {
  if (to === 'to-latin') {
    return translateHiraganaToLatin(what as Hiragana);
  }

  return translateLatinToHiragana(what as Latin);
}

export function getSymbolsArray(translationMode: TranslationMode) {
  if (translationMode === 'to-latin') {
    return getHiraganaArray();
  }

  return getLatinArray();
}
