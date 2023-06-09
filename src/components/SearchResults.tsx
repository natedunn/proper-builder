import { For, Show, createEffect, onCleanup, onMount } from 'solid-js';
import {
  focusedResult,
  queue,
  results,
  searchIsActive,
  origin,
  setFocusedResult,
  setQueue,
  setResults,
  setSearchTerm,
} from '../lib/signals';
import { QueueItem } from '~/lib/types';

export const SearchResults = (props: { inputRef: HTMLInputElement | undefined }) => {
  //
  // Client functions
  const addToQueue = (item: QueueItem) => {
    const savedQueue = localStorage.getItem('_queue');

    // Return if already in queue
    if (savedQueue) {
      const parsedQueue = JSON.parse(savedQueue);
      const alreadyInQueue = parsedQueue.find((i: QueueItem) => i.name === item.name);
      if (alreadyInQueue) {
        console.log('Item already in queue');
        return;
      }
    }

    localStorage.setItem('_queue', JSON.stringify([item, ...(queue() ?? [])]));

    setQueue((prev) => [item, ...(prev ?? [])]);
    setResults(null);
    setSearchTerm('');
    props.inputRef.focus();
  };

  const moveFocus = (e: KeyboardEvent) => {
    if (!!results() && searchIsActive()) {
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        // eslint-disable-next-line solid/reactivity
        setFocusedResult((s) => {
          let prev = typeof s === 'number' ? s : 0;
          if (prev <= 0) {
            props.inputRef.focus();
            setTimeout(() => props.inputRef?.select(), 0);
            return null;
          }
          return prev - 1;
        });
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        setFocusedResult((s) => {
          let prev = typeof s === 'number' ? s : -1;
          if (prev >= 4) return 4;
          return prev + 1;
        });
      }
    }
  };

  //
  // Lifecycle
  onMount(() => {
    window.addEventListener('keydown', moveFocus);
  });

  onCleanup(() => {
    setFocusedResult(null);
    window.removeEventListener('keydown', moveFocus);
  });

  //
  // Effects
  createEffect(() => {
    if (focusedResult() !== null) {
      const el = document.getElementById(`result-${focusedResult()}`);
      if (el) {
        el.focus();
      }
    }
  });

  return (
    <ul class='absolute top-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3'>
      {/* When Empty */}
      <Show when={results()?.length === 0}>
        <li class='flex items-center space-x-3'>
          <svg class='h-6 w-6' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            />
          </svg>
          <div class='font-bold'>No results found.</div>
        </li>
      </Show>
      {/* When Results */}
      <Show when={results()?.length > 0}>
        <For
          each={results()}
          children={(result, index) => {
            if (!result || index() > 4) return null;
            return (
              <li>
                <button
                  id={`result-${index()}`}
                  class='group relative flex w-full flex-col justify-start space-y-2 rounded-lg px-3.5 py-3 text-left hocus:bg-zinc-800 hocus:outline-none'
                  onClick={() => {
                    result ? addToQueue(result) : null;
                  }}
                  onFocus={() => setFocusedResult(index())}
                >
                  <div class='flex w-full items-center justify-between gap-2'>
                    <h2 class='font-bold decoration-2 underline-offset-2 group-hover:underline'>
                      {result.name}
                    </h2>
                    {result?.version ? <div class='text-zinc-500'>{result.version}</div> : null}
                  </div>
                  <p class='font-sans text-zinc-500'>{result.description ?? 'No description'}</p>
                </button>
              </li>
            );
          }}
        />
      </Show>
    </ul>
  );
};
