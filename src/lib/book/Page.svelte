<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { animationLoading } from '$lib/stores/loading';
	import Bookmark from './Bookmark.svelte';
	import PageNumber from './PageNumber.svelte';
	const animationDuration = 1200;

	export let offset: number;
	export let pageNumber: bigint | undefined = undefined;

	let zIndex = 0;
	let prevOffset: number;
	let flipped = false;
	let flipping = false;
	let timer1: NodeJS.Timeout;
	let timer2: NodeJS.Timeout;

	onMount(() => {
		prevOffset = offset;
	});

	onDestroy(() => {
		if (timer1) clearTimeout(timer1);
		if (timer2) clearTimeout(timer2);
	});

	$: {
		const flippedForward = offset == -1 && prevOffset == 0;
		const flippedBack = offset == 0 && prevOffset == -1;

		if (flippedForward) {
			zIndex = 0;
			flipping = true;
			$animationLoading = true;
			timer1 = setTimeout(() => {
				flipped = true;
				flipping = false;
				$animationLoading = false;
			}, animationDuration);
		}

		if (flippedBack) {
			zIndex = 0;
			flipping = true;
			$animationLoading = true;
			timer2 = setTimeout(() => {
				flipping = false;
				flipped = false;
				$animationLoading = false;
			}, animationDuration);
		}

		if (!flippedForward && !flippedBack && offset < 0) {
			zIndex = offset;
			flipped = true;
		}

		if (!flippedForward && !flippedBack && offset >= 0) {
			zIndex = 0;
			flipped = false;
		}
		prevOffset = offset;
	}
</script>

<section
	data-page={pageNumber}
	style="--animation-duration: {animationDuration}ms; z-index: {zIndex}"
	class:flipped
	class:flipping
>
	<div class="back" class:shadow={offset < -1}>
		<div class="content" in:fade={{ duration: 750 }}>
			<slot name="back" />
		</div>
	</div>
	<div class="front" class:shadow={offset > 0}>
		<div class="content" in:fade={{ duration: 750 }}>
			<Bookmark {pageNumber} />
			<slot name="front" />
			<PageNumber {pageNumber} />
		</div>
	</div>
</section>

<style>
	section {
		position: absolute;
		transform-origin: 0 0;
		transform-style: preserve-3d;
		top: var(--l-4);
		right: var(--l-4);
		bottom: var(--l-4);
		left: 50%;
		background: white;
		box-shadow: 0 0 1px var(--gray-400);
	}

	.front,
	.back {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform-style: preserve-3d; /* Prevents firefox from showing backside of pages */
		display: flex;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden; /* Safari */
		opacity: 0.999; /* Opacity 1 does not work in chrome when preserve-3d is set */
	}

	.front::after,
	.back::after {
		content: '';
		transition-property: opacity;
		transition-timing-function: ease-out;
		transition-duration: calc(var(--animation-duration) / 3);
		background-color: var(--gray-600);
		opacity: 0;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}

	.front.shadow::after,
	.back.shadow::after {
		opacity: 1;
		transition-delay: calc(var(--animation-duration) / 2.5);
		transition-timing-function: ease-in;
		opacity: 0.999; /* Opacity 1 does not work in chrome when preserve-3d is set */
	}

	.front {
		box-shadow: none;
		animation-duration: 1s;
		animation-delay: 1s;
		animation-name: shadow-fade-front;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	.back {
		box-shadow: none;
		transform: rotateY(180deg);
		display: flex;
		align-items: center;
		justify-content: center;
		animation-duration: 1s;
		animation-delay: 1s;
		animation-name: shadow-fade-back;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	.content {
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}

	.front .content {
		width: 100%;
	}

	.flipping:not(.flipped) {
		animation-duration: var(--animation-duration);
		animation-name: flip;
		animation-timing-function: ease-out;
	}

	.flipped.flipping {
		animation-duration: var(--animation-duration);
		animation-name: reverseFlip; /* not using animation-direction as it messes with timing function */
		animation-timing-function: ease-out;
	}

	.flipped {
		transform: rotateY(-180deg);
	}

	@keyframes flip {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(-180deg);
		}
	}

	@keyframes reverseFlip {
		from {
			transform: rotateY(-180deg);
		}
		to {
			transform: rotateY(0deg);
		}
	}

	@keyframes shadow-fade-front {
		0% {
			box-shadow: none;
		}
		100% {
			box-shadow: inset 0.5rem 0 1rem -1rem black;
		}
	}

	@keyframes shadow-fade-back {
		0% {
			box-shadow: none;
		}
		100% {
			box-shadow: inset -0.5rem 0 1rem -1rem black;
		}
	}
</style>
