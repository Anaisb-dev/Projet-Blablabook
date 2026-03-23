<!-- JS -->
<script>
	import Button from '../ui/ToggleButton.svelte';
</script>

<!-- HTML -->

<Button>
</Button>

<style>
	:global(body) {
		background-color: #FFF7F1;
		color: #BF9075;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #590212;
		color: #BF9075;
	}
</style>