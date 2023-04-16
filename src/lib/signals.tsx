import { createSignal } from 'solid-js';
import { NPMResultsType, QueueItemType } from './types';

export const [queue, setQueue] = createSignal<QueueItemType[] | null>(null);
export const [origin, setOrigin] = createSignal('npm');
export const [waitingForResults, setWaitingForResults] = createSignal(false);
export const [searchIsActive, setSearchIsActive] = createSignal(false);
export const [searchTerm, setSearchTerm] = createSignal('');
export const [loadingSavedQueue, setLoadingSavedQueue] = createSignal(true);
export const [resultsResolved, setResultsResolved] = createSignal(false);
export const [results, setResults] = createSignal<null | NPMResultsType.NPMResult[]>(null);
export const [searchInputIsFocused, setSearchInputIsFocused] = createSignal(false);
export const [focusedResult, setFocusedResult] = createSignal<null | number>(null);