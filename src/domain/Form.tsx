import { createSignal } from 'solid-js';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import type { Alphabet, SymbolChar } from '../model/alphabet';

type Props = {
  symbol: SymbolChar;
  alphabet: Alphabet<any>;
  onSubmit: (isSuccess: boolean, withHelp: boolean) => void;
};

export function Form(props: Props) {
  const [showAnswer, setShowAnswer] = createSignal(false);
  let inputRef: HTMLInputElement | null = null;

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const value = (inputRef!.value ?? '').toLowerCase();
    const isCorrect = props.alphabet.translate(props.symbol) === value;

    const withHelp = showAnswer();
    if (isCorrect) {
      setShowAnswer(false);
    }
    props.onSubmit(isCorrect, withHelp);

    const form = event.target as HTMLFormElement;
    form.reset();
    inputRef!.focus();
  };

  const handleClick = (event: Event) => {
    event.preventDefault();
    setShowAnswer(true);
    inputRef!.focus();
  };

  return (
    <form class=" my-4 flex flex-col items-center" onSubmit={handleSubmit}>
      <Input ref={inputRef!} name="answer-input" class="w-100 min-w-[270px]"></Input>
      <div class="flex gap-4 mt-4 flex-col">
        <Button type="submit">Submit answer</Button>
        {showAnswer() ? (
          <span class="mt-4 text-2xl font-bold dark:text-white">
            The answer is: <span aria-label="answer">{props.alphabet.translate(props.symbol)}</span>
          </span>
        ) : (
          <Button onClick={handleClick}>Give me the answer</Button>
        )}
      </div>
    </form>
  );
}
