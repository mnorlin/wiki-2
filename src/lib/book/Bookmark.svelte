<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarks } from '$lib/stores/bookmarks';

	export let pageNumber: bigint;

	let checked: boolean;
	let title: string;

	onMount(() => {
		const existing = pageNumber && $bookmarks[pageNumber.toString()];
		if (existing) {
			checked = true;
			title = existing;
		}
	});

	$: if (pageNumber && checked === true) {
		if (title == undefined) title = 'New bookmark';
		$bookmarks[pageNumber.toString()] = title;
	} else if (pageNumber && checked === false) {
		$bookmarks = Object.entries($bookmarks).reduce(
			(acc, [pn, title]) =>
				BigInt(pn) == pageNumber ? acc : { acc, [pageNumber?.toString()]: title },
			{}
		);
	}
</script>

<div class="wrapper">
	{#if pageNumber}
		<input id={`bookmark-input-${pageNumber}`} type="checkbox" bind:checked />
		<label aria-label="Bookmarked" for={`bookmark-input-${pageNumber}`} />
		<input aria-label="Bookmark title" type="text" disabled={!checked} bind:value={title} />
	{/if}
</div>

<style>
	input[type='checkbox'] {
		position: absolute;
		left: -9999px;
	}

	input[type='checkbox'] + label {
		display: block;
		cursor: pointer;
		position: absolute;
		right: var(--l-8);
	}

	input[type='checkbox'] + label:after {
		content: '';
		display: inline-block;
		height: var(--l-6);
		border-left: var(--l-3) solid var(--gray-300);
		border-right: var(--l-3) solid var(--gray-300);
		border-bottom: var(--l-3) solid white;
		background-color: var(--gray-300); /* Prevents a small gap between borders in some browsers */
		transition: border-color;
		transition-duration: var(--t-1);
	}

	input[type='checkbox']:checked + label:after {
		border-right-color: var(--primary);
		border-left-color: var(--primary);
		background-color: var(--primary);
	}

	input[type='checkbox'] ~ input {
		opacity: 0;
		display: block;
		text-align: center;
		width: 65%;
		padding: var(--l-1) 0;
		margin: var(--l-2) auto;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: var(--l-1);
		transition-property: opacity, background-color, border-color;
		transition-duration: var(--t-1);
		font-size: 1rem;
	}

	input[type='checkbox'] ~ input:hover,
	input[type='checkbox'] ~ input:focus {
		background-color: var(--gray-50);
		border-color: var(--gray-200);
		outline: none;
	}

	input[type='checkbox']:checked ~ input {
		opacity: 1;
	}
</style>
