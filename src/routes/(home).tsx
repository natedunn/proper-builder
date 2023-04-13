import server$, { createServerAction$ } from 'solid-start/server';
import { debounce } from '@solid-primitives/scheduled';
import { Show, createSignal, onMount, For, createEffect, onCleanup } from 'solid-js';

import type { NPMResultsType, QueueItemType } from '~/lib/types';
import { LoadingSpinner } from '../components/icons/LoadingSpinner';
import { QueueItem } from '~/components/QueueItem';
import { Heading } from '~/components/Heading';
import { Step } from '~/components/Step';
import { clsx } from 'clsx';
import { A } from 'solid-start';
import { FooterNav } from '~/components/FooterNav';
import { MainNav } from '~/components/MainNav';
import { Transition } from 'solid-transition-group';
import { HeaderAnimation } from '~/components/HeaderAnimation';

export const [queue, setQueue] = createSignal<QueueItemType[] | null>(null);
export const [searchOrigin, setSearchOrigin] = createSignal('npm');
export const [waitingForResults, setWaitingForResults] = createSignal(false);
export const [searchIsActive, setSearchIsActive] = createSignal(false);
export const [searchIsFocused, setSearchIsFocused] = createSignal(false);
export const [loadingSavedQueue, setLoadingSavedQueue] = createSignal(true);
export const [foundResults, setFoundResults] = createSignal(false);
export const [results, setResults] = createSignal<[] | NPMResultsType.NPMResult[]>([]);

