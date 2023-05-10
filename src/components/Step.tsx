import { JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
  number: number;
};

export const Step = (props: Props) => {
  return (
    <li class='flex items-center gap-2'>
      <div class='inline-flex aspect-square w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-rose-900'>
        {props.number}
      </div>
      <div class='text-sm'>{props.children}</div>
    </li>
  );
};
