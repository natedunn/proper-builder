import { Show, For, onMount } from 'solid-js';
import { QueueItem } from './QueueItem';
import { loadingSavedQueue, queue, setLoadingSavedQueue, setQueue } from '~/lib/signals';
import { generateZip } from '~/lib/generate-zip';

export const Queue = () => {
  const handleClear = () => {
    setQueue(null);
    localStorage.removeItem('_queue');
  };

  onMount(() => {
    const savedQueue = localStorage.getItem('_queue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }

    setLoadingSavedQueue(false);
  });

  const boxClasses = `flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-700/25 p-10 text-2xl text-zinc-600`;

  return (
    <Show
      when={!loadingSavedQueue()}
      fallback={
        <div class={boxClasses}>
          <div>
            <svg
              class='h-10 w-10'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'
              />
            </svg>
          </div>
          <div>Loading...</div>
        </div>
      }
    >
      <Show
        when={queue() !== null}
        fallback={
          <div class={boxClasses}>
            <div>
              <svg
                class='h-10 w-10'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z'
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
            <div>No items added.</div>
          </div>
        }
      >
        <div class='pb-10'>
          <div class='space-y-10'>
            {/* NPM */}
            <div class='space-y-4'>
              <div class='flex items-center gap-6'>
                <h3 class='text-xl font-bold'>NPM</h3>
                <div class='flex-auto border-b border-zinc-700 ' />
              </div>
              <ul class='space-y-2'>
                <For
                  each={queue().filter((item) => item.origin === 'npm')}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </div>
            {/* Homebrew */}
            <div class='space-y-4'>
              <div class='flex items-center gap-6'>
                <h3 class='text-xl font-bold'>Homebrew</h3>
                <div class='flex-auto border-b border-zinc-700 ' />
              </div>
              <ul class='space-y-2'>
                <For
                  each={queue().filter((item) => item.origin === 'homebrew')}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </div>
            {/* Cask */}
            <div class='space-y-4'>
              <div class='flex items-center gap-6'>
                <h3 class='text-xl font-bold'>Cask</h3>
                <div class='flex-auto border-b border-zinc-700 ' />
              </div>
              <ul class='space-y-2'>
                <For
                  each={queue().filter((item) => item.origin === 'cask')}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </div>
            {/* MAS */}
            <div class='space-y-4'>
              <div class='flex items-center gap-6'>
                <h3 class='text-xl font-bold'>Mac App Store</h3>
                <div class='flex-auto border-b border-zinc-700 ' />
              </div>
              <ul class='space-y-2'>
                <For
                  each={queue().filter((item) => item.origin === 'mas')}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </div>
            {/* Composer */}
            <div class='space-y-4'>
              <div class='flex items-center gap-6'>
                <h3 class='text-xl font-bold'>Composer</h3>
                <div class='flex-auto border-b border-zinc-700 ' />
              </div>
              <ul class='space-y-2'>
                <For
                  each={queue().filter((item) => item.origin === 'composer')}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </div>
          </div>
        </div>
        <div class='sticky bottom-4'>
          <div class='flex items-center justify-between gap-3 rounded-xl border border-zinc-700/75 bg-zinc-900/50 px-5 py-4 backdrop-blur-lg'>
            <div class='flex gap-3'>
              <button class='button' onClick={() => generateZip(queue())}>
                <span class='inline-block'>
                  <svg
                    class='h-4 w-4'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    />
                  </svg>
                </span>
                <span class='inline-block'>Download script</span>
              </button>
              {/* <button class='button'>Export queue</button> */}
            </div>
            <div>
              <button class='button-secondary' onClick={handleClear}>
                <span class='inline-block'>
                  <svg
                    class='h-4 w-4'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    />
                  </svg>
                </span>
                <span class='inline-block'>Clear all</span>
              </button>
            </div>
          </div>
        </div>
      </Show>
    </Show>
  );
};
