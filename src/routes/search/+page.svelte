<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { slice, length, stringToBase64 } from '$lib/utils/strings';
	import SearchResult from './SearchResult.svelte';

	let value = '';
	let results: any[] = [];
	let contentGenerator: Worker | undefined = undefined;
	let contentFinder: Worker | undefined = undefined;

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (contentGenerator == undefined) {
			return null;
		}
		results = [];
		contentFinder?.postMessage(value);
		for (let i = 0; i < 4; i++) {
			contentGenerator?.postMessage(BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
		}
	}

	const loadWorkers = async () => {
		const SyncGenerator = await import('$lib/magic/content-generator.js?worker');
		const SyncFinder = await import('$lib/magic/content-finder.js?worker');
		contentGenerator = new SyncGenerator.default();
		contentGenerator.onmessage = (e) => {
			contentFinder?.postMessage(buildWrappedResult(value, e.data.text));
		};
		contentFinder = new SyncFinder.default();
		contentFinder.onmessage = ({ data }) => {
			results = [...results, data];
		};
	};

	onMount(async () => {
		await loadWorkers();
	});

	onDestroy(() => {
		contentGenerator?.terminate();
		contentFinder?.terminate();
	});

	function buildWrappedResult(searchTerm: string, randomContent: string) {
		const wrapperLength = length(randomContent) - length(searchTerm);
		const trimmed =
			wrapperLength > 0 ? slice(randomContent, 0, wrapperLength) : slice(randomContent, 0, 3);

		const cutPos = Math.floor(Math.random() * length(trimmed));
		return [slice(trimmed, 0, cutPos), searchTerm, slice(trimmed, cutPos)].join('');
	}
</script>

<div id="search-wrapper">
	<svg
		style="fill-rule: evenodd"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		viewBox="0 0 239 239"
	>
		<path
			d="M119.5+9C58.4725+8.99998+9+58.4725+9+119.5C9+180.527+58.4725+230+119.5+230C180.527+230+230+180.527+230+119.5C230+58.4725+180.527+9+119.5+9ZM119.5+6.6103e-06C185.498+6.6103e-06+239+53.502+239+119.5C239+185.498+185.498+239+119.5+239C53.502+239+0+185.498+0+119.5C0+53.502+53.502+3.70007e-05+119.5+6.6103e-06Z"
			opacity="1"
			fill="currentcolor"
		/>
		<path
			d="M119.625+18C104.537+18+90.277+21.3764+77.4062+27.2813L77.4062+153.219C77.4063+153.763+77.5984+153.958+77.75+154.188L119.625+102.438L161.5+154.188C161.652+153.958+161.844+153.763+161.844+153.219L161.844+27.2813C148.973+21.3764+134.713+18+119.625+18Z"
			opacity="1"
			fill="var(--primary)"
		/>
	</svg>
	<form on:submit={handleSubmit} aria-label="Search">
		<textarea bind:value is="wiki-textarea" aria-labelledby="search-button" />
		<button id="search-button" type="submit">Search</button>
	</form>
	<div class="search-results">
		{#each results as result}
			<SearchResult
				searchTerm={value}
				content={result.searchString}
				pageNumber={result.pageNumber}
			/>
		{/each}
	</div>
</div>

<style>
	#search-wrapper {
		height: 100vh;
		overflow: auto;
	}
	svg {
		color: var(--gray-600);
		display: block;
		width: 7rem;
		margin: var(--l-4) auto var(--l-8) auto;
	}
	.beta {
		font-size: 3rem;
		font-weight: bold;
	}
	form {
		position: relative;
		margin: 0 auto;
		width: 30rem;
		max-width: 30rem;
		margin-bottom: var(--l-8);
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		padding: 0 var(--l-4);
		background-color: var(--gray-600);
		font-size: 1rem;
		color: white;
		line-height: var(--l-4); /* Centers button text in firefox */
		border: 1px solid var(--gray-300);
		border-bottom-right-radius: var(--l-1);
		border-top-right-radius: var(--l-1);
	}

	textarea {
		display: block;
		box-sizing: border-box;
		white-space: pre-wrap;
		padding: var(--l-2) var(--l-4);
		padding-right: calc(6ch + 3 * var(--l-4));
		font-family: inherit;
		font-size: inherit;
		resize: none;
		width: 100%;
		margin-bottom: var(--l-4);
		border-radius: var(--l-1);
		border: 1px solid var(--gray-300);
		background: white;
		min-height: calc(var(--l-4) + 1rem);
		overflow: hidden;
		-webkit-appearance: none;
	}

	.search-results {
		padding: var(--l-8);
	}
</style>
