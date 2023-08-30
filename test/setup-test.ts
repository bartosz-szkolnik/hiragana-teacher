import '@solidjs/testing-library';
import matchers, { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { expect, vitest } from 'vitest';
import { DummyTransition } from './dummy-transition';

expect.extend(matchers);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/ban-types
    interface Matchers<R, T = {}> extends TestingLibraryMatchers<T, R> {}
  }
}

vitest.mock('solid-transition-group', () => ({
  Transition: DummyTransition,
}));
