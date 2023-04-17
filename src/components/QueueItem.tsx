import { Show } from 'solid-js';
import { setQueue } from '~/lib/signals';
import type { QueueItem as _QueueItem } from '~/lib/types';

type QueueItemProps = {
  item: _QueueItem;
};

export const QueueItem = (props: QueueItemProps) => {
  const removeItem = () => {
    const savedQueue = localStorage.getItem('_queue');
    if (savedQueue) {
      const parsedQueue = JSON.parse(savedQueue);
      const newQueue = parsedQueue.filter((i: _QueueItem) => i.name !== props.item.name);
      localStorage.setItem('_queue', JSON.stringify(newQueue));
      setQueue(newQueue);
    }
  };
  return (
    <div class='flex items-center justify-between gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/75 px-5 py-4'>
      <div class='font-medium'>{props.item.name}</div>
      <div class='ml-auto text-sm'>{props.item.version}</div>
      <div class='opacity-10'>|</div>
      <Show when={!!props.item.url}>
        <a
          class='rounded bg-zinc-700 p-1 hocus:bg-amber-500 hocus:text-amber-950 hocus:outline-none'
          href={props.item.url}
          target='_blank'
          rel='noreferrer'
        >
          <svg class='h-4 w-4' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            />
          </svg>
        </a>
      </Show>
      <button
        class='rounded bg-zinc-700 p-1 hocus:bg-red-900 hocus:outline-none'
        onClick={removeItem}
      >
        <svg class='h-4 w-4' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z'
            fill='currentColor'
            fill-rule='evenodd'
            clip-rule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};
