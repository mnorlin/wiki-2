<script lang="ts">
	import Page from './Page.svelte';
	import { currentPage } from '$lib/stores/currentPage';
	import { pageLoading } from '$lib/stores/loading';
	import { onMount, onDestroy } from 'svelte';
	import { bookmarks } from '$lib/stores/bookmarks';
	import { page } from '$app/stores';
	import PageText from './PageText.svelte';
	import PageImage from './PageImage.svelte';
	import FirstPage from './FirstPage.svelte';

	const buffer = 3n;
	let newPages: any[] = [];
	let pages: any[] = [];

	$: $currentPage = BigInt($page.url.hash.slice(1));
	$: newPages = missingPages($currentPage);
	$: $pageLoading = !newPages.every((np) => pages.map((p) => p.pageNumber).includes(np));
	$: bulkLoad = newPages.length > 1 && $pageLoading;
	$: newPages.forEach((newPage) => syncWorker?.postMessage(newPage));

	let syncWorker: Worker | undefined = undefined;
	const loadWorker = async () => {
		const SyncWorker = await import('$lib/magic/content-generator.js?worker');
		syncWorker = new SyncWorker.default();
		syncWorker.onmessage = ({ data }) => {
			if (!pages.find((p) => p.pageNumber == data.pageNumber)) {
				pages = [...pages, data]
					.sort((a, b) => {
						return a.pageNumber - b.pageNumber < 0n ? 1 : -1;
					})
					.filter((page) =>
						page.pageNumber <= $currentPage
							? page.pageNumber + buffer >= $currentPage
							: page.pageNumber - buffer <= $currentPage
					);
			}
		};
	};

	function range(start: bigint, end: bigint) {
		return Array.from(new Array(Number(end - start)), (_, i) => BigInt(i) + start);
	}

	onMount(async () => {
		await loadWorker();
	});
	onDestroy(() => syncWorker?.terminate());

	function missingPages(currentPage: bigint = 0n) {
		const currentPages = pages.map((page) => page.pageNumber);
		return range(currentPage - buffer, currentPage + buffer)
			.filter((newPage) => newPage >= 0)
			.filter((newPage) => !currentPages.includes(newPage));
	}
</script>

<div class="cover">
	<div class="pages-border">
		<div class="pages-wrapper">
			{#if !bulkLoad || $currentPage == 0n}
				<Page offset={0} />
			{/if}
			{#if !bulkLoad || $currentPage == 0n}
				{#each pages as page, i (page.pageNumber)}
					<Page
						pageNumber={page.pageNumber}
						offset={pages.findIndex((p) => p.pageNumber == $currentPage) - i}
					>
						<PageText slot="front">
							{#if page.text == undefined}
								<FirstPage />
							{:else if $bookmarks[page.pageNumber]}
								{@html page.text}
							{:else}
								{page.text}
							{/if}
						</PageText>
						<PageImage slot="back" image={page.image} />
					</Page>
				{/each}
			{/if}
			{#if bulkLoad}
				<Page offset={-1} />
			{:else}
				<Page offset={$currentPage > 0 && !bulkLoad ? -100 : -1} />
			{/if}
		</div>
	</div>
</div>

<style>
	.cover {
		border: 1px solid transparent;
		background-color: transparent;
		border-radius: var(--l-2);
		height: var(--book-height);
		width: calc(var(--book-height) * var(--book-aspect-ratio));
		border-color: var(--gray-600);
		position: relative;
		animation-delay: 2s;
		animation-duration: 1s;
		animation-name: cover;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	/* This only exist to create some nice transition border */
	.pages-border {
		border: 1px solid var(--gray-700);
		margin: var(--l-4);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: white;
	}

	.pages-wrapper {
		perspective: 200vw;
		perspective-origin: center center;
		position: absolute;
		top: calc(-1 * var(--l-4));
		right: calc(-1 * var(--l-4));
		bottom: calc(-1 * var(--l-4));
		left: calc(-1 * var(--l-4));
	}

	@keyframes cover {
		0% {
			background-color: transparent;
		}
		100% {
			background-color: var(--gray-600);
		}
	}
</style>
