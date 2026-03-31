<script>
	import Carousel from "./Carousel.svelte";
	import BookCard from "../ui/BookCard.svelte";
	import { onMount } from "svelte";
	import { getRandomBooks } from "../../../../services/bookService.js";

	let books = [];

	onMount(async () => {
		try {
			books = await getRandomBooks();
		} catch (err) {
			console.error("Erreur lors du chargement des livres", err);
		}
	});

	function goToDetail(id) {
		window.location.href = `/#/books/${id}`;
	}
</script>

<img
	src="/assets/homepage.jpg"
	alt="Accueil"
	class="w-full h-64 object-cover rounded-lg mb-6"
/>

<h2>blalbabook</h2>
<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur laborum
	repellendus illo similique maiores fuga sequi quaerat praesentium, voluptas
	distinctio optio culpa omnis tempora ratione quibusdam placeat officia
	corporis dolorum.
</p>

<h2>titre</h2>

<!-- Carousel de livres -->

{#if books.length}
	<Carousel autoplay={2000} itemsVisible={3} totalItems={books.length}>
		{#each books as book}
			<BookCard
				id={book.google_book_id}
				title={book.title}
				/* auteur non disponible dans cette liste, BookCard utilise un défaut */
				cover={book.cover_image}
				description={book.summary}
				on:select={(e) => goToDetail(e.detail.id)}
			/>
		{/each}
	</Carousel>
{/if}

<style>
</style>
