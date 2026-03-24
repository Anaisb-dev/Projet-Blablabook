<script>
	export let title = "Titre du livre";
	export let author = "Nom de l’auteur";
	export let cover = "/book.jpg";
    export let description ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
</script>

<div class="w-fit rounded-2xl border p-3">
	<img
		src={cover}
		alt={title}
		class="w-[250px] aspect-[2/3] rounded-xl object-cover"
	/> <!-- aspect-[2/3], 200px de largeur, 300px de hauteur-->

	<div class="mt-3">
		<h3 class="text-sm font-semibold">{title}</h3>
		<p class="text-xs">{author}</p>
	</div>
    
    <p class="mt-2 text-xs text-gray-500 line-clamp-3">
		{description}
	</p>

	<button class="mt-3 w-full rounded-xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1]">
		Voir plus
	</button>
</div>