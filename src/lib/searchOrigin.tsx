import Fuse from 'fuse.js';
import type { MASResponse, NPMResponse, QueueItem, HomebrewResponse } from './types';

//
// Types
type Search = Promise<{
  data: QueueItem[];
  error: null | {
    status: number;
    statusText: string;
  };
}>;

type Formatter<T> = (data: T) => QueueItem[];

//
// Helper functions
const search = async <T,>(URL: string, formatter: Formatter<T>): Search => {
  const { data, error } = await fetch(URL).then(async (res) => {
    return {
      data: (await res.json()) as T,
      error: !res.ok
        ? {
            status: res.status,
            statusText: res.statusText,
          }
        : null,
    };
  });

  return { data: formatter(data), error };
};

const formatDescription = (description: string | null) => {
  const max = 100;
  if (!description) return null;
  return description.length > max ? description.substring(0, max - 3) + '...' : description;
};

//
// Search functions
const npm = (query: string) => {
  return search<NPMResponse>(`https://api.npms.io/v2/search/suggestions?q=${query}`, (data) =>
    data.map((item) => {
      return {
        name: item.package.name,
        origin: 'npm',
        id: item.package.name,
        description: formatDescription(item.package.description),
        version: item.package.version,
        url: item.package?.links?.npm,
      };
    })
  );
};

const homebrew = async (query: string) => {
  return search<HomebrewResponse>(`https://formulae.brew.sh/api/formula.json`, (data) => {
    const fuse = new Fuse(data, {
      keys: ['name', 'desc', 'full_name'],
    });

    const results = fuse.search(query);

    return results.map((fuseItem) => {
      const item = fuseItem.item;
      return {
        name: item.name,
        origin: 'homebrew',
        id: item.name,
        description: formatDescription(item.desc),
        version: item.versions.stable,
      };
    });
  });
};

const mas = async (query: string) => {
  return search<MASResponse>(
    `http://itunes.apple.com/search?entity=macSoftware&term=${query}`,
    (data) =>
      data.results.map((item) => {
        return {
          name: item.trackName,
          origin: 'mas',
          id: item.trackId.toString(),
          description: formatDescription(item?.description),
          version: item?.version,
          url: item?.trackViewUrl,
        };
      })
  );
};

//
// Exports
export const searchOrigin = {
  npm,
  homebrew: homebrew,
  cask: npm,
  composer: npm,
  mas,
};
