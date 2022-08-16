<script lang="ts">
	import lcgParams from '$lib/magic/config/lcg-params';
	import { currentPage } from '$lib/stores/currentPage';
	import { loading } from '$lib/stores/loading';

	$: percentage = (Number((BigInt($currentPage) * 10000n) / lcgParams.m) / 100).toFixed(1);

	function handleChange(e: Event & { target: any }) {
		$currentPage = (BigInt(Math.floor(100 * e.target.value)) * lcgParams.m) / 10000n;
	}
</script>

<label for="progress">{percentage} %</label>
<input
	id="progress"
	aria-label="Progress in Wiki"
	type="range"
	step="any"
	on:change={handleChange}
	value={percentage}
	disabled={$loading}
/>

<style>
	label {
		text-align: center;
	}
	input {
		width: 100%;
		transition-property: all;
		transition-duration: 1s;
	}
</style>
