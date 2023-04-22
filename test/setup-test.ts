import '@solidjs/testing-library';
import matchers, { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

import { expect } from 'vitest';

expect.extend(matchers);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/ban-types
    interface Matchers<R, T = {}> extends TestingLibraryMatchers<T, R> {}
  }
}
