type Props = {
  symbol: string;
};

export function Symbol(props: Props) {
  return <span class="text-9xl p-16 bg-slate-100 border-black border-8 min-w-[262px] text-center">{props.symbol}</span>;
}
