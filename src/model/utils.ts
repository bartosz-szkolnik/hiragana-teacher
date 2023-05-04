import { Difficulty } from '../domain/DifficultySelector';
import { TranslationMode } from '../domain/TranslationModeSelector';
import {
  Hiragana,
  getHiraganaArray,
  getLatinArray,
  translateHiraganaToLatin,
  translateLatinToHiragana,
} from './hiragana';
import { Latin } from './latin';

export function translate(to: TranslationMode, what: string) {
  if (to === 'to-latin') {
    return translateHiraganaToLatin(what as Hiragana);
  }

  return translateLatinToHiragana(what as Latin);
}

export function getSymbolsArray(translationMode: TranslationMode, difficulty: Difficulty) {
  if (translationMode === 'from-latin') {
    return getLatinArray();
  }

  const hiraganaArray = getHiraganaArray();

  switch (difficulty) {
    case 'easy':
      return hiraganaArray.slice(0, 10);

    case 'medium':
      return hiraganaArray.slice(10, 20);

    case 'hard':
      return hiraganaArray.slice(20, 40);

    case 'very-hard':
      return hiraganaArray.slice(15, 55);

    case 'all-characters':
      return hiraganaArray;
  }
}
