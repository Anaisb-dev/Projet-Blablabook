<script>
	export let variant = "primary"; // Cette prop permet de choisir le style du bouton (primary, secondary, etc.)

	const styles = {
		primary:
			"mt-10 w-[250px] rounded-xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] flex items-center justify-center mx-auto",
		icon: "mt-10 w-[40px] h-[40px] rounded-xl border bg-white flex items-center justify-center mx-auto hover:bg-[#F2E0D0] transition-colors duration-200",
	};
</script>

<button class={styles[variant] || styles.primary}>
	<slot></slot>
</button>
