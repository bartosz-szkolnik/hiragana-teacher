import { ParentProps, createContext, useContext } from 'solid-js';

type Props = ParentProps & {
  legend?: string;
  name: string;
  onChange: (value: string) => void;
};

export type RadioConfig<T> = { id: T; label: string; disabled?: boolean }[];

const RadioContext = createContext(['name', () => {}] as [string, (value: string) => void]);
export const useRadioContext = () => useContext(RadioContext);

export function RadioGroup(props: Props) {
  return (
    <RadioContext.Provider value={[props.name, props.onChange]}>
      <fieldset>
        {props.legend && <legend class="text-2xl font-bold dark:text-white">{props.legend}</legend>}
        <div class="flex justify-center flex-col gap-x-10">{props.children}</div>
      </fieldset>
    </RadioContext.Provider>
  );
}
