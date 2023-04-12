import { A } from 'solid-start';

export const MainNav = () => {
  const linkClasses = `link text-zinc-100 hover:underline`;
  return (
    <div class='flex w-full items-center justify-between py-4'>
      <div class='flex items-center space-x-2'>
        <A class='space-x-2 text-xl font-bold hover:text-amber-500' href='/'>
          <span class='inline-block'>
            <svg class='h-4 w-4' viewBox='0 0 47 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M7.62209 27.8768C2.3309 30.5652 -2.62418 23.737 1.57251 19.5403L19.4255 1.68738C21.462 -0.349104 24.7637 -0.349101 26.8002 1.68739L44.6532 19.5404C48.8499 23.7371 43.8948 30.5652 38.6036 27.8768L25.475 21.2062C23.9906 20.4519 22.2351 20.4519 20.7507 21.2062L7.62209 27.8768Z'
                fill='currentColor'
              />
            </svg>
          </span>
          <span class='inline-block'>Proper</span>
        </A>
        <div class='rounded-md bg-amber-500/50 px-2 py-0.5 text-xs font-bold'>Beta</div>
      </div>
      <ul class='flex gap-4 font-sans'>
        <li>
          <A class={linkClasses} href='/'>
            Build
          </A>
        </li>
        <li>
          <A class={linkClasses} href='/how'>
            How to use
          </A>
        </li>
      </ul>
    </div>
  );
};
