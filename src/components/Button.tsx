import { Component, ParentProps } from 'solid-js';

type ButtonProps = ParentProps & {
  type?: 'button' | 'submit';
  onClick?: (event: Event) => void;
};

export const Button: Component<ButtonProps> = props => {
  return (
    <button
      class="min-w-[222px] middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-md font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type={props.type ?? 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
