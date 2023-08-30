type Props = {
  symbol: string;
};

export function Symbol(props: Props) {
  return (
    <span
      aria-label="symbol"
      class="mt-6 text-9xl p-16 bg-slate-100 border-black dark:bg-slate-900 dark:text-white dark:border-slate-800  border-8 min-w-[262px] text-center"
    >
      {props.symbol}
    </span>
  );
}
