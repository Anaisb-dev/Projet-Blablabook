<script>
	export let id;
	export let googleBookId;
	export let title = "Titre du livre";
	export let author = "Nom de l'auteur";
	export let cover = null;
	export let description = "";
	export let showDescription = false; // désactivé par défaut
	export let showButton = true;

	function getColorFromTitle(title) {
		const colors = [
			"#590212", "#2C3E50", "#8B4513",
			"#4A4A6A", "#2E4057", "#6B4226", "#3D2B1F",
		];
		const index = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
		return colors[index];
	}

	function truncateTitle(title, maxLength = 40) {
		return title.length > maxLength ? title.slice(0, maxLength) + "…" : title;
	}

	function truncateAuthor(author, maxLength = 30) {
		return author.length > maxLength ? author.slice(0, maxLength) + "…" : author;
	}

	$: bgColor = getColorFromTitle(title);
</script>

<div class="w-[250px] rounded-2xl border p-3 flex flex-col h-full">
	<img
		src={cover}
		alt={title}
		class="w-[250px] aspect-[2/3] rounded-xl object-cover"
	/> <!-- aspect-[2/3], 200px de largeur, 300px de hauteur-->

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
			<!-- bouton ouvre la page de détail du livre -->
			<a
				href={`#/books/${googleBookId}`}
				class="mt-3 w-full rounded-2xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] cursor-pointer hover:bg-[#590212] hover:text-white transition text-center"
			>
				Voir plus
			</a>
		{/if}
	</div>	
</div>