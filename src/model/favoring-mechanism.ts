import { Accessor, createEffect, createSignal, untrack } from 'solid-js';

type PointsTable = Record<string, number>;
let lastSymbol: string | null = null;

export function createFavoringMechanism(symbolsArray: Accessor<string[]>) {
  const [table, setTable] = createSignal({} as PointsTable);
  const [symbol, setSymbol] = createSignal('');

  createEffect(() => {
    setTable(createPointsTable(symbolsArray()));
    untrack(() => setSymbol(getSymbolBasedOnPoints(table())));
  });

  const success = (withHelp: boolean) => {
    const current = table()[symbol()];
    const points = current + (withHelp ? 0 : 1 + Math.round(current * 0.3));
    setTable(table => ({ ...table, [symbol()]: points }));
    setSymbol(getSymbolBasedOnPoints(table()));
  };

  const lose = () => {
    const current = table()[symbol()];
    const points = current - (1 + Math.round(current * 0.3));
    setTable(table => ({ ...table, [symbol()]: points }));
  };

  return { table, symbol, success, lose };
}

function getSymbolBasedOnPoints(pointsTable: PointsTable): string {
  const entries = Object.entries(pointsTable);

  const shouldGetRandomSymbol = Math.random() > 0.8;
  if (shouldGetRandomSymbol) {
    return getRandomSymbolFrom(Object.keys(pointsTable));
  }

  const leastPointedFive = [...entries].sort(([, a], [, b]) => a - b).slice(0, 5);
  const symbols = Object.keys(Object.fromEntries(leastPointedFive));
  return getRandomSymbolFrom(symbols);
}

function getRandomSymbolFrom(array: string[]) {
  let symbol: string | null = null;

  do {
    const index = Math.floor(Math.random() * array.length);
    symbol = array.at(index)!;
  } while (symbol === lastSymbol);

  lastSymbol = symbol;
  return symbol;
}

function createPointsTable(symbolsArray: string[]) {
  return symbolsArray.reduce((p, c) => ({ ...p, [c]: 0 }), {} as PointsTable);
}
