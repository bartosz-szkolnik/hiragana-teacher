import '@testing-library/jest-dom';

import { render } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('should render the app', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Hiragana teacher')).toBeTruthy();
  });
});
