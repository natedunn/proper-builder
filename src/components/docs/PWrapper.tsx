import { JSXElement } from 'solid-js';

type Props = {
  children: JSXElement;
};

export const PWrapper = (props: Props) => {
  return <div class='mt-4 space-y-6 font-sans text-lg text-zinc-300'>{props.children}</div>;
};
