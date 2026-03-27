<script>
	import { createEventDispatcher } from "svelte";
	import BookCard from "../ui/BookCard.svelte";
	import Button from "../ui/Button.svelte";
    import Icon from "@iconify/svelte";

	// Données des livres à afficher depuis l'API Google Books
	export let books = [];

	const dispatch = createEventDispatcher();

	function handleSelect(event) {
		dispatch("select", event.detail);// {id}
	}
</script>

<div class="flex flex-wrap justify-center gap-6 p-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:max-w-[1400px] lg:mx-auto">
	{#if books.length === 0}
		<p class="text-gray-500">Aucun livre trouvé.</p>
	{/if}
	{#each books as book}
	<div class="relative">
		<BookCard
			id={book.google_book_id}
			title={book.title}
			cover={book.cover_image}
			description={book.summary}
			on:select={handleSelect}
		/>
		<button
			class="absolute top-2 right-2 z-10 w-8 h-8 rounded-xl bg-[#BF9075] text-white flex items-center justify-center shadow hover:scale-105 transition cursor-pointer hover:bg-[#590212]"
		> +
		</button>
	</div>
{/each}
</div>
