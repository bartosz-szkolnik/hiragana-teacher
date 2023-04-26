import { describe, expect, it } from 'vitest';
import { createFavoringMechanism } from '../src/favoring-mechanism';
import { Hiragana } from '../src/model/hiragana';

const HIRAGANA_ARRAY = ['あ', 'い', 'う', 'え', 'お'] satisfies Hiragana[];

describe('favoring-mechanism', () => {
  it('...', () => {
    // const [symbol] = createFavoringMechanism(HIRAGANA_ARRAY);
    // expect(HIRAGANA_ARRAY).toEqual(expect.arrayContaining([symbol()]));
    // expect(HIRAGANA_ARRAY).not.toContain('つ');
  });
});