export default function BuildPage() {
  let inputRef: HTMLInputElement | undefined = undefined;
  let searchWrapper: HTMLDivElement | undefined = undefined;

  createEffect(() => {
    if (results().length > 0 || waitingForResults()) {
      setSearchIsActive(true);
    } else {
      setSearchIsActive(false);
    }

    if (results().length > 0 && !searching.pending) {
      setFoundResults(true);
    } else {
      setFoundResults(false);
    }

    if ((foundResults() && searchIsFocused()) || searching.pending) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  const closeSearch = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // setSearchIsFocused(false);
      console.log('close search');
    }
  };

  onMount(() => {
    const savedQueue = localStorage.getItem('_queue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }

    inputRef?.focus();
    setLoadingSavedQueue(false);

    searchWrapper?.addEventListener('keyup', closeSearch);
  });

  onCleanup(() => {
    searchWrapper?.removeEventListener('keyup', closeSearch);
  });

  const [searching, search] = createServerAction$(async (searchTerm: string) => {
    if (searchTerm === '') return [];
    const res = await server$.fetch(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}`);
    const data: NPMResultsType.NPMResult[] | undefined = await res.json();
    return data ? data : [];
  });

  const handleChange = debounce(async (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value;
    const results = await search(searchTerm);
    setResults(results);
    setWaitingForResults(false);
  }, 500);

  const addToQueue = (item: NPMResultsType.Package) => {
    const newItem = {
      name: item.name,
      id: item.name,
      origin: searchOrigin(),
      version: item.version ?? '',
    };

    const savedQueue = localStorage.getItem('_queue');

    // Return if already in queue
    if (savedQueue) {
      const parsedQueue = JSON.parse(savedQueue);
      const alreadyInQueue = parsedQueue.find((i: QueueItemType) => i.name === newItem.name);
      if (alreadyInQueue) {
        console.log('Already in queue');
        return;
      }
    }

    localStorage.setItem('_queue', JSON.stringify([newItem, ...(queue() ?? [])]));

    setQueue((prev) => [newItem, ...(prev ?? [])]);
  };

  return (
    <div class='bg-zinc-900 text-zinc-100'>
      <Transition
        enterActiveClass='transition duration-300'
        enterClass='opacity-0'
        enterToClass='opacity-100'
        exitActiveClass='transition duration-300'
        exitClass='opacity-100'
        exitToClass='opacity-0'
      >
        <Show when={(foundResults() && searchIsFocused()) || searching.pending}>
          <div
            class='fixed bottom-0 left-0 right-0 top-0 z-20 h-full bg-zinc-900/75'
            onClick={() => setSearchIsFocused(false)}
          />
        </Show>
      </Transition>
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
              (foundResults() && searchIsFocused()) || searching.pending ? 'pb-0' : 'pb-12 pt-20'
            )}
          >
            <div
              class={clsx(
                'container grid grid-rows-1fr overflow-hidden opacity-100 transition-all duration-500 ease-in-out',
                {
                  '!grid-rows-0fr !opacity-0':
                    (foundResults() && searchIsFocused()) || searching.pending,
                }
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
          <div class='sticky top-0 z-30 bg-gradient-to-b from-zinc-900 via-zinc-900/75 to-transparent pb-6 pt-6'>
            <div class='container' ref={searchWrapper}>
              <div class='relative'>
                <input
                  class='peer relative z-0 w-full rounded-xl border border-zinc-700 bg-zinc-950/50 py-5 pl-[3.25rem] pr-5 text-2xl font-bold text-zinc-100 caret-amber-500 shadow-2xl shadow-black/50 outline-0 ring-0 ring-transparent backdrop-blur-lg transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-zinc-600 hover:border-zinc-600 focus:border-amber-500 focus:bg-zinc-900/50 focus:outline-0 focus:ring-4 focus:ring-amber-300/20'
                  name='search'
                  type='text'
                  onInput={(e) => {
                    setWaitingForResults(true);
                    handleChange(e);
                  }}
                  ref={inputRef}
                  placeholder='Type to search...'
                  onFocus={() => setSearchIsFocused(true)}
                />
                <div
                  class={`transition-color absolute left-0 top-0 z-10 mx-4 my-3 flex h-[calc(100%-1.5rem)] items-center justify-center text-zinc-500 duration-300 ease-in-out peer-focus:text-amber-500`}
                >
                  <Show
                    when={searching.pending || waitingForResults()}
                    keyed
                    fallback={
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        class='h-7 w-7'
                      >
                        <path
                          d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
                          fill='currentColor'
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                        />
                      </svg>
                    }
                  >
                    <LoadingSpinner class='h-6 w-6 text-amber-500' />
                  </Show>
                </div>
                <button class='absolute right-0 top-0 z-10 m-3 flex h-[calc(100%-1.5rem)] items-center justify-center space-x-1 rounded-lg bg-zinc-800 p-4 px-4 py-2 text-amber-50 transition-all duration-200 ease-in-out hover:bg-amber-500 hover:text-amber-950'>
                  <div>npm</div>
                  <div>
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
              </div>
              <div class='relative'>
                <Transition
                  enterActiveClass='transition-all duration-300 ease-in-out'
                  enterClass='opacity-0 -translate-y-4'
                  enterToClass='opacity-100 translate-y-0'
                  exitActiveClass='transition-all duration-300 ease-in-out'
                  exitClass='opacity-100'
                  exitToClass='opacity-0'
                >
                  <Show when={foundResults() && searchIsFocused() && !waitingForResults()}>
                    <ul class='absolute top-2 w-full space-y-6 divide-y rounded-xl bg-zinc-950 p-5'>
                      {
                        <For
                          each={results()}
                          children={(result, index) => {
                            if (!result?.package || index() > 4) return null;

                            const { name, description } = result.package;
                            return (
                              <li class='pt-4'>
                                <h2 class='font-bold'>{name}</h2>
                                <p>{description ?? 'No description'}</p>
                                <button
                                  onClick={() => {
                                    result?.package ? addToQueue(result.package) : null;
                                  }}
                                >
                                  Add to manifest
                                </button>
                              </li>
                            );
                          }}
                        />
                      }
                    </ul>
                  </Show>
                </Transition>
              </div>
            </div>
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
