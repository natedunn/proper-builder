import { JSXElement } from 'solid-js';
import { Heading } from '../Heading';

type Props = {
  children: JSXElement;
};

export const LineHeading = (props: Props) => {
  return (
    <div class='flex items-center gap-6'>
      <Heading tag='h2' variant='h3'>
        {props.children}
      </Heading>
      <div class='flex-auto border-b border-zinc-700 ' />
    </div>
  );
};
