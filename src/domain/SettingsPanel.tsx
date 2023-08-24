import { Portal } from 'solid-js/web';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';
import * as localStorage from '../model/local-storage';
import { ModeSelector } from './ModeSelector';
import { DifficultySelector } from './DifficultySelector';
import { IS_DEV } from '../App';
import { useSettings } from './Settings';

type SettingsPanelProps = {
  onClose: () => {};
};

export function SettingsPanel(props: SettingsPanelProps) {
  const settings = useSettings();

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Portal>
      <Drawer onClosed={() => props.onClose()}>
        <div class="flex flex-col gap-8 mt-2">
          <Button onClick={clearLocalStorage}>Clear local storage</Button>
          <div class="flex" classList={{ 'justify-around': IS_DEV }}>
            <DifficultySelector onChange={settings.setDifficulty} value={settings.difficulty()} />
            {/* {IS_DEV ? <ModeSelector onChange={settings.setMode} value={settings.mode()} /> : null} */}
            <ModeSelector onChange={settings.setMode} value={settings.mode()} />
          </div>
        </div>
      </Drawer>
    </Portal>
  );
}
