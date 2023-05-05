import type { Difficulty } from '../domain/DifficultySelector';
import { getHiraganaArray } from './hiragana';

type LocalStorage = {
  difficulty: Difficulty;
  symbols: string;
};

export function updateSymbol(symbol: string, value: number) {
  const item = localStorage.getItem('symbols') as LocalStorage['symbols'];
  if (!item) {
    setupInitialSymbols();
  }

  const table = fromString(localStorage.getItem('symbols') as LocalStorage['symbols']);
  const updated = { ...table, [symbol]: value };
  console.log(updated);
  localStorage.setItem('symbols', toString(updated));
}

export function getDifficulty(): Difficulty {
  const item = localStorage.getItem('difficulty') as Difficulty | null;

  if (!item) {
    setDifficulty('easy');
  }

  return item ?? ('easy' as const);
}

export function setDifficulty(value: Difficulty) {
  localStorage.setItem('difficulty', value);
}

export function getAllSymbols() {
  const item = localStorage.getItem('symbols') as LocalStorage['symbols'] | null;
  if (!item) {
    setupInitialSymbols();
  }

  return fromString(item || '') ?? getHiraganaArray();
}

export function clear() {
  localStorage.clear();
}

function toString(symbols: Record<string, number>): LocalStorage['symbols'] {
  return Object.entries(symbols)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

function fromString(item: string) {
  return item
    .split(';')
    .map(values => values.split(':'))
    .reduce((prev, [key, value]) => ({ ...prev, [key]: Number(value) }), {} as Record<string, number>);
}

function setupInitialSymbols() {
  const symbols = getHiraganaArray().reduce((p, c) => ({ ...p, [c]: 0 }), {} as Record<string, number>);
  localStorage.setItem('symbols', toString(symbols));
}
