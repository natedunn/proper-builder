import { Show, For, onCleanup, onMount, createEffect } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { origin } from '~/lib/signals';
import { origins } from '~/lib/origins';
import { setOrigin } from '~/lib/signals';

import { isOriginOptionsOpen, setIsOriginOptionsOpen } from './OriginDropdown';
import clsx from 'clsx';

export const OriginList = () => {
  const handleOutsideClick = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const area = document.getElementById('origin-options');

    if (target && area && !area.contains(target)) {
      setIsOriginOptionsOpen(false);
    }
  };

  createEffect(() => {
    if (isOriginOptionsOpen()) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  });

  onCleanup(() => {
    document.removeEventListener('click', handleOutsideClick);
  });

  return (
    <Transition
      enterActiveClass='transition duration-150'
      enterClass='opacity-0 scale-95'
      enterToClass='opacity-100 scale-100'
      exitActiveClass='transition duration-150'
      exitClass='opacity-100 scale-100'
      exitToClass='opacity-0 scale-95'
    >
      <Show when={isOriginOptionsOpen()}>
        <ul
          id='origin-list'
          class='absolute right-0 top-0 min-w-[11rem] rounded-lg bg-zinc-700 p-2 font-sans'
        >
          <For
            each={origins}
            children={(originOption) => (
              <button
                id={`origin-${originOption.value}`}
                tabIndex={originOption.value === origin() ? -1 : 0}
                class={clsx(
                  'flex w-full items-center justify-between space-x-2 rounded-md px-3 py-2 text-left text-sm',
                  originOption.value === origin()
                    ? 'cursor-default bg-zinc-800'
                    : 'hocus:bg-zinc-900 hocus:underline'
                )}
                onClick={
                  originOption.value === origin()
                    ? null
                    : () => {
                        setOrigin(originOption.value);
                        setIsOriginOptionsOpen(false);
                      }
                }
              >
                <div>{originOption.title}</div>
                <Show when={originOption.value === origin()}>
                  <svg
                    class='h-4 w-4'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    />
                  </svg>
                </Show>
              </button>
            )}
          />
        </ul>
      </Show>
    </Transition>
  );
};
