import { createSignal } from 'solid-js';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { translate } from './utils';
import { TranslationMode } from './TranslationModeSelector';

type Props = {
  symbol: string;
  translationMode: TranslationMode;
  onSubmit: (isSuccess: boolean, withHelp: boolean) => void;
};

export function Form(props: Props) {
  const [showAnswer, setShowAnswer] = createSignal(false);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('symbol') as HTMLInputElement;

    const value = ((input.value ?? '') as string).toLowerCase();
    form.reset();

    const isCorrect = translate(props.translationMode, props.symbol) === value;
    const withHelp = showAnswer();
    if (isCorrect) {
      setShowAnswer(false);
    }
    props.onSubmit(isCorrect, withHelp);
  };

  const handleClick = (event: Event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  return (
    <form class="mt-16 flex flex-col items-center" onSubmit={handleSubmit}>
      <Input name="symbol" class="w-100 min-w-[400px]"></Input>
      <div class="flex gap-4 mt-4">
        <Button type="submit">Submit</Button>
        <Button onClick={handleClick}>Give me the answer</Button>
      </div>
      {showAnswer() && (
        <span class="mt-4 text-2xl font-bold">The answer is: {translate(props.translationMode, props.symbol)}</span>
      )}
    </form>
  );
}
