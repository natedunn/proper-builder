export const MainNav = () => {
  const linkClasses = `text-zinc-100 hover:underline`;
  return (
    <div class='sticky top-0 flex items-center justify-between py-4'>
      <div>
        <a class='text-xl font-bold' href='/'>
          Proper
        </a>
      </div>
      <ul class=' flex gap-4'>
        <li>
          <a class={linkClasses} href='/'>
            Build
          </a>
        </li>
        <li>
          <a class={linkClasses} href='/about'>
            About
          </a>
        </li>
        <li>
          <a class={linkClasses} href='/how'>
            How to use
          </a>
        </li>
      </ul>
    </div>
  );
};
