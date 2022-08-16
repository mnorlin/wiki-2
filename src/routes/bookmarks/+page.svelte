<script>
	import { onMount } from 'svelte';
	import { bookmarks } from '$lib/stores/bookmarks';
	import defaultBookmarks from './defaultBookmarks.json';
	onMount(() => {
		if (Object.keys($bookmarks).length == 0) {
			$bookmarks = defaultBookmarks;
		}
	});
</script>

<div>
	<ul>
		{#each Object.entries($bookmarks) as [pageNumber, title]}
			<li><a href="/browse#{pageNumber}">{title || '[No name]'}</a></li>
		{/each}
	</ul>
</div>

<style>
	ul {
		list-style: none;
		padding: var(--l-2) var(--l-4);
		border-radius: var(--l-2);
		background: white;
		margin: 0 auto;
		width: 30em;
	}

	ul:empty::before {
		content: 'No bookmarks';
	}

	ul li {
		padding: var(--l-4) var(--l-2);
	}

	ul li::before {
		content: '';
		border-left: 6px solid var(--primary);
		border-right: 6px solid var(--primary);
		border-bottom: 6px solid white;
		background-color: var(--primary);
		margin-right: 0.75rem;
		position: relative;
		top: -3px;
	}

	ul li:not(:last-child) {
		border-bottom: 1px solid var(--gray-200);
	}

	a {
		color: currentColor;
		text-decoration: none;
	}
</style>
