import { JSXElement } from 'solid-js';

type Props = {
  children: JSXElement;
};

export const Highlight = (props: Props) => {
  return (
    <span class='inline-block rounded-2xl bg-amber-500/50 px-3 py-1 font-mono text-sm font-medium text-zinc-100'>
      {props.children}
    </span>
  );
};
