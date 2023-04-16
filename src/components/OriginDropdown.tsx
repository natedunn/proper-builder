import { For, Show, createEffect, createSignal } from 'solid-js';
import { origin, setOrigin } from '../lib/signals';
import { Transition } from 'solid-transition-group';
import { origins } from '~/lib/origins';
import { OriginList } from './OriginDropdownList';

export const [isOriginOptionsOpen, setIsOriginOptionsOpen] = createSignal(false);

export const OriginDropdown = () => {
  //
  // Element refs
  let buttonRef: HTMLButtonElement | undefined = undefined;

  createEffect(() => {
    if (isOriginOptionsOpen()) {
      buttonRef?.blur();
    }
  });

  return (
    <>
      <button
        ref={buttonRef}
        id='origin-button'
        class='flex h-full items-center space-x-1 rounded-lg bg-zinc-800 px-4 py-2 text-amber-50 transition-all duration-200 ease-in-out hover:bg-amber-500 hover:text-amber-950'
        tabIndex={isOriginOptionsOpen() ? -1 : 0}
        onClick={isOriginOptionsOpen() ? null : () => setIsOriginOptionsOpen((value) => !value)}
      >
        <div class='pointer-events-none'>
          {origins.find((originOption) => originOption.value === origin())?.title}
        </div>
        <div class='pointer-events-none'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            />
          </svg>
        </div>
      </button>
      <OriginList />
    </>
  );
};
