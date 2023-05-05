import { Portal } from 'solid-js/web';
import { Drawer } from '../components/Drawer';

type SettingsPanelProps = {
  onClose: () => {};
};

export function SettingsPanel(props: SettingsPanelProps) {
  return (
    <Portal>
      <Drawer onClosed={() => props.onClose()}>some cool stuff</Drawer>
    </Portal>
  );
}
