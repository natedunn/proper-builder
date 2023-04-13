import { createSignal } from 'solid-js';
import { NPMResultsType, QueueItemType } from './types';

export const [queue, setQueue] = createSignal<QueueItemType[] | null>(null);
export const [searchOrigin, setSearchOrigin] = createSignal('npm');
export const [waitingForResults, setWaitingForResults] = createSignal(false);
export const [searchIsActive, setSearchIsActive] = createSignal(false);
export const [searchIsFocused, setSearchIsFocused] = createSignal(false);
export const [loadingSavedQueue, setLoadingSavedQueue] = createSignal(true);
export const [foundResults, setFoundResults] = createSignal(false);
export const [results, setResults] = createSignal<[] | NPMResultsType.NPMResult[]>([]);
