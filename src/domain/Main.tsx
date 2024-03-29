import { createMemo, createSignal } from 'solid-js';
import { Icon } from '../components/Icon';
import { Symbol } from '../domain/Symbol';
import { useSettings } from './Settings';
import { createFavoringMechanism } from '../model/favoring-mechanism';
import { Mode } from './ModeSelector';
import { Hiragana } from '../model/hiragana';
import { assertUnreachable } from '../model/utils';
import { Form } from './Form';
import { IS_DEV } from '../App';
import { Katakana } from '../model/katakana';

type Props = {
  handleOpenSettings: () => {};
};

export function Main(props: Props) {
  const settings = useSettings();

  const [streak, setStreak] = createSignal(0);
  const alphabet = createMemo(() => createAlphabet(settings.mode()));
  const { symbol, list, success, lose, queue } = createFavoringMechanism(alphabet);

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
    <main class="mt-12 flex flex-col items-center">
      <div class="flex justify-between gap-5 items-center">
        <h2 class="text-3xl font-bold dark:text-white">Current streak: {streak()}</h2>
        <Icon ariaLabel="open settings" onClick={props.handleOpenSettings} variant="settings"></Icon>
      </div>
      <Symbol symbol={symbol()}></Symbol>
      <Form onSubmit={handleSubmit} symbol={symbol()} alphabet={alphabet()}></Form>
      {IS_DEV && (
        <pre class="mt-4 dark:text-white flex">
          <code>{JSON.stringify(list(), null, 2)}</code>
          <code>{JSON.stringify(queue(), null, 2)}</code>
        </pre>
      )}
    </main>
  );
}

function createAlphabet(mode: Mode) {
  switch (mode) {
    case 'hiragana-to-latin':
      return new Hiragana();
    case 'katakana-to-latin':
      return new Katakana();
    default:
      assertUnreachable(mode);
  }
}
