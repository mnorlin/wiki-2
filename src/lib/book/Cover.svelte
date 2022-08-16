<div class="cover">
	<div id="pages-wrapper"><slot /></div>
</div>

<style>
	.cover {
		background-color: var(--menu-background, lightgray);
		border-radius: var(--page-border-radius, var(--border-radius));
		padding: var(--spacing);
		height: var(--book-height);
		width: calc(var(--book-height) * var(--book-aspect-ratio));
		grid-column: 2;
		grid-row: 1;
		position: relative;
	}

	#pages-wrapper {
		perspective: 200vw;
		perspective-origin: center center;
		opacity: 1;
		transition: 500ms opacity;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
