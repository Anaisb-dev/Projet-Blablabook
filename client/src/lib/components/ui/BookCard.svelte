<script>
	export let id;
	export let googleBookId;
	export let title = "Titre du livre";
	export let author = "Nom de l'auteur";
	export let cover = null; // gardé pour compatibilité mais non utilisé
	export let description =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
	
	export let showDescription = true;
	export let showButton = true;

	// Génère une couleur de fond unique basée sur le titre du livre
	function getColorFromTitle(title) {
		const colors = [
			{ bg: "#590212", text: "#FFF7F1" },
			{ bg: "#BF9075", text: "#FFF7F1" },
			{ bg: "#2C3E50", text: "#FFF7F1" },
			{ bg: "#8B4513", text: "#FFF7F1" },
			{ bg: "#4A4A6A", text: "#FFF7F1" },
			{ bg: "#2E4057", text: "#FFF7F1" },
			{ bg: "#6B4226", text: "#FFF7F1" },
		];
		const index = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
		return colors[index];
	}

	// Raccourcit le titre s'il est trop long pour la couverture
	function truncateTitle(title, maxLength = 60) {
		return title.length > maxLength ? title.slice(0, maxLength) + "…" : title;
	}

	$: color = getColorFromTitle(title);
</script>

<div class="w-[250px] rounded-2xl border p-3 flex flex-col h-full">

	<!-- Couverture générique avec titre et auteur -->
	<div
		class="w-[250px] aspect-[2/3] rounded-xl flex flex-col items-center justify-between p-4"
		style="background-color: {color.bg};"
	>
		<!-- Trait décoratif en haut -->
		<div class="w-full flex flex-col gap-1 mt-2">
			<div class="h-[2px] w-full rounded opacity-40" style="background-color: {color.text};"></div>
			<div class="h-[1px] w-3/4 rounded opacity-30" style="background-color: {color.text};"></div>
		</div>

		<!-- Titre du livre centré -->
		<p class="text-center font-bold text-sm leading-snug px-2" style="color: {color.text};">
			{truncateTitle(title)}
		</p>

		<!-- Auteur + trait décoratif en bas -->
		<div class="w-full flex flex-col items-center gap-1 mb-2">
			<div class="h-[1px] w-3/4 rounded opacity-30" style="background-color: {color.text};"></div>
			<p class="text-xs opacity-70 text-center" style="color: {color.text};">
				{author}
			</p>
		</div>
	</div>

	<div class="mt-3">
		<h3 class="text-sm font-semibold">{title}</h3>
		<p class="text-xs">{author}</p>
	</div>
    
	{#if showDescription}
	<p class="mt-2 text-xs text-gray-500 line-clamp-3 flex-grow">
		{description}
	</p>
	{/if}

	<div class="flex justify-end">
		{#if showButton}
			<a
				href={`#/books/${googleBookId}`}
				class="mt-3 w-full rounded-2xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] cursor-pointer hover:bg-[#590212] hover:text-white transition text-center"
			>
				Voir plus
			</a>
		{/if}
	</div>	
</div>