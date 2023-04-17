import { Show, onMount, For } from 'solid-js';

import { QueueItem } from '~/components/QueueItem';
import { Heading } from '~/components/Heading';
import { Step } from '~/components/Step';
import { clsx } from 'clsx';
import { FooterNav } from '~/components/FooterNav';
import { MainNav } from '~/components/MainNav';
import { HeaderAnimation } from '~/components/HeaderAnimation';

// Signals
import { queue, searchIsActive, searchTerm, setQueue } from '~/lib/signals';
import { loadingSavedQueue, setLoadingSavedQueue } from '~/lib/signals';
import { Search } from '~/components/Search';
import { Queue } from '~/components/Queue';

export default function BuildPage() {
  //
  // Lifecycle methods

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
              searchIsActive() || searchTerm() ? 'pb-0' : 'pb-12 pt-20'
            )}
          >
            <div
              class={clsx(
                'container grid grid-rows-1fr overflow-hidden opacity-100 transition-all duration-500 ease-in-out',
                {
                  '!grid-rows-0fr !opacity-0': searchIsActive() || searchTerm(),
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
            <Search />
          </div>
          <div class='flex-auto border-t border-zinc-800/75 bg-zinc-900 pt-12'>
            <div class='container'>
              <div class='relative pb-10'>
                <Queue />
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
