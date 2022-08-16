<div>
	<slot />
</div>

<style>
	div {
		overflow: scroll;
		font-size: 0.8rem;
		white-space: pre-wrap;
		margin: 0 var(--l-8);
		height: 100%;
	}
	div::before,
	div::after {
		/* Creates fade effect on scroll */
		content: '';
		display: block;
		position: sticky;
		right: 0;
		left: 0;
		height: var(--l-4);
		z-index: 1;
	}
	div::before {
		top: 0;
		background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.001));
	}

	div::after {
		bottom: 0;
		background: linear-gradient(rgba(255, 255, 255, 0.001), rgba(255, 255, 255, 1));
	}
</style>
