<script>
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

	export let id;
	export let title = "Titre du livre";
	export let author = "Nom de l’auteur";
	export let cover = "/book.jpg";
	export let description =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
	
	export let showDescription = true;
	export let showButton = true;
		
		function handleClick(){
			dispatch("select", {id});
		}

</script>

<div class="w-[250px] rounded-2xl border p-3">
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
	<p class="mt-2 text-xs text-gray-500 line-clamp-3">
		{description}
	</p>
	{/if}

	{#if showButton}
<!-- bouton affiche la page bookdetail-->
	<button class="mt-3 w-full rounded-2xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1]"
	on:click={handleClick}>
		Voir plus
	</button>
	{/if}
</div>