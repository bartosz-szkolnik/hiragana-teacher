import { Component, createSignal } from 'solid-js';
import { Input } from './components/input';
import { Button } from './components/button';
import { HIRAGANA_TO_LATIN_MAP, type Hiragana } from './model/hiragana';

let lastSymbol: Hiragana | null = null;
const HIRAGANA_ARRAY = Object.keys(HIRAGANA_TO_LATIN_MAP);

const App: Component = () => {
  const [symbol, setSymbol] = createSignal(getRandomSymbol());
  const [streak, setStreak] = createSignal(0);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const input = (target as any)[0] as HTMLInputElement;
    const value = input.value.toLowerCase();
    const isCorrect = HIRAGANA_TO_LATIN_MAP[symbol()] === value;

    input.value = '';
    if (isCorrect) {
      setStreak(streak() + 1);
      setSymbol(getRandomSymbol());
    } else {
      setStreak(0);
    }
  };

  const handleClick = (event: Event) => {
    event.preventDefault();
  };

  return (
    <div class="flex flex-col items-center">
      <header>
        <h1 class="text-5xl mt-8 mb-2 font-bold">Hiragana teacher</h1>
      </header>
      <main class="mt-8 flex flex-col items-center">
        <h2 class="text-3xl my-4 font-bold">Current streak: {streak()}</h2>
        <span class="text-9xl p-16 bg-slate-100 border-black border-8">{symbol()}</span>
        <form class="mt-16 flex flex-col items-center" onSubmit={handleSubmit}>
          <div>
            <Input class="w-100 min-w-[400px]"></Input>
          </div>
          <div class="flex gap-4 mt-4">
            <Button>Submit</Button>
            <Button type="button" onClick={handleClick}>
              Give me a hint
            </Button>
            <Button type="button" onClick={handleClick}>
              Give me the answer
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default App;

function getRandomIndex() {
  return Math.floor(Math.random() * HIRAGANA_ARRAY.length);
}

function getRandomSymbol() {
  const index = getRandomIndex();
  let symbol = HIRAGANA_ARRAY.at(index ?? 0) as Hiragana;
  while (symbol === lastSymbol) {
    const index = getRandomIndex();
    symbol = HIRAGANA_ARRAY.at(index ?? 0) as Hiragana;
  }

  lastSymbol = symbol;
  return symbol;
}
