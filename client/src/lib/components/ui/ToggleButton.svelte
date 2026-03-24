<script>
	import Icon from "@iconify/svelte";

	let isDark = false;

	function toggle() {
		isDark = !isDark;
		window.document.body.classList.toggle("dark-mode");
	}
</script>

<button onclick={toggle}>
	<Icon
		icon={isDark ? "si:sun-fill" : "si:moon-fill"}
		class={`text-2xl ${isDark ? "text-[#BF9075]" : "text-[#590212]"}`}
	/>
</button>
