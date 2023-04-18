import Fuse from 'fuse.js';
import type {
  MASResponse,
  NPMResponse,
  QueueItem,
  HomebrewResponse,
  ComposerResponse,
} from './types';

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

const homebrew = (query: string) => {
  return search<HomebrewResponse>(`https://formulae.brew.sh/api/formula.json`, (data) => {
    const fuse = new Fuse(data, {
      keys: ['name', 'desc', 'full_name'],
    });

    const results = fuse.search(query);

    return results.map((fuseItem) => {
      const item = fuseItem.item;
      return {
        origin: 'homebrew',
        name: item.name,
        id: item.name,
        description: formatDescription(item?.desc),
        version: item?.versions?.stable,
        url: item?.homepage,
      };
    });
  });
};

const mas = (query: string) => {
  return search<MASResponse>(
    `http://itunes.apple.com/search?entity=macSoftware&term=${query}`,
    (data) =>
      data.results.map((item) => {
        return {
          origin: 'mas',
          name: item.trackName,
          id: item.trackId.toString(),
          description: formatDescription(item?.description),
          version: item?.version,
          url: item?.trackViewUrl,
        };
      })
  );
};

const composer = (query: string) => {
  console.log('composer search running');
  return search<ComposerResponse>(`https://packagist.org/search.json?q=${query}`, (data) =>
    data.results.map((item) => {
      console.log(item);
      return {
        origin: 'composer',
        name: item.name,
        id: item.name,
        description: formatDescription(item?.description),
        version: null,
        url: item?.url,
      };
    })
  );
};

//
// Exports
export const searchOrigin = {
  npm,
  homebrew,
  cask: npm,
  composer,
  mas,
};
