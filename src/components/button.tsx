import { ParentProps } from 'solid-js';

type ButtonProps = {
  type?: 'button' | 'submit';
  onClick?: (event: Event) => void;
};

export const Button = (props: ParentProps<ButtonProps>) => {
  return (
    <button
      class="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-md font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type={props.type ?? 'submit'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
