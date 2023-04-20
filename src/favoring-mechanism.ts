import { createSignal } from 'solid-js';
import { Hiragana } from './model/hiragana';

type PointsTable = Record<Hiragana, number>;
let lastSymbol: Hiragana | null = null;

export function createFavoringMechanism(symbolsArray: Hiragana[]) {
  const [pointsTable, addPoints, removePoints] = createPointsTable(symbolsArray);
  const [symbol, setSymbol] = createSignal(getSymbolBasedOnPoints(pointsTable()));

  const success = () => {
    addPoints(symbol());
    setSymbol(getSymbolBasedOnPoints(pointsTable()));
  };

  const lose = () => {
    removePoints(symbol());
  };

  return [symbol, success, lose, pointsTable] as const;
}

function getSymbolBasedOnPoints(pointsTable: PointsTable) {
  const entries = Object.entries(pointsTable) as [Hiragana, number][];

  const shouldGetRandomSymbol = Math.random() > 0.8;
  if (shouldGetRandomSymbol) {
    return getRandomSymbolFrom(Object.keys(pointsTable) as Hiragana[]);
  }

  const leastPointedFive = [...entries].sort(([, a], [, b]) => a - b).slice(0, 5);
  const symbols = Object.keys(Object.fromEntries(leastPointedFive)) as Hiragana[];
  return getRandomSymbolFrom(symbols);
}

function getRandomSymbolFrom(array: Hiragana[]) {
  let symbol: Hiragana | null = null;

  do {
    const index = Math.floor(Math.random() * array.length);
    symbol = array.at(index)!;
  } while (symbol === lastSymbol);

  lastSymbol = symbol;
  return symbol;
}

function createPointsTable(symbolsArray: Hiragana[]) {
  const initial = symbolsArray.reduce((p, c) => ({ ...p, [c]: 0 }), {} as PointsTable);
  const [table, setTable] = createSignal(initial);

  function addPoints(symbol: Hiragana) {
    const value = table()[symbol] + 1;
    setTable({ ...table(), [symbol]: value });
  }

  function removePoints(symbol: Hiragana) {
    const value = table()[symbol] - 1;
    setTable({ ...table(), [symbol]: value });
  }

  return [table, addPoints, removePoints] as const;
}
