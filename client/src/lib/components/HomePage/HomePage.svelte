<script>
	import Carousel from "./Carousel.svelte";
	import BookCard from "../ui/BookCard.svelte";
	import { onMount } from "svelte";
	import { getRandomBooks } from "../../../../services/bookService.js";

	let books = [];

	// récupérer des livres aléatoires pour le carrousel
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

<section class="flex flex-col md:flex-row items-center gap-4 mt-6 mb-8">
	<img src="/photo-home-page.jpg" alt="Accueil" class="w-full md:w-1/2 h-120 object-cover rounded-lg"
	/>

	<div class="w-full md:w-1/2">
		<p class="text-justify text-lg">
			Bienvenue sur BlablaBook, votre bibliothèque personnelle en ligne. Découvrez des milliers de livres, 
			gérez vos lectures et partagez vos coups de cœur. Que vous soyez un lecteur occasionnel ou 
			un grand dévoreur de livres, BlablaBook vous accompagne dans toutes vos aventures littéraires.
		</p>
	</div>
</section>


<h3 class="text-4xl font-bold text-center my-8">Livre aléatoire</h3>

<!-- Carousel de livres -->

{#if books.length}
	<Carousel autoplay={4000} itemsVisible={4} totalItems={books.length}>
		{#each books as book}
			<BookCard
				id={book.google_book_id}
				googleBookId={book.google_book_id}
				title={book.title}
				/* auteur non disponible dans cette liste, BookCard utilise un défaut */
				cover={book.cover_image || book.cover}
				description={book.summary}
				on:select={(e) => goToDetail(e.detail.id)}
			/>
		{/each}
	</Carousel>
{/if}

<style>
</style>
