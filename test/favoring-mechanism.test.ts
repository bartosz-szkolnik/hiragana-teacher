import { describe, expect, it, vitest } from 'vitest';
import { createFavoringMechanism } from '../src/model/favoring-mechanism';
import { HiraganaChar } from '../src/model/hiragana';
import { Alphabet, SymbolChar } from '../src/model/alphabet';

vitest.mock('../src/model/utils.ts', () => ({
  shuffle: (array: unknown[]) => array,
}));

vitest.mock('../src/model/local-storage.ts', () => ({
  updateSymbol: () => {},
  getDifficulty: () => 'easy',
  setDifficulty: () => {},
  getAllSymbols: () => null,
  clear: () => {},
}));

const HIRAGANA_ARRAY = ['あ', 'い', 'う', 'え', 'お'] satisfies HiraganaChar[];

class TestAlphabet implements Alphabet<SymbolChar> {
  constructor(private readonly symbols = HIRAGANA_ARRAY) {}

  getSymbols() {
    return this.symbols;
  }

  getSymbolsBasedOnDifficulty() {
    return this.symbols;
  }

  translate() {
    return '';
  }
}

describe('favoring-mechanism', () => {
  it('should contain initial data', () => {
    const alphabet = new TestAlphabet();

    const { queue, symbol } = createFavoringMechanism(() => alphabet);
    const q = queue();
    const s = symbol();

    expect(s).toBe('あ');
    expect(q).toStrictEqual(['い', 'う', 'え', 'お', ...HIRAGANA_ARRAY, ...HIRAGANA_ARRAY]);
  });

  it('should create new queue when the initial one is emptied', () => {
    const alphabet = new TestAlphabet();
    const { queue, symbol, success } = createFavoringMechanism(() => alphabet);

    expect(symbol()).toBe('あ');
    expect(queue()).toHaveLength(14);

    Array(14)
      .fill(null)
      .forEach(() => {
        const nextSymbol = queue()[0];
        const length = queue().length;

        success();

        expect(symbol()).toBe(nextSymbol);
        expect(queue()).toHaveLength(length - 1);
      });

    success();
    expect(symbol()).toBe('あ');
    expect(queue()).toHaveLength(9);
  });

  it('should give points for successes', () => {
    const alphabet = new TestAlphabet(['あ']);
    const { success, list } = createFavoringMechanism(() => alphabet);

    expect(list()['あ']).toEqual(0);
    success();
    expect(list()['あ']).toEqual(1);
    success();
    expect(list()['あ']).toEqual(2);
    success();
    expect(list()['あ']).toEqual(3);
    success();
    expect(list()['あ']).toEqual(4);
    success();
    expect(list()['あ']).toEqual(5);
    success();
    expect(list()['あ']).toEqual(6);
    success();
    expect(list()['あ']).toEqual(8); // if there's more than 5 points, more points will be awarded, based on the multiply rate
    success();
    expect(list()['あ']).toEqual(11);
    success();
    expect(list()['あ']).toEqual(15);
    success();
    expect(list()['あ']).toEqual(20);
  });

  it('should not give points for successes with help', () => {
    const alphabet = new TestAlphabet(['あ']);
    const { success, list } = createFavoringMechanism(() => alphabet);

    expect(list()['あ']).toEqual(0);
    success();
    expect(list()['あ']).toEqual(1);
    success(true);
    expect(list()['あ']).toEqual(1);
  });

  it('should remove points for losses', () => {
    const alphabet = new TestAlphabet(['あ']);
    const { success, list, lose } = createFavoringMechanism(() => alphabet);

    expect(list()['あ']).toEqual(0);
    lose();
    expect(list()['あ']).toEqual(-1);
    lose();
    expect(list()['あ']).toEqual(-2);

    Array(8)
      .fill(null)
      .forEach(() => success());
    expect(list()['あ']).toEqual(6); // if there's more than 3, loss will remove 2 points

    lose();
    expect(list()['あ']).toEqual(4);
    lose();
    expect(list()['あ']).toEqual(2);
    lose();
    expect(list()['あ']).toEqual(1);
  });

  it('should filter out symbols that exceed 20 points', () => {
    const alphabet = new TestAlphabet(['あ', 'い']);
    const { success, list, lose, queue, symbol } = createFavoringMechanism(() => alphabet);

    Array(10)
      .fill(null)
      .forEach(() => {
        success(); // for あ
        lose(); // for い
        success(true); // to go to the next symbol
      });

    expect(list()['あ']).toEqual(20);
    expect(list()['い']).toEqual(-10);

    success(); // for あ, more than 20 points
    success(true); // for い
    expect(symbol()).toBe('い');
    expect(queue()).toContain('い');
    expect(queue()).toHaveLength(1);
  });
});
