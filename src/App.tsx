import { Component, createSignal } from 'solid-js';
import { Input } from './components/input';
import { Button } from './components/button';
import { getHiraganaArray, mapHiraganaToLatin } from './model/hiragana';
import { createFavoringMechanism } from './favoring-mechanism';
import serialize from 'form-serialize';
import { RadioGroup } from './components/radio-group';
import { RadioButton } from './components/radio-button';

const App: Component = () => {
  const [symbolsArray] = createSignal(getHiraganaArray());
  const [symbol, success, lose, points] = createFavoringMechanism(symbolsArray());
  const [streak, setStreak] = createSignal(0);
  const [showAnswer, setShowAnswer] = createSignal(false);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const values = serialize(form, { hash: true });
    const value = ((values.symbol ?? '') as string).toLowerCase();
    form.reset();

    const isCorrect = mapHiraganaToLatin(symbol()) === value;
    if (isCorrect) {
      setStreak(streak() + 1);
      success();
      setShowAnswer(false);
    } else {
      setStreak(0);
      lose();
    }
  };

  const handleClick = (event: Event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  const handleDirectionChange = (direction: string) => {
    console.log(direction);
  };

  return (
    <div class="flex flex-col items-center">
      <header>
        <h1 class="text-5xl mt-8 mb-2 font-bold">Hiragana teacher</h1>
      </header>
      <main class="mt-8 flex flex-col items-center">
        <h2 class="text-3xl my-4 font-bold">Current streak: {streak()}</h2>
        <RadioGroup name="direction" handleChange={handleDirectionChange}>
          <RadioButton checked id="hiragana-to-latin">
            Hiragana to latin
          </RadioButton>
          <RadioButton id="latin-to-hiragana">Latin to hiragana</RadioButton>
        </RadioGroup>
        <span class="text-9xl p-16 bg-slate-100 border-black border-8">{symbol()}</span>
        <form class="mt-16 flex flex-col items-center" onSubmit={handleSubmit}>
          <Input name="symbol" class="w-100 min-w-[400px]"></Input>
          <div class="flex gap-4 mt-4">
            <Button type="submit">Submit</Button>
            <Button onClick={handleClick}>Give me a hint</Button>
            <Button onClick={handleClick}>Give me the answer</Button>
          </div>
          {showAnswer() && <span class="mt-4 text-2xl font-bold">The answer is: {mapHiraganaToLatin(symbol())}</span>}
        </form>
        <pre class="mt-8">
          <code>{JSON.stringify(points(), null, 2)}</code>
        </pre>
      </main>
    </div>
  );
};

export default App;
