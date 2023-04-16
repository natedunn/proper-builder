import { NPMResponse, NPMPackage } from './response/npm';
import { MASResponse, MASResult } from './response/mas';

export { NPMResponse, NPMPackage, MASResponse, MASResult };

export type Origin = 'npm' | 'cask' | 'homebrew' | 'composer' | 'mas';
export type QueueItemType = {
  name: string;
  origin: Origin;
  version: string;
  id: string;
};
