<!-- JS -->
<script>
	import Button from '../ui/ToggleButton.svelte';
</script>

<!-- HTML -->
<Button>
	Toggle
</Button>

<!-- CSS -->
<style>
	:global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>