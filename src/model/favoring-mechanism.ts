import { type Accessor, createEffect, createSignal, untrack } from 'solid-js';
import * as localStorage from './local-storage';
import type { Alphabet } from './alphabet';
import { shuffle } from './utils';

type PointsTable = Record<string, number>;

const MULTIPLY_POINTS_RATE = 0.6;

export function createFavoringMechanism(alphabetAcc: Accessor<Alphabet>) {
  const [queue, setQueue] = createSignal<string[]>([]);
  const [table, setTable] = createSignal<PointsTable>({});
  const [symbol, setSymbol] = createSignal('');

  createEffect(() => {
    const alphabet = alphabetAcc();
    setTable(createPointsTable(alphabet, localStorage.getAllSymbols()));

    const [first, ...rest] = createShuffledQueue(alphabet, 3);
    untrack(() => {
      setQueue(rest);
      setSymbol(first);
    });
  });

  const success = (withHelp: boolean) => {
    const current = table()[symbol()];
    const points = getPoints(withHelp, current);

    setTable(table => ({ ...table, [symbol()]: current + points }));
    localStorage.updateSymbol(symbol(), current + points);

    const [first, rest] = getNextSymbols(queue(), table(), alphabetAcc());
    setSymbol(first);
    setQueue(rest);
  };

  const lose = () => {
    const current = table()[symbol()];
    const points = current > 3 ? 2 : 1;

    setTable(table => ({ ...table, [symbol()]: current - points }));
    localStorage.updateSymbol(symbol(), current - points);
  };

  return { table, symbol, success, lose, queue };
}

function getNextSymbols(queue: string[], pointsTable: PointsTable, alphabet: Alphabet) {
  if (queue.length <= 0) {
    const queue = createFilteredQueue(alphabet, pointsTable);

    const [first, ...rest] = shuffle(queue);
    return [first, rest] as const;
  }

  const [first, ...rest] = queue;
  return [first, rest] as const;
}

function createPointsTable(alphabet: Alphabet, fromLocalStorage: PointsTable) {
  return alphabet.getSymbols().reduce((table, symbol) => {
    const symbolValue = fromLocalStorage[symbol];

    return { ...table, [symbol]: symbolValue ?? 0 };
  }, {} as PointsTable);
}

function createShuffledQueue(alphabet: Alphabet, amount: number) {
  const array = Array(amount).fill(alphabet.getSymbolsBasedOnDifficulty()).flat();
  return shuffle(array) as string[];
}

function createFilteredQueue(alphabet: Alphabet, pointsTable: PointsTable) {
  const queue = createShuffledQueue(alphabet, 2);
  return queue.filter(symbol => pointsTable[symbol] <= 20);
}

function getPoints(withHelp: boolean, current: number) {
  if (withHelp) {
    return 0;
  }

  const points = current - current * MULTIPLY_POINTS_RATE;
  return current <= 5 ? 1 : Math.min(Math.floor(points), 5);
}
