import { For } from 'solid-js';
import { queue, results, searchOrigin, setQueue } from '../lib/signals';
import { NPMResultsType, QueueItemType } from '~/lib/types';

export const SearchResults = () => {
  //
  // Client functions
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
  );
};
