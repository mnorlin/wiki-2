<script lang="ts">
	import Book from '$lib/book/Book.svelte';
	import PageTurner from '$lib/book/PageTurner.svelte';
	import Progress from '$lib/book/Progress.svelte';
	import lcgParams from '$lib/magic/config/lcg-params';
	import { currentPage } from '$lib/stores/currentPage';
</script>

<div id="browse">
	<div class="book">
		<Book />
	</div>
	<div class="left">
		<PageTurner hidden={$currentPage <= 0n} modifier="previous" />
	</div>
	<div class="right">
		<PageTurner hidden={$currentPage >= lcgParams.m} modifier="next" />
	</div>
	<div class="progress"><Progress /></div>
</div>

<style>
	#browse {
		display: grid;
		column-gap: var(--l-4);
		grid-template-columns: min-content max-content min-content;
		grid-template-areas:
			'left main right'
			'null1 progress null2';
		row-gap: var(--l-4);
		justify-content: center;
	}

	.book {
		grid-area: main;
	}

	.book,
	.left,
	.right {
		display: flex;
		align-items: center;
	}

	.left {
		grid-area: left;
	}

	.right {
		grid-area: right;
	}

	.progress {
		margin-top: var(--l-4);
		text-align: center;
		grid-area: progress;
	}
</style>
