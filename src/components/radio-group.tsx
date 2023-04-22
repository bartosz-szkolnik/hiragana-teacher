import { ParentProps, createContext } from 'solid-js';

type Props = ParentProps & {
  legend?: string;
  name: string;
  handleChange: (value: string) => void;
};

export const RadioContext = createContext(['name', () => {}] as [string, (value: string) => void]);

export function RadioGroup(props: Props) {
  return (
    <RadioContext.Provider value={[props.name, props.handleChange]}>
      <fieldset>
        {props.legend && <legend>{props.legend}</legend>}
        <div class="flex gap-10">{props.children}</div>
      </fieldset>
    </RadioContext.Provider>
  );
}
