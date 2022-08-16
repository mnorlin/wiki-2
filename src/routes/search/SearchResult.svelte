<script lang="ts">
	import lcgParams from '$lib/magic/config/lcg-params';
	import { slice, length, stringToBase64 } from '$lib/utils/strings';

	export let searchTerm: string;
	export let pageNumber: bigint;
	export let content: string;
	function toPercent(pageNumber: bigint) {
		return (Number((BigInt(pageNumber) * 10000n) / lcgParams.m) / 100).toFixed(1);
	}
	const encoded = stringToBase64(searchTerm);
</script>

<div>
	<h2>
		<a class="result-link" href="/browse#{pageNumber}">
			{content === searchTerm ? 'Exact match' : 'Nested match'}
		</a>
	</h2>
	<nav class="result-breadcrumb">
		<a href="/">Wiki 2.0</a> ›
		<a href="/browse">Page</a> ›
		<a href={content === searchTerm ? `/?path=/link#${encoded}` : `/browse#${pageNumber}`}>
			{toPercent(pageNumber)} %
		</a>
	</nav>
	<div class="snippet">{slice(content, 0, 300)}</div>
</div>

<style>
	h2 {
		margin: var(--l-8) 0 var(--l-2) 0;
		font-size: larger;
	}
	h2 a {
		text-decoration: none;
		color: var(--primary);
		font-weight: 100;
	}

	nav a {
		color: var(--gray-500);
		font-size: small;
	}

	.snippet {
		margin: var(--l-4) 0;
		font-size: small;
	}
</style>
