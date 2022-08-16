import { writable } from 'svelte/store';
import { browser } from "$app/env"

const { subscribe, set } = writable(browser &&  JSON.parse(localStorage.getItem('bookmarks') || "{}"));

subscribe((value) => {
	if (browser) localStorage.setItem('bookmarks', JSON.stringify(value));
});

export const bookmarks = {
	subscribe,
	set
};