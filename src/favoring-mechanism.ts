import { Accessor, createEffect, createSignal, untrack } from 'solid-js';

type PointsTable = Record<string, number>;
let lastSymbol: string | null = null;

export function createFavoringMechanism(symbolsArray: Accessor<string[]>) {
  const initial = createPointsTable(symbolsArray());
  const [table, setTable] = createSignal<PointsTable>(initial);
  const [symbol, setSymbol] = createSignal<string>('');

  createEffect(() => {
    setTable(createPointsTable(symbolsArray()));
    untrack(() => setSymbol(getSymbolBasedOnPoints(table())));
  });

  const success = (withHelp: boolean) => {
    setTable(table => ({ ...table, [symbol()]: table[symbol()] + (withHelp ? 0 : 1) }));
    setSymbol(getSymbolBasedOnPoints(table()));
  };

  const lose = () => {
    setTable(table => ({ ...table, [symbol()]: table[symbol()] - 1 }));
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
