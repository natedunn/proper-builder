import server$, { createServerAction$ } from 'solid-start/server';
import { debounce } from '@solid-primitives/scheduled';
import { Show, createSignal, onMount, For, createComputed, createEffect } from 'solid-js';

import type { NPMResultsType, QueueItemType } from '~/lib/types';
import { LoadingSpinner } from '../../components/icons/LoadingSpinner';
import { QueueItem } from '~/components/QueueItem';
import { Heading } from '~/components/Heading';
import { Step } from '~/components/Step';
import { clsx } from 'clsx';
import { NpmIcon } from '~/components/icons/NPMIcon';

export default function BuildPage() {
  let inputRef: HTMLInputElement | undefined = undefined;

  const [results, setResults] = createSignal<[] | NPMResultsType.NPMResult[]>([]);

  const [queue, setQueue] = createSignal<QueueItemType[] | null>(null);
  const [origin, setOrigin] = createSignal('npm');
  const [waitingForResults, setWaitingForResults] = createSignal(false);
  const [searchIsActive, setSearchIsActive] = createSignal(false);

  createEffect(() => {
    if (results().length > 0 || waitingForResults()) {
      setSearchIsActive(true);
    } else {
      setSearchIsActive(false);
    }
  });

  onMount(() => {
    console.log('Loading locally saved queue.');
    const savedQueue = localStorage.getItem('_queue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }

    inputRef?.focus();
  });

  const [searching, search] = createServerAction$(async (searchTerm: string) => {
    console.log(searchTerm);
    const res = await server$.fetch(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}`);
    const data: NPMResultsType.NPMResult[] | undefined = await res.json();
    return data ? data : [];
  });

  const handleChange = debounce(async (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value;
    const results = await search(searchTerm);
    setResults(results ?? []);
    setWaitingForResults(false);
  }, 500);

  const addToQueue = (item: NPMResultsType.Package) => {
    const newItem = {
      name: item.name,
      id: item.name,
      origin: origin(),
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
    <>
      <div
        class={clsx('transition-all duration-500 ease-in-out', searchIsActive() ? 'py-0' : 'py-12')}
      >
        <div
          class={clsx(
            'container grid grid-rows-1fr overflow-hidden opacity-100 transition-all duration-500 ease-in-out',
            {
              '!grid-rows-0fr !opacity-0': searchIsActive(),
            }
          )}
        >
          <div class='min-h-0'>
            <Heading tag='h1'>
              Get your Mac up and <br />
              running fast.
            </Heading>
            <ol class='mt-6 flex items-center gap-4 rounded-2xl bg-zinc-900 p-4'>
              <For each={['Choose origin', 'Search for dependencies', 'Add to queue', 'Download']}>
                {(item, index) => <Step number={index() + 1}>{item}</Step>}
              </For>
            </ol>
          </div>
        </div>
      </div>

      <div class='flex-auto bg-zinc-900 '>
        <div class='sticky top-0 z-10 bg-gradient-to-b from-zinc-900 via-zinc-900/75 to-transparent py-8'>
          <div class='container'>
            <div class='relative'>
              <button class='absolute m-3 flex h-[calc(100%-1.5rem)] max-w-[4rem] items-center justify-center rounded-lg bg-zinc-800 p-4 px-4 py-2 font-bold text-amber-50 transition-all duration-200 ease-in-out hover:bg-amber-500 hover:text-amber-950'>
                npm
              </button>
              <input
                class='w-full rounded-xl border border-zinc-700 bg-zinc-950 py-5 pl-[90px] pr-5 text-2xl font-bold text-zinc-100 caret-amber-500 outline-0 ring-0 ring-transparent transition-all duration-300 ease-in-out placeholder:font-normal  placeholder:text-zinc-700 hover:border-zinc-600 focus:border-amber-500 focus:outline-0 focus:ring-4 focus:ring-amber-300/20'
                name='search'
                type='text'
                onInput={(e) => {
                  setWaitingForResults(true);
                  handleChange(e);
                }}
                ref={inputRef}
                placeholder='Type to search...'
              />
              <Show when={searching.pending || waitingForResults()} keyed>
                <div
                  class={`absolute right-0 top-0 mx-3.5 my-3 flex h-[calc(100%-1.5rem)] items-center justify-center`}
                >
                  <LoadingSpinner class='h-7 w-7 text-amber-500' />
                </div>
              </Show>
            </div>
            <div class='relative'>
              <Show when={results?.()?.length > 0 && !searching.pending}>
                <ul class='absolute w-full space-y-6 rounded-xl bg-zinc-950 p-4'>
                  {
                    <For
                      each={results?.()}
                      children={(result, index) => {
                        if (!result?.package || index() > 5) return null;

                        const { name, description } = result.package;
                        return (
                          <li>
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
            </div>
          </div>
        </div>
        <div class='container'>
          <div class='relative'>
            <Show when={queue() !== null}>
              <h2 class='text-2xl font-bold'>Queued items</h2>
              <ul class='mt-4 space-y-4'>
                <For
                  each={queue()}
                  children={(item) => (
                    <li>
                      <QueueItem item={item} />
                    </li>
                  )}
                />
              </ul>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}
