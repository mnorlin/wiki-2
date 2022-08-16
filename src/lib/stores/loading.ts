import { writable, derived } from 'svelte/store';

const animationLoadingStore = writable(false);
const pageLoadingStore = writable(false);

export const pageLoading = {
	subscribe: pageLoadingStore.subscribe,
	set: pageLoadingStore.set
};

export const animationLoading = {
	subscribe: animationLoadingStore.subscribe,
	set: animationLoadingStore.set
};

export const loading = derived([pageLoading, animationLoading], ([pl, al]) => pl || al);
