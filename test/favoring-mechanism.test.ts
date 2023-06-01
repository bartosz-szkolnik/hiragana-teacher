import { describe, expect, it } from 'vitest';
import { createFavoringMechanism } from '../src/model/favoring-mechanism';
import { HiraganaChar } from '../src/model/hiragana';

const HIRAGANA_ARRAY = ['あ', 'い', 'う', 'え', 'お'] satisfies HiraganaChar[];

describe('favoring-mechanism', () => {
  it('...', () => {
    // const [symbol] = createFavoringMechanism(HIRAGANA_ARRAY);
    // expect(HIRAGANA_ARRAY).toEqual(expect.arrayContaining([symbol()]));
    // expect(HIRAGANA_ARRAY).not.toContain('つ');
  });
});
