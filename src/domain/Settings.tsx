import { type Accessor, createContext, createSignal, ParentProps, useContext } from 'solid-js';
import type { Mode } from './ModeSelector';
import type { Difficulty } from './DifficultySelector';
import * as localStorage from '../model/local-storage';

type SettingsContext = {
  mode: Accessor<Mode>;
  setMode: (mode: Mode) => void;
  difficulty: Accessor<Difficulty>;
  setDifficulty: (difficulty: Difficulty) => void;
};

const SETTINGS_CONTEXT_DEFAULT_VALUE = {
  mode: () => 'hiragana-to-latin',
  setMode: () => {},
  difficulty: () => 'easy',
  setDifficulty: () => {},
} satisfies SettingsContext;

const SettingsContext = createContext<SettingsContext>(SETTINGS_CONTEXT_DEFAULT_VALUE);
export const useSettings = () => useContext(SettingsContext);

export function Settings(props: ParentProps) {
  const [mode, setMode] = createSignal<Mode>('hiragana-to-latin');
  const [difficulty, setDifficulty] = createSignal<Difficulty>(localStorage.getDifficulty());

  return (
    <SettingsContext.Provider value={{ mode, setMode, difficulty, setDifficulty }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
