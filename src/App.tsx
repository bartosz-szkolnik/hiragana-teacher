import { type Component, Show, createSignal } from 'solid-js';
import { SettingsPanel } from './domain/SettingsPanel';
import { Main } from './domain/Main';
import { Header } from './domain/Header';

export const IS_DEV = false;

const App: Component = () => {
  const [settingsOpened, setSettingsOpened] = createSignal(false);

  return (
    <div class="flex flex-col items-center text-center">
      <Header></Header>
      <Main handleOpenSettings={() => setSettingsOpened(true)}></Main>
      <Show when={settingsOpened()}>
        <SettingsPanel onClose={() => setSettingsOpened(false)}></SettingsPanel>
      </Show>
    </div>
  );
};

export default App;
