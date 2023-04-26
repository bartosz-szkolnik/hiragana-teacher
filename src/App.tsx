import { Component, createMemo, createSignal } from 'solid-js';
import { createFavoringMechanism } from './favoring-mechanism';
import { TranslationMode, TranslationModeSelector } from './TranslationModeSelector';
import { Symbol } from './Symbol';
import { Form } from './Form';
import { getSymbolsArray } from './utils';

const App: Component = () => {
  const [translationMode, setTranslationMode] = createSignal<TranslationMode>('to-latin');

  const symbolsArray = createMemo(() => getSymbolsArray(translationMode()));
  const { symbol, table, success, lose } = createFavoringMechanism(symbolsArray);

  const [streak, setStreak] = createSignal(0);

  const handleSubmit = (isSuccess: boolean, withHelp: boolean) => {
    if (isSuccess) {
      success(withHelp);
      setStreak(streak() + (withHelp ? 0 : 1));
    } else {
      lose();
      setStreak(0);
    }
  };

  return (
    <div class="flex flex-col items-center">
      <header>
        <h1 class="text-4xl mt-8 mb-2 font-bold">Hiragana teacher</h1>
      </header>
      <main class="mt-8 flex flex-col items-center">
        <h2 class="text-3xl my-4 font-bold">Current streak: {streak()}</h2>
        <TranslationModeSelector onChange={setTranslationMode} value={translationMode()} />
        <Symbol symbol={symbol()}></Symbol>
        <Form onSubmit={handleSubmit} symbol={symbol()} translationMode={translationMode()}></Form>
        <pre class="mt-8">
          <code>{JSON.stringify(table(), null, 2)}</code>
        </pre>
      </main>
    </div>
  );
};

export default App;
