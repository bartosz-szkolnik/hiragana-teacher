import { For } from 'solid-js';
import { RadioButton } from '../components/RadioButton';
import { RadioConfig, RadioGroup } from '../components/RadioGroup';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard' | 'all-characters';

type Props = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

const DIFFICULTY_LEVELS: RadioConfig<Difficulty> = [
  {
    id: 'easy',
    label: 'Easy',
  },
  {
    id: 'medium',
    label: 'Medium',
  },
  {
    id: 'hard',
    label: 'Hard',
  },
  {
    id: 'very-hard',
    label: 'Very hard',
  },
  {
    id: 'all-characters',
    label: 'All characters',
  },
];

export function DifficultySelector(props: Props) {
  return (
    <RadioGroup name="difficulty" onChange={value => props.onChange(value as Difficulty)}>
      <For each={DIFFICULTY_LEVELS}>
        {item => (
          <RadioButton checked={props.value === item.id} id={item.id} disabled={item.disabled ?? false}>
            {item.label}
          </RadioButton>
        )}
      </For>
    </RadioGroup>
  );
}
