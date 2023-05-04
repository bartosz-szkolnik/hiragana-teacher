import { Component, createMemo, createSignal } from 'solid-js';
import { createFavoringMechanism } from './model/favoring-mechanism';
import { TranslationMode, TranslationModeSelector } from './domain/TranslationModeSelector';
import { Symbol } from './domain/Symbol';
import { Form } from './domain/Form';
import { getSymbolsArray } from './model/utils';
import { Difficulty, DifficultySelector } from './domain/DifficultySelector';

const IS_DEV = false;

const App: Component = () => {
  const [translationMode, setTranslationMode] = createSignal<TranslationMode>('to-latin');
  const [difficulty, setDifficulty] = createSignal<Difficulty>('easy');

  const symbolsArray = createMemo(() => getSymbolsArray(translationMode(), difficulty()));
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
    <div class="flex flex-col items-center text-center">
      <header>
        <h1 class="text-4xl mt-8 font-bold">Hiragana teacher</h1>
      </header>
      <main class="mt-12 flex flex-col items-center">
        <h2 class="text-3xl font-bold">Current streak: {streak()}</h2>
        <nav class="mt-4 flex flex-col align-items justify-center">
          {IS_DEV ?? <TranslationModeSelector onChange={setTranslationMode} value={translationMode()} />}
          <DifficultySelector onChange={setDifficulty} value={difficulty()} />
        </nav>
        <Symbol symbol={symbol()}></Symbol>
        <Form onSubmit={handleSubmit} symbol={symbol()} translationMode={translationMode()}></Form>
        {IS_DEV && (
          <pre class="mt-4">
            <code>{JSON.stringify(table(), null, 2)}</code>
          </pre>
        )}
      </main>
    </div>
  );
};

export default App;
