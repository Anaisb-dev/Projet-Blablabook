<!-- ============================================================ -->
<!-- CARTE LIVRE — Composant réutilisable                        -->
<!-- Affiche une couverture générique + infos + bouton           -->
<!-- Utilisé dans le carousel (HomePage) et la grille (Library) -->
<!-- ============================================================ -->

<script>
	// Props reçues depuis le composant parent
	export let id;                    // ID interne du livre en BDD
	export let googleBookId;          // ID Google Books (utilisé pour la route de détail)
	export let title = "Titre du livre";
	export let author = "Nom de l'auteur";
	export let cover = null;          // Non utilisé : on génère une couverture CSS
	export let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
	export let showDescription = true; // Permet de masquer la description si besoin
	export let showButton = true;      // Permet de masquer le bouton si besoin

	// Génère une couleur de fond unique basée sur le titre du livre
	// Chaque titre produit un index différent → couleur différente
	function getColorFromTitle(title) {
		const colors = [
			"#590212",
			"#2C3E50",
			"#8B4513",
			"#4A4A6A",
			"#2E4057",
			"#6B4226",
			"#3D2B1F",
		];
		// On additionne les codes ASCII de chaque lettre du titre
		// pour obtenir un index unique et stable pour chaque livre
		const index = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
		return colors[index];
	}

	// Coupe le titre s'il dépasse 40 caractères pour éviter le débordement
	function truncateTitle(title, maxLength = 40) {
		return title.length > maxLength ? title.slice(0, maxLength) + "…" : title;
	}

	// $: = variable réactive Svelte → bgColor se recalcule si title change
	$: bgColor = getColorFromTitle(title);
</script>

<!-- Carte principale -->
<!-- w-full : la carte s'adapte à la largeur du carousel (responsive) -->
<!-- h-full : permet à toutes les cartes d'avoir la même hauteur -->
<div class="w-full rounded-2xl border p-3 flex flex-col h-full overflow-hidden">

	<!-- Couverture générique style vintage -->
	<!-- aspect-[2/3] : ratio portrait comme une vraie couverture de livre -->
	<div
		class="w-full aspect-[2/3] rounded-xl flex items-center justify-center p-3"
		style="background-color: {bgColor};"
	>
		<!-- Cadre intérieur avec bordure subtile -->
		<div style="
			width: 100%;
			height: 100%;
			border: 1px solid rgba(255,255,255,0.25);
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding: 12px 10px;
			box-sizing: border-box;
		">
			<!-- Haut : logo BLABLABOOK avec traits décoratifs -->
			<div style="text-align: center; width: 100%;">
				<div style="width: 20px; height: 1px; background: #BF9075; margin: 0 auto 4px;"></div>
				<p style="font-size: 8px; color: #BF9075; margin: 0; letter-spacing: 2px;">✦ BLABLABOOK ✦</p>
				<div style="width: 20px; height: 1px; background: #BF9075; margin: 4px auto 0;"></div>
			</div>

			<!-- Titre du livre centré sur la couverture -->
			<!-- max-height + overflow: hidden évite le débordement sur les longs titres -->
			<p style="
				font-size: 12px;
				font-weight: 500;
				color: #FFF7F1;
				text-align: center;
				margin: 0;
				line-height: 1.5;
				padding: 0 4px;
				max-height: 80px;
				overflow: hidden;
			">
				{truncateTitle(title)}
			</p>

			<!-- Bas : nom de l'auteur avec trait séparateur -->
			<div style="text-align: center; width: 100%;">
				<div style="width: 40px; height: 1px; background: rgba(255,255,255,0.3); margin: 0 auto 6px;"></div>
				<p style="font-size: 9px; color: rgba(255,255,255,0.6); margin: 0;">{author}</p>
			</div>
		</div>
	</div>

	<!-- Infos textuelles sous la couverture -->
	<div class="mt-3">
		<h3 class="text-sm font-semibold">{title}</h3>
		<p class="text-xs">{author}</p>
	</div>

	<!-- Description (masquable via la prop showDescription) -->
	<!-- line-clamp-3 : limite à 3 lignes avec "..." automatique -->
	{#if showDescription}
		<p class="mt-2 text-xs text-gray-500 line-clamp-3 flex-grow">
			{description}
		</p>
	{/if}

	<!-- Bouton "Voir plus" (masquable via la prop showButton) -->
	<!-- Redirige vers la page de détail du livre -->
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