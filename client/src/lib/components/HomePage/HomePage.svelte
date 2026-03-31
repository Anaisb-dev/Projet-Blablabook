<script>
	import Carousel from './Carousel.svelte';
	import BookCard from '../ui/BookCard.svelte';
	import { onMount } from 'svelte';
	import { getRandomBooks } from '../../../../services/bookService.js';

	let books = [];

	// récupérer des livres aléatoires pour le carrousel
	onMount(async () => {
		try {
			books = await getRandomBooks();
		} catch (err) {
			console.error('Erreur lors du chargement des livres', err);
		}
	});
</script>

<section class="flex flex-col md:flex-row items-center gap-4 mt-6 mb-8">
	<img src="/photo-home-page.jpg" alt="Accueil" class="w-full md:w-1/2 h-120 object-cover rounded-lg"
	/>

	<div class="w-full md:w-1/2">
		<h2 class="text-4xl font-bold mb-4">blalbabook</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur laborum repellendus illo similique
			maiores fuga sequi quaerat praesentium, voluptas distinctio optio culpa omnis tempora ratione quibusdam
			placeat officia corporis dolorum.
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
				title={book.title}
				/* auteur non disponible dans cette liste, BookCard utilise un défaut */
				cover={book.cover_image}
				description={book.summary}
			/>
		{/each}
	</Carousel>
{/if}

<style>

</style>