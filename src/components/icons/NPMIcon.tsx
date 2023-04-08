import clsx from 'clsx';

type Props = {
  class?: string;
};

export const NpmIcon = (props: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      class={clsx('h-4', props.class)}
      viewBox='0 0 540 210'
    >
      <g clip-path='url(#a)'>
        <path
          fill='currentColor'
          fill-rule='evenodd'
          d='M540 0H0v180h150v30h120v-30h270V0ZM90 150H30V30h120v120h-30V60H90v90Zm90-120v150h60v-30h60V30H180Zm90 90h-30V60h30v60Zm60 30V30h180v120h-30V60h-30v90h-30V60h-30v90h-60Z'
          clip-rule='evenodd'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h540v210H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};
