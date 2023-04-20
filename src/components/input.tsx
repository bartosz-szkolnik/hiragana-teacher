import { Component } from 'solid-js';

type InputProps = {
  class: string;
  name?: string;
};

export const Input: Component<InputProps> = props => {
  return (
    <div class={props.class}>
      <div class="relative h-11 w-full">
        <input
          name={props.name}
          autocomplete="off"
          placeholder="What do you think the answer is?"
          class="peer text-lg h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
      </div>
    </div>
  );
};
