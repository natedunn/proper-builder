import { A } from 'solid-start';

export const MainNav = () => {
  const linkClasses = `link text-zinc-100 hover:underline`;
  return (
    <div class='flex w-full items-center justify-between py-4'>
      <div class='flex items-center space-x-2'>
        <A class='text-xl font-bold hover:text-amber-500' href='/'>
          Proper
        </A>
        <div class='rounded-md bg-amber-500/50 px-2 py-0.5 text-xs font-bold'>Beta</div>
      </div>
      <ul class=' flex gap-4'>
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
