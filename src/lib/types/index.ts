export { NPMResponse, NPMPackage } from './response/npm';
export { MASResponse, MASResult } from './response/mas';
export { HomebrewResponse } from './response/homebrew';
export { ComposerResponse, ComposerResult } from './response/composer';

export type Origin = 'npm' | 'cask' | 'homebrew' | 'composer' | 'mas';
export type QueueItem = {
  name: string;
  origin: Origin;
  id: string;
  version?: string;
  description?: string;
  url?: string;
};
