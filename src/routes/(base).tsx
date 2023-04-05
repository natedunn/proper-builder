import { Outlet } from "solid-start";

export default function TestPage() {
  const linkClasses = `text-zinc-800 hover:text-zinc-900 hover:underline`;
  return (
    <>
      <div class="p-4 bg-zinc-200">
        <ul class="container mx-auto flex gap-4">
          <li>
            <a class={linkClasses} href="/">
              Build
            </a>
          </li>
          <li>
            <a class={linkClasses} href="/about">
              About
            </a>
          </li>
          <li>
            <a class={linkClasses} href="/how">
              How to use
            </a>
          </li>
        </ul>
      </div>
      <div class="container mx-auto flex-auto">
        <Outlet />
      </div>
      <div class="container mx-auto">
        <p>Footer</p>
      </div>
    </>
  );
}
