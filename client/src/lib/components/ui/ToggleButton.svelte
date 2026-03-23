<script>
    import Icon from "@iconify/svelte";

    let isDark = false;

    function toggle() {
        isDark = !isDark;
        document.body.classList.toggle("dark-mode", isDark);
    }
</script>

<button onclick={toggle}>
    <Icon icon= {isDark ? "stash:sun-light" : "stash:moon-light"}/> 
</button>

<style>
	button {
		background-color: #f76027;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.5rem;
		text-transform: uppercase;
		
	}
	:global(body.dark-mode) button {
		background-color: #0084f6;
		color: white;
	}
</style>