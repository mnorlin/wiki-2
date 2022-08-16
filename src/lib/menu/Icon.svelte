<script lang="ts">
	/**
	 * Icon from [Boostrap Icons](https://icons.getbootstrap.com/)
	 */
	export let icon: string;

	/**
	 * Label for the icon, else component is marked as aria-hidden="true"
	 */
	export let label: string | undefined = undefined;
</script>

<i
	aria-hidden={label ? false : true}
	aria-label={label}
	class={`bi bi-${icon} ${$$props.class || ''}`}
/>
