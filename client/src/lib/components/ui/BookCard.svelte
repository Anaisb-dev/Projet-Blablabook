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

<!-- Carte à hauteur fixe — toutes les cartes ont exactement la même taille -->
<div style="
	width: 100%;
	height: 380px;
	border-radius: 16px;
	border: 0.5px solid #F2E0D0;
	padding: 12px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
">
	<!-- Couverture vintage — prend tout l'espace disponible -->
	<div style="
		width: 100%;
		flex: 1;
		border-radius: 10px;
		background-color: {bgColor};
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		box-sizing: border-box;
		min-height: 0;
	">
		<!-- Cadre intérieur -->
		<div style="
			width: 100%;
			height: 100%;
			border: 1px solid rgba(255,255,255,0.2);
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding: 10px 8px;
			box-sizing: border-box;
		">
			<!-- Logo BLABLABOOK -->
			<div style="text-align: center; width: 100%;">
				<div style="width: 20px; height: 1px; background: #BF9075; margin: 0 auto 3px;"></div>
				<p style="font-size: 7px; color: #BF9075; margin: 0; letter-spacing: 2px;">✦ BLABLABOOK ✦</p>
				<div style="width: 20px; height: 1px; background: #BF9075; margin: 3px auto 0;"></div>
			</div>

			<!-- Titre sur la couverture -->
			<p style="
				font-size: 11px;
				font-weight: 500;
				color: #FFF7F1;
				text-align: center;
				margin: 0;
				line-height: 1.4;
				padding: 0 4px;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
			">
				{truncateTitle(title)}
			</p>

			<!-- Auteur sur la couverture -->
			<div style="text-align: center; width: 100%;">
				<div style="width: 30px; height: 1px; background: rgba(255,255,255,0.25); margin: 0 auto 5px;"></div>
				<p style="font-size: 8px; color: rgba(255,255,255,0.55); margin: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
					{truncateAuthor(author)}
				</p>
			</div>
		</div>
	</div>

	<!-- Infos sous la couverture — hauteur fixe de 80px -->
	<div style="
		height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 10px;
		flex-shrink: 0;
	">
		<!-- Titre et auteur — une seule ligne chacun -->
		<div>
			<h3 style="
				font-size: 13px;
				font-weight: 500;
				color: #590212;
				margin: 0 0 2px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			">{title}</h3>
			<p style="
				font-size: 11px;
				color: #BF9075;
				margin: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			">{author}</p>
		</div>

		<!-- Bouton "Voir plus" — toujours en bas, même hauteur -->
		{#if showButton}
			<a
				href={`#/books/${googleBookId}`}
				style="
					display: block;
					width: 100%;
					padding: 6px 0;
					border-radius: 20px;
					border: none;
					background: #BF9075;
					color: #FFF7F1;
					font-size: 12px;
					text-align: center;
					text-decoration: none;
					cursor: pointer;
					transition: background 0.2s;
					box-sizing: border-box;
				"
			>
				Voir plus
			</a>
		{/if}
	</div>
</div>