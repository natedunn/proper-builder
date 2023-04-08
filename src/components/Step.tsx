import { JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
  number: number;
};

export const Step = (props: Props) => {
  return (
    <li class='flex items-center gap-2'>
      <div class='inline-flex aspect-square w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-amber-900'>
        {props.number}
      </div>
      <div class='text-sm'>{props.children}</div>
    </li>
  );
};
