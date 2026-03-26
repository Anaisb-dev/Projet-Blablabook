<script>
	export let variant = "primary"; // Cette prop permet de choisir le style du bouton (primary, secondary, etc.)
	export let active = false; // Indique si le bouton est actif ou non, utile pour les boutons de filtre par exemple
	

	const styles = {
		primary:
			"mt-10 w-[250px] rounded-xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] flex items-center justify-center mx-auto",
		icon: "mt-10 w-[40px] h-[40px] rounded-xl border flex items-center justify-center mx-auto hover:bg-[#F2E0D0] transition-colors duration-200",
		iconText: "mt-3 w-[200px] h-[40px] rounded-xl border flex items-center justify-center hover:bg-[#F2E0D0] transition-colors duration-200"
	};
</script>

<button class={`${styles[variant]} ${active ? "bg-[#F2E0D0]" : "bg-white"}`} on:click>
	<slot></slot>
</button>
	<!-- styles.primary est un fallback au cas où une variante n'est pas définie, par défaut le bouton sera stylé avec la classe primary -->
