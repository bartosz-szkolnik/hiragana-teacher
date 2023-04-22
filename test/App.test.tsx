import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('should render the app', () => {
    render(() => <App />);
    expect(screen.getByRole('heading', { name: /hiragana teacher/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /current streak: 0/i })).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });
});
