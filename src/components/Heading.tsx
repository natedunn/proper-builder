import clsx from 'clsx';
import { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type Props = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
  class?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: JSX.Element | string;
};

const variants = {
  h1: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  h2: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  h3: 'text-xl md:text-2xl lg:text-3xl font-bold',
  h4: 'text-lg font-bold',
  h5: 'text-base font-bold',
  h6: 'text-sm font-bold',
  span: '',
  p: '',
  div: '',
};

export function Heading(props: Props) {
  const getVariant = (variant: Props['variant'] | Props['tag']) => {
    return variant ? variants[variant] : null;
  };

  return (
    <Dynamic
      component={props.tag}
      class={clsx(props.class, getVariant(props.variant ?? props.tag))}
    >
      {props.children}
    </Dynamic>
  );
}
