import { A } from 'solid-start';

export const MainNav = () => {
  const linkClasses = `link text-zinc-100 hover:underline`;
  return (
    <div class='flex w-full items-center justify-between py-4'>
      <div>
        <A class='text-xl font-bold hover:text-amber-500' href='/'>
          Proper
        </A>
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
