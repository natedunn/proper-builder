import { Show, For, onCleanup, onMount, createEffect } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { origins } from '~/lib/origins';
import { setOrigin } from '~/lib/signals';

import { isOriginOptionsOpen, setIsOriginOptionsOpen } from './OriginButton';

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

  // onMount(() => {
  //   document.addEventListener('click', handleOutsideClick);
  // });

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
          class='absolute right-0 top-0 min-w-[10rem] rounded-lg bg-zinc-700 p-2'
        >
          <For
            each={origins}
            children={(originOptions) => (
              <button
                class='w-full rounded-md px-3 py-2 text-left hocus:bg-zinc-900 hocus:underline'
                onClick={() => {
                  setOrigin(originOptions.value);
                  setIsOriginOptionsOpen(false);
                }}
              >
                {originOptions.title}
              </button>
            )}
          />
        </ul>
      </Show>
    </Transition>
  );
};
