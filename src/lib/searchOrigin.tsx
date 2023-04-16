import type { MASResponse, NPMResponse } from './types';

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

  return {
    data,
    error,
  };
};

// const masSearch = async (query: string) => {
//   const { data, error } = await fetch(`https://mas-cli.com/search/${query}`).then(async (res) => {
//     return {
//       data: (await res.json()) as MASResponse,
//       error: !res.ok
//         ? {
//             status: res.status,
//             statusText: res.statusText,
//           }
//         : null,
//     };
//   });

//   return {
//     data,
//     error,
//   };
// };

export const searchOrigin = {
  npm: npmSearch,
  homebrew: npmSearch,
  cask: npmSearch,
  composer: npmSearch,
  mas: npmSearch,
};
