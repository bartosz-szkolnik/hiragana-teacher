import { For } from 'solid-js';
import { RadioButton } from '../components/RadioButton';
import { RadioConfig, RadioGroup } from '../components/RadioGroup';

type SymbolLanguage = 'hiragana' | 'katakana'; //'korean';
export type Mode = `${SymbolLanguage}-to-latin`;

type Props = {
  value: Mode;
  onChange: (translation: Mode) => void;
};

const TRANSLATIONS: RadioConfig<Mode> = [
  {
    id: 'hiragana-to-latin',
    label: 'Hiragana to latin',
  },
  {
    id: 'katakana-to-latin',
    label: 'Katakana to latin',
  },
];

export function ModeSelector(props: Props) {
  return (
    <RadioGroup legend="Choose mode" name="translation" onChange={value => props.onChange(value as Mode)}>
      <For each={TRANSLATIONS}>
        {item => (
          <RadioButton checked={props.value === item.id} id={item.id} disabled={item.disabled ?? false}>
            {item.label}
          </RadioButton>
        )}
      </For>
    </RadioGroup>
  );
}
