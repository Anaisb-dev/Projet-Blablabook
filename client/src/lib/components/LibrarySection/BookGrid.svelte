<script>
	import BookCard from "../ui/BookCard.svelte";

	// Données des livres à afficher depuis l'API Google Books
	export let books = [];
</script>

<div class="flex flex-wrap justify-center gap-6 p-4">
	{#each books as book}
		<BookCard
			title={book.title}
			cover={book.cover_image}
			description={book.summary}
		/>
	{/each}
</div>
