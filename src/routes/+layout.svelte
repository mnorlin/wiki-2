<script lang="ts">
	import Menu from '$lib/menu/Menu.svelte';
	import '../app.css';
</script>

<div id="page">
	<Menu />

	<main>
		<slot />
	</main>
</div>

<style>
	#page {
		display: flex;
		height: 100vh;
	}
	main {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
