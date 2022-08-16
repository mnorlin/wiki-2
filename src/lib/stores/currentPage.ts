import { writable } from 'svelte/store';
import { browser } from "$app/env"

const { subscribe, set, update } = writable(BigInt(0n));

subscribe((p) => {
	if(browser) window.location.hash = p.toString();
});

export const currentPage = {
	subscribe,
	offset: (i: bigint) => {
		update((n) => n + i);
	},
	set
};
