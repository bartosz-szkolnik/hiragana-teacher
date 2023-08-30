import { type Accessor, createEffect, createSignal, untrack } from 'solid-js';
import * as localStorage from './local-storage';
import type { Alphabet, SymbolChar } from './alphabet';
import { shuffle } from './utils';

export type Queue = SymbolChar[];
export type PointsList = Record<SymbolChar, number>;

const MULTIPLY_POINTS_RATE = 0.6;

export function createFavoringMechanism(alphabetAcc: Accessor<Alphabet>) {
  const [queue, setQueue] = createSignal<Queue>([]);
  const [list, setList] = createSignal({} as PointsList);
  const [symbol, setSymbol] = createSignal<SymbolChar>('');

  createEffect(() => {
    const alphabet = alphabetAcc();
    setList(createPointsList(alphabet));

    const [first, ...rest] = createShuffledQueue(alphabet, 3);
    untrack(() => {
      setQueue(rest);
      setSymbol(first);
    });
  });

  const success = (withHelp = false) => {
    const current = list()[symbol()];
    const points = getPoints(withHelp, current);

    setList(list => ({ ...list, [symbol()]: current + points }));
    localStorage.updateSymbol(symbol(), current + points);

    const [first, rest] = getNextSymbols(queue(), list(), alphabetAcc());
    setSymbol(first);
    setQueue(rest);
  };

  const lose = () => {
    const current = list()[symbol()];
    const points = current > 3 ? 2 : 1;

    setList(list => ({ ...list, [symbol()]: current - points }));
    localStorage.updateSymbol(symbol(), current - points);
  };

  return { list, symbol, success, lose, queue };
}

function getNextSymbols(queue: Queue, pointsList: PointsList, alphabet: Alphabet) {
  if (queue.length <= 0) {
    const queue = createFilteredQueue(alphabet, pointsList);

    const [first, ...rest] = shuffle(queue);
    return [first, rest] as const;
  }

  const [first, ...rest] = queue;
  return [first, rest] as const;
}

function createPointsList(alphabet: Alphabet) {
  const localData = localStorage.getAllSymbols() as PointsList | null;

  return alphabet.getSymbols().reduce((list, symbol) => {
    const symbolValue = localData?.[symbol] ?? 0;

    return { ...list, [symbol]: symbolValue };
  }, {} as PointsList);
}

function createShuffledQueue(alphabet: Alphabet, amount: number) {
  const array = Array(amount).fill(alphabet.getSymbolsBasedOnDifficulty()).flat();
  return shuffle(array) as Queue;
}

function createFilteredQueue(alphabet: Alphabet, pointsList: PointsList) {
  const queue = createShuffledQueue(alphabet, 2);
  return queue.filter(symbol => pointsList[symbol] <= 20);
}

function getPoints(withHelp: boolean, current: number) {
  if (withHelp) {
    return 0;
  }

  const points = current - current * MULTIPLY_POINTS_RATE;
  return current <= 5 ? 1 : Math.min(Math.floor(points), 5);
}
