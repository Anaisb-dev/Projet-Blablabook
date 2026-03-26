<script>
	import { createEventDispatcher } from "svelte";
	import BookCard from "../ui/BookCard.svelte";

	// Données des livres à afficher depuis l'API Google Books
	export let books = [];

	const dispatch = createEventDispatcher();

	function handleSelect(event) {
		dispatch("select", event.detail);// {id}
	}
</script>

<div class="flex flex-wrap justify-center gap-6 p-4">
	{#each books as book}
		<BookCard
			id={book.google_book_id}
			title={book.title}
			cover={book.cover_image}
			description={book.summary}
			on:select={handleSelect}
		/>
	{/each}
</div>
