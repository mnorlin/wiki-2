<script lang="ts">
	import Icon from '$lib/menu/Icon.svelte';
	import { page } from '$app/stores';
</script>

<nav aria-label="Menu">
	<a class:active={$page.url.pathname === '/browse'} href="/browse">
		<Icon icon="book" />
	</a>
	<a class:active={$page.url.pathname === '/search'} href="/search">
		<Icon icon="search" />
	</a>
	<a class:active={$page.url.pathname === '/bookmarks'} href="/bookmarks">
		<Icon icon="bookmark" />
	</a>

	<a id="github" target="_blank" rel="noopener" href="https://github.com/mnorlin/wiki-2">
		<Icon icon="github" />
	</a>
</nav>

<style>
	nav {
		display: flex;
		font-size: 1.5rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--gray-700);
		color: var(--gray-400);
		padding: var(--l-4);
		gap: var(--l-8);
	}

	a {
		display: block;
		text-decoration: none;
		color: currentColor;
		transition: color var(--t-1);
	}

	a:hover {
		color: var(--gray-300);
	}

	a:active,
	a.active {
		color: var(--gray-300);
	}

	#github {
		position: absolute;
		bottom: var(--l-4);
	}
</style>
