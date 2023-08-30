import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vitest } from 'vitest';
import App from '../src/App';
import { Settings } from '../src/domain/Settings';

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

describe('App', () => {
  it('should render', () => {
    render(() => <App />);
    expect(screen.getByRole('heading', { name: /hiragana teacher/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /current streak: 0/i })).toBeInTheDocument();
  });

  it('should allow to guess symbols and increase and decrease the streak', async () => {
    const { user } = renderComponent();
    const { input, submitBtn, symbol } = getControls();

    expect(symbol).toHaveTextContent('あ');

    async function submitAnswer(text: string) {
      await user.clear(input);
      await user.type(input, text);
      await user.click(submitBtn);
    }

    await submitAnswer('a');
    expect(screen.getByRole('heading', { name: /current streak: 1/i })).toBeInTheDocument();

    await submitAnswer('i');
    expect(screen.getByRole('heading', { name: /current streak: 2/i })).toBeInTheDocument();

    await submitAnswer('u');
    expect(screen.getByRole('heading', { name: /current streak: 3/i })).toBeInTheDocument();

    await submitAnswer('e');
    expect(screen.getByRole('heading', { name: /current streak: 4/i })).toBeInTheDocument();

    await submitAnswer('o');
    expect(screen.getByRole('heading', { name: /current streak: 5/i })).toBeInTheDocument();
  });

  it('should reset the streak if the answer is wrong', async () => {
    const { user } = renderComponent();
    const { input, submitBtn } = getControls();

    await user.clear(input);
    await user.type(input, 'a');
    await user.click(submitBtn);
    expect(screen.getByRole('heading', { name: /current streak: 1/i })).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'u');
    await user.click(submitBtn);

    expect(screen.getByRole('heading', { name: /current streak: 0/i })).toBeInTheDocument();
  });

  it("should allow to give the answer if the user doesn't know it", async () => {
    const { user } = renderComponent();
    const { input, submitBtn } = getControls();

    await user.click(screen.getByRole('button', { name: /give me the answer/i }));
    const answerSpan = screen.getByLabelText('answer');

    await user.type(input, answerSpan.textContent ?? '');
    await user.click(submitBtn);

    expect(screen.getByRole('heading', { name: /current streak: 0/i })).toBeInTheDocument();
  });

  it('should allow to change the difficulty', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /open settings/i }));
    await user.click(screen.getByRole('radio', { name: /^hard$/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('は');

    await user.click(screen.getByRole('radio', { name: /medium/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('ざ');

    await user.click(screen.getByRole('radio', { name: /all characters/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('あ');

    await user.click(screen.getByRole('radio', { name: /very hard/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('は');

    await user.click(screen.getByRole('radio', { name: /easy/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('あ');
    await user.click(screen.getByRole('button', { name: /close settings/i }));
  });

  it('should allow to change the alphabet', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /open settings/i }));
    await user.click(screen.getByRole('radio', { name: /katakana to latin/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('ア');

    await user.click(screen.getByRole('button', { name: /open settings/i }));
    await user.click(screen.getByRole('radio', { name: /hiragana to latin/i }));
    expect(screen.getByLabelText('symbol')).toHaveTextContent('あ');
    await user.click(screen.getByRole('button', { name: /open settings/i }));
  });

  it.todo('should store values in local storage');
  it.todo('should retrieve values from local storage');
});

function renderComponent() {
  const user = userEvent.setup();
  render(() => (
    <Settings>
      <App />
    </Settings>
  ));

  return { user };
}

function getControls() {
  const symbol = screen.getByLabelText('symbol');
  const input = screen.getByPlaceholderText('What do you think the answer is?');
  const submitBtn = screen.getByRole('button', { name: /submit answer/i });

  return { symbol, input, submitBtn };
}
