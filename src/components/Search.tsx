import { debounce } from '@solid-primitives/scheduled';
import { Show, createEffect, onCleanup, onMount } from 'solid-js';
import server$, { createServerAction$ } from 'solid-start/server';
import { Transition } from 'solid-transition-group';
import {
  resultsResolved,
  results,
  searchInputIsFocused,
  searchIsActive,
  setResultsResolved,
  setResults,
  setSearchInputIsFocused,
  setSearchIsActive,
  setWaitingForResults,
  waitingForResults,
  setSearchTerm,
  searchTerm,
  origin,
} from '~/lib/signals';
import { Origin } from '~/lib/types';
import { SearchResults } from './SearchResults';
import { LoadingSpinner } from './icons/LoadingSpinner';

import { useNavigate } from 'solid-start';
import { OriginDropdown } from './OriginDropdown';
import { searchOrigin } from '../lib/searchOrigin';

export const Search = () => {
  const navigate = useNavigate();

  //
  // Element refs
  let inputRef: HTMLInputElement | undefined = undefined;
  let searchWrapper: HTMLDivElement | undefined = undefined;

  //
  // Server functions
  const [searching, search] = createServerAction$(
    async (args: { searchTerm: string; origin: Origin }) => {
      const { searchTerm, origin } = args;

      const { data, error } = await searchOrigin[origin](searchTerm);

      return {
        data,
        error,
      };
    }
  );

  //
  // Client functions
  const fetchSearchResults = debounce(async () => {
    // If empty term, clear results
    if (searchTerm() === '') {
      setResults(null);
      setWaitingForResults(false);
      return;
    }
    // else, fetch results
    const { data, error } = await search({
      searchTerm: searchTerm(),
      origin: origin(),
    });

    if (error) console.warn(error);

    setResults(data);
    setWaitingForResults(false);
    return data;
  }, 500);

  const handleInputChange = async (e: Event) => {
    setSearchTerm((e.target as HTMLInputElement).value);
    setWaitingForResults(true);
    fetchSearchResults();
  };

  const closeSearch = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      inputRef?.blur();
      setSearchIsActive(false);
    }
  };

  //
  // Lifecycle methods
  createEffect(() => {
    if (results()?.length >= 0 && !searching.pending) {
      setResultsResolved(true);
    } else {
      setResultsResolved(false);
    }

    if ((resultsResolved() && searchInputIsFocused() && searchTerm()) || searching.pending) {
      setSearchIsActive(true);
      document.body.style.overflow = 'hidden';
    }

    if (searchTerm() === '') {
      setSearchIsActive(false);
    }

    if (!searchIsActive()) {
      document.body.style.overflow = 'auto';
    }
  });

  onMount(() => {
    inputRef?.focus();
    searchWrapper?.addEventListener('keyup', closeSearch);
  });

  onCleanup(() => {
    searchWrapper?.removeEventListener('keyup', closeSearch);
  });

  return (
    <>
      <Transition
        enterActiveClass='transition duration-300'
        enterClass='opacity-0'
        enterToClass='opacity-100'
        exitActiveClass='transition duration-300'
        exitClass='opacity-100'
        exitToClass='opacity-0'
      >
        <Show when={searchIsActive()}>
          <div
            class='fixed bottom-0 left-0 right-0 top-0 z-20 h-full bg-zinc-900/75'
            onClick={() => {
              setSearchIsActive(false);
            }}
          />
        </Show>
      </Transition>
      <div class='container relative z-30' ref={searchWrapper}>
        <div class='relative'>
          <input
            class='peer relative z-0 w-full rounded-xl border border-zinc-700 bg-zinc-950/50 py-5 pl-[3.25rem] pr-5 text-2xl font-bold text-zinc-100 caret-amber-500 shadow-2xl shadow-black/50 outline-0 ring-0 ring-transparent backdrop-blur-lg transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-zinc-600 hover:border-zinc-600 focus:border-amber-500 focus:bg-zinc-900/50 focus:outline-0 focus:ring-4 focus:ring-amber-300/20'
            name='search'
            type='text'
            value={searchTerm()}
            onInput={handleInputChange}
            ref={inputRef}
            placeholder='Type to search...'
            onFocus={() => setSearchInputIsFocused(true)}
            onBlur={() => setSearchInputIsFocused(false)}
          />
          <div
            class={`transition-color absolute left-0 top-0 z-10 mx-4 my-3 flex h-[calc(100%-1.5rem)] items-center justify-center text-zinc-500 duration-300 ease-in-out peer-focus:text-amber-500`}
          >
            <Show
              when={waitingForResults()}
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
          <div
            id='origin-options'
            class='absolute right-0 top-0 z-10 m-3 flex h-[calc(100%-1.5rem)] items-center justify-center'
          >
            <div class='relative h-full'>
              <OriginDropdown />
            </div>
          </div>
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
            <Show when={!!results() && searchIsActive()}>
              <SearchResults inputRef={inputRef} />
            </Show>
          </Transition>
        </div>
      </div>
    </>
  );
};
