<script>
	import { draw, fade } from 'svelte/transition';
</script>

<div class="wrapper">
	<div class="logo" aria-hidden="true">
		<svg
			style="fill-rule: evenodd"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 239 239"
		>
			<path
				in:draw={{ duration: 2000 }}
				class="ring"
				d="M119.5+9C58.4725+8.99998+9+58.4725+9+119.5C9+180.527+58.4725+230+119.5+230C180.527+230+230+180.527+230+119.5C230+58.4725+180.527+9+119.5+9ZM119.5+6.6103e-06C185.498+6.6103e-06+239+53.502+239+119.5C239+185.498+185.498+239+119.5+239C53.502+239+0+185.498+0+119.5C0+53.502+53.502+3.70007e-05+119.5+6.6103e-06Z"
				opacity="1"
			/>
			<g style="color: var(--primary)">
				<path
					in:draw={{ duration: 2000 }}
					class="bookmark"
					d="M119.625+18C104.537+18+90.277+21.3764+77.4062+27.2813L77.4062+153.219C77.4063+153.763+77.5984+153.958+77.75+154.188L119.625+102.438L161.5+154.188C161.652+153.958+161.844+153.763+161.844+153.219L161.844+27.2813C148.973+21.3764+134.713+18+119.625+18Z"
					opacity="1"
				/>
			</g>
		</svg>
	</div>
	<h1 in:fade={{ delay: 2000 + 9 * 100, duration: 500 }}>Wiki 2.0</h1>
	<p in:fade={{ delay: 2000 + 9 * 100 + 75, duration: 500 }}>
		Everything ever written, everything that will be written, exists in this wiki.
	</p>
	<p in:fade={{ delay: 2000 + 9 * 100 + 2 * 75, duration: 1000 }}>
		With its 9×10<sup>11 589</sup> pages, the wiki is complete, all you need to do is find the right
		page...
	</p>
</div>

<style>
	.wrapper {
		white-space: normal;
		font-family: Helvetica, sans-serif;
		color: var(--gray-700);
	}

	.logo {
		margin: 4% auto 0 auto;
		width: 7rem;
	}

	.bookmark {
		fill: var(--primary);
	}

	h1 {
		text-align: center;
		font-size: 4rem;
		margin-top: 2.67rem;
		margin-bottom: 1rem;
		font-weight: 100;
	}

	p {
		text-align: center;
		font-size: 1rem;
	}

	.ring,
	.bookmark {
		fill: transparent;
		stroke: currentColor;
		animation-duration: 1s;
		animation-name: invert;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	@keyframes invert {
		from {
			fill: transparent;
			stroke: currentColor;
		}
		to {
			fill: currentColor;
			stroke: transparent;
		}
	}
</style>
