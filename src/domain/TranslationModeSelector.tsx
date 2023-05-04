import { For } from 'solid-js';
import { RadioButton } from '../components/RadioButton';
import { RadioConfig, RadioGroup } from '../components/RadioGroup';

type SymbolLanguage = 'hiragana' | 'katakana' | 'korean';
export type TranslationMode = 'to-latin' | 'from-latin';

type Props = {
  value: TranslationMode;
  onChange: (translation: TranslationMode) => void;
};

const TRANSLATIONS: RadioConfig<TranslationMode> = [
  {
    id: 'to-latin',
    label: 'Hiragana to latin',
  },
  {
    id: 'from-latin',
    label: 'Latin to Hiragana',
  },
];

export function TranslationModeSelector(props: Props) {
  return (
    <RadioGroup name="translation" onChange={value => props.onChange(value as TranslationMode)}>
      <For each={TRANSLATIONS}>
        {item => (
          <RadioButton checked={props.value === item.id} id={item.id}>
            {item.label}
          </RadioButton>
        )}
      </For>
    </RadioGroup>
  );
}
