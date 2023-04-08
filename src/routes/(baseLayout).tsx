import { Outlet } from 'solid-start';
import { FooterNav } from '~/components/FooterNav';
import { MainNav } from '~/components/MainNav';

export default function BaseLayout() {
  return (
    <div class='bg-zinc-800 text-zinc-100'>
      <div class='mx-auto flex min-h-screen flex-col'>
        <div class='container'>
          <MainNav />
        </div>

        <div class='flex flex-auto flex-col'>
          <Outlet />
        </div>
        <FooterNav />
      </div>
    </div>
  );
}
