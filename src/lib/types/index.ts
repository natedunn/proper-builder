import * as NPMResultsType from './npm-res-types';

export type Origin = 'npm' | 'cask' | 'homebrew' | 'composer';
export type QueueItemType = {
  name: string;
  origin: Origin;
  version: string;
  id: string;
};

export { NPMResultsType };
