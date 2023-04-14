import { Show, onMount, For } from 'solid-js';

import { QueueItem } from '~/components/QueueItem';
import { Heading } from '~/components/Heading';
import { Step } from '~/components/Step';
import { clsx } from 'clsx';
import { FooterNav } from '~/components/FooterNav';
import { MainNav } from '~/components/MainNav';
import { HeaderAnimation } from '~/components/HeaderAnimation';

// Signals
import { queue, setQueue } from '~/lib/signals';
import { loadingSavedQueue, setLoadingSavedQueue } from '~/lib/signals';
import { Search } from '~/components/Search';

export default function BuildPage() {
  //
  // Lifecycle methods
  onMount(() => {
    const savedQueue = localStorage.getItem('_queue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }

    setLoadingSavedQueue(false);
  });

  return (
    <div class='bg-zinc-900 text-zinc-100'>
      <div class='mx-auto flex min-h-screen flex-col'>
        {/* Header */}
        <div class='relative overflow-hidden bg-zinc-800'>
          <HeaderAnimation />
          <div class='container relative z-10'>
            <MainNav />
          </div>
          <div
            class={clsx(
              'relative z-10 transition-all duration-500 ease-in-out',
              // (foundResults() && searchIsFocused()) || searching.pending ? 'pb-0' : 'pb-12 pt-20'
              'pb-12 pt-20'
            )}
          >
            <div
              class={clsx(
                'container grid grid-rows-1fr overflow-hidden opacity-100 transition-all duration-500 ease-in-out'
                // {
                //   '!grid-rows-0fr !opacity-0':
                //     (foundResults() && searchIsFocused()) || searching.pending,
                // }
              )}
            >
              <div class='min-h-0'>
                <Heading tag='h1'>Manage all your Mac's dependencies — at once.</Heading>
                <Heading tag='h2' variant='h4' class='mt-4 font-sans font-light opacity-80'>
                  Generate your own bash script to globally install from NPM, Homebrew, Mac app
                  store, & Composer.
                </Heading>
                <ol class='mt-6 flex items-center gap-4 rounded-2xl bg-zinc-700/50 p-4 font-sans'>
                  <For
                    each={['Choose origin', 'Search for dependencies', 'Add to queue', 'Download']}
                  >
                    {(item, index) => <Step number={index() + 1}>{item}</Step>}
                  </For>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Outlet */}
        <div class='relative flex flex-auto flex-col bg-zinc-900'>
          <div
            id='search'
            class='sticky top-0 z-30 bg-gradient-to-b from-zinc-900 via-zinc-900/75 to-transparent pb-6 pt-6'
          >
            <Search />
          </div>
          <div class='flex-auto border-t border-zinc-800/75 bg-zinc-900 pt-12'>
            <div class='container'>
              <div class='relative pb-10'>
                <Show when={!loadingSavedQueue()} fallback={<>Loading...</>}>
                  <Show
                    when={queue() !== null}
                    fallback={
                      <div class='flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-700/25 p-10 text-2xl text-zinc-600'>
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
                      <h2 class='text-2xl font-bold'>Queued items</h2>
                      <ul class='mt-4 space-y-2'>
                        <For
                          each={queue()}
                          children={(item) => (
                            <li>
                              <QueueItem item={item} />
                            </li>
                          )}
                        />
                      </ul>
                    </div>
                    <div class='sticky bottom-4'>
                      <div class='flex items-center justify-between gap-3 rounded-xl border border-zinc-700/75 bg-zinc-900/50 px-5 py-4 backdrop-blur-lg'>
                        <div class='flex gap-3'>
                          <button class='button'>Download script</button>
                          <button class='button'>Export queue</button>
                        </div>
                        <div>
                          <button class='button' onClick={() => setQueue(null)}>
                            Clear all
                          </button>
                        </div>
                      </div>
                    </div>
                  </Show>
                </Show>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class='bg-zinc-900'>
          <div class='container'>
            <FooterNav />
          </div>
        </div>
      </div>
    </div>
  );
}
