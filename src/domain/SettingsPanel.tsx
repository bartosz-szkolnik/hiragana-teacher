import { Portal } from 'solid-js/web';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';
import * as localStorage from '../model/local-storage';

type SettingsPanelProps = {
  onClose: () => {};
};

export function SettingsPanel(props: SettingsPanelProps) {
  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <Portal>
      <Drawer onClosed={() => props.onClose()}>
        <Button onClick={clearLocalStorage}>Clear local storage</Button>
      </Drawer>
    </Portal>
  );
}
