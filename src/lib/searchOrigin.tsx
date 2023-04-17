import type { MASResponse, NPMResponse, QueueItem } from './types';

// NPM
const npmSearch = async (query: string) => {
  const { data, error } = await fetch(`https://api.npms.io/v2/search/suggestions?q=${query}`).then(
    async (res) => {
      return {
        data: (await res.json()) as NPMResponse,
        error: !res.ok
          ? {
              status: res.status,
              statusText: res.statusText,
            }
          : null,
      };
    }
  );

  const formattedData = data.map((item) => {
    return {
      name: item.package.name,
      origin: 'npm',
      id: item.package.name,
      description: item.package.description,
      version: item.package.version,
      url: item.package.links.npm,
    };
  }) satisfies QueueItem[];

  return {
    data: formattedData,
    error,
  };
};

// Mas - Mac App Store
const masSearch = async (query: string) => {
  const { data, error } = await fetch(
    `http://itunes.apple.com/search?entity=macSoftware&term=${query}`
  ).then(async (res) => {
    return {
      data: (await res.json()) as MASResponse,
      error: !res.ok
        ? {
            status: res.status,
            statusText: res.statusText,
          }
        : null,
    };
  });

  const formattedData = data.results.map((item) => {
    return {
      name: item.trackName,
      origin: 'mas',
      id: item.trackId.toString(),
      description: item.description,
      version: item.version,
      url: item.trackViewUrl,
    };
  }) satisfies QueueItem[];

  return {
    data: formattedData,
    error,
  };
};

export const searchOrigin = {
  npm: npmSearch,
  homebrew: npmSearch,
  cask: npmSearch,
  composer: npmSearch,
  mas: masSearch,
};
