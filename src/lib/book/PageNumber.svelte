<script lang="ts">
	import { currentPage } from '$lib/stores/currentPage.js';

	export let pageNumber: bigint | undefined;

	let timer: NodeJS.Timeout;

	function debounce(value: bigint) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			currentPage.set(value);
		}, 750);
	}

	function handleChange(e: Event & { target: any }) {
		debounce(BigInt(e.target.value));
	}
</script>

{#if pageNumber}
	<input on:input={handleChange} value={pageNumber} type="text" />
{/if}

<style>
	input {
		border: 1px solid transparent;
		border-radius: var(--l-1);
		text-align: center;
		background-color: transparent;
		padding: var(--l-1) var(--l-2);
		margin: var(--l-2) auto;
		width: 65%;
		transition-property: background-color, border-color;
		transition-duration: var(--t-1);
	}

	input:hover,
	input:focus {
		background-color: var(--gray-50);
		border-color: var(--gray-200);
		outline: none;
	}
</style>
