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

{#if cover && !imageError}
    <!-- Vraie couverture Google Books -->
    <img
        src={cover}
        alt={title}
        class="w-full rounded-xl object-cover"
        style="flex: 1; min-height: 0;"
        on:error={() => imageError = true}
    />
{:else}
    <!-- Couverture générique si pas d'image -->
    <div style="
        width: 100%;
        flex: 1;
        border-radius: 10px;
        background-color: {bgColor};
        ...
    ">
        ...
    </div>
{/if}