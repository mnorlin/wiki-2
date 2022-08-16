<script lang="ts">
	export let image: Record<string, number>[][];
	const scale = 3;

	let canvas: HTMLCanvasElement;

	$: if (canvas) {
		const ctx = canvas.getContext('2d')!;
		canvas.height = image.length * scale;
		canvas.width = image[0].length * scale;

		for (let row = 0; row < image.length; row++) {
			const imageRow = image[row];

			for (let col = 0; col < imageRow.length; col++) {
				ctx.fillStyle = `rgb(${imageRow[col].r}, ${imageRow[col].g}, ${imageRow[col].b})`;
				ctx.fillRect(row * scale, col * scale, scale, scale);
			}
		}
	}
</script>

<canvas bind:this={canvas} />
