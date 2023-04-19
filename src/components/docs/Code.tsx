import type { JSXElement } from 'solid-js';

type Props = {
  title: string;
  children: JSXElement;
};

export const Code = (props: Props) => {
  return (
    <div class='overflow-hidden rounded-xl bg-zinc-950 font-mono text-sm'>
      <div class='w-full bg-zinc-800 px-6 py-2.5'>{props.title}</div>
      <pre class='px-6'>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};
