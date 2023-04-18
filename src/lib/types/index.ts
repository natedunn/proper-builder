// Response types
export { NPMResponse, NPMResult, NPMPackage } from './response/npm';
export { MASResponse, MASResult } from './response/mas';
export { HomebrewResponse, HomebrewResult } from './response/homebrew';
export { ComposerResponse, ComposerResult } from './response/composer';
export { CaskResponse, CaskResult } from './response/cask';

// App types
export type Origin = 'npm' | 'cask' | 'homebrew' | 'composer' | 'mas';
export type QueueItem = {
  name: string;
  origin: Origin;
  id: string;
  version?: string;
  description?: string;
  url?: string;
};
