import { NPMResponse, NPMPackage } from './response/npm';
import { MASResponse, MASResult } from './response/mas';
import { HomebrewResponse } from './response/homebrew';

export { NPMResponse, NPMPackage, MASResponse, MASResult, HomebrewResponse };

export type Origin = 'npm' | 'cask' | 'homebrew' | 'composer' | 'mas';
export type QueueItem = {
  name: string;
  origin: Origin;
  id: string;
  version?: string;
  description?: string;
  url?: string;
};
