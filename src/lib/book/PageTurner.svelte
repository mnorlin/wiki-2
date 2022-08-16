<script lang="ts">
	import { currentPage } from '$lib/stores/currentPage';
	import { loading } from '$lib/stores/loading';

	export let modifier: 'previous' | 'next';
	export let hidden = false;

	function turnPage() {
		if (modifier == 'previous') {
			currentPage.offset(-1n);
		} else {
			currentPage.offset(1n);
		}
	}
</script>

<button class:hidden disabled={$loading || hidden} on:click={turnPage}>
	{modifier == 'previous' ? '‹' : '›'}
</button>

<style>
	button {
		padding: 0;
		line-height: 0.75;
		background: transparent;
		border: none;
		font-size: 6rem;
		font-family: 'Arial';
		opacity: 1;
		color: transparent;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: black;
		transition-property: opacity;
		transition-duration: var(--t-2);
		animation-duration: 1s;
		animation-name: text-fill;
		animation-delay: 2s;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	.hidden {
		opacity: 0;
	}

	:not(.hidden):disabled {
		opacity: 0.5;
	}

	@keyframes text-fill {
		from {
			color: transparent;
		}
		to {
			color: var(--gray-600);
		}
	}
</style>
