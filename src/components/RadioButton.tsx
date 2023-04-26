import { ParentProps } from 'solid-js';
import { useRadioContext } from './RadioGroup';

type Props = ParentProps & {
  id: string;
  checked?: boolean;
};

export function RadioButton(props: Props) {
  const [name, handleChange] = useRadioContext();

  return (
    <div class="inline-flex items-center">
      <label class="relative flex cursor-pointer items-center rounded-full p-3" for={props.id}>
        <input
          id={props.id}
          name={name}
          type="radio"
          checked={props.checked}
          onChange={() => handleChange(props.id)}
          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
        />
        <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
      <label class="mt-px cursor-pointer select-none font-light text-gray-700" for={props.id}>
        {props.children}
      </label>
    </div>
  );
}
