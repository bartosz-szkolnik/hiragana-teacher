import { ParentProps, createContext, useContext } from 'solid-js';

type Props = ParentProps & {
  legend?: string;
  name: string;
  onChange: (value: string) => void;
};

const RadioContext = createContext(['name', () => {}] as [string, (value: string) => void]);
export const useRadioContext = () => useContext(RadioContext);

export function RadioGroup(props: Props) {
  return (
    <RadioContext.Provider value={[props.name, props.onChange]}>
      <fieldset>
        {props.legend && <legend>{props.legend}</legend>}
        <div class="flex gap-10">{props.children}</div>
      </fieldset>
    </RadioContext.Provider>
  );
}
