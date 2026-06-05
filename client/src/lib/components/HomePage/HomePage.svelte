<script>
	import Carousel from "./Carousel.svelte";
	import BookCard from "../ui/BookCard.svelte";
	import { onMount } from "svelte";
	import { getRandomBooks } from "../../../../services/bookService.js";

	let books = [];

	// Récupérer des livres aléatoires pour le carrousel
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

<!-- Hero section -->
<section class="flex flex-col md:flex-row items-center gap-8 px-8 py-10 max-w-6xl mx-auto">
	
	<!-- Image -->
	<img
		src="/test1.jpg"
		alt="Accueil"
		class="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-md"
	/>

	<!-- Texte -->
	<div class="w-full md:w-1/2 flex flex-col gap-4 px-4">
		<h2 class="text-6xl font-bold">
			<span class="text-[#BF9075]">Blabla</span><span class="text-[#590212]">Book</span>
		</h2>
		<p class="text-justify text-base leading-relaxed text-gray-700">
			Bienvenue sur BlablaBook, votre bibliothèque personnelle en ligne. Découvrez des milliers de livres, 
			gérez vos lectures et partagez vos coups de cœur. Que vous soyez un lecteur occasionnel ou 
			un grand dévoreur de livres, BlablaBook vous accompagne dans toutes vos aventures littéraires.
		</p>
		<a
			href="/#/books"
			class="w-fit px-6 py-3 rounded-2xl bg-[#590212] text-white text-sm hover:bg-[#BF9075] transition"
		>
			Découvrir les livres
		</a>
	</div>
</section>

<!-- Titre carousel -->
<h3 class="text-3xl font-bold text-center text-[#590212] my-8">Livre aléatoire</h3>

<!-- Carousel de livres -->
{#if books.length}
	<div class="px-8 pb-12">
		<Carousel autoplay={4000} itemsVisible={4} totalItems={books.length}>
			{#each books as book}
				<div class="px-3">
					<BookCard
						id={book.google_book_id}
						googleBookId={book.google_book_id}
						title={book.title}
						author={book.authors?.join(", ") || "Auteur inconnu"}
						cover={book.cover_image || book.cover}
						description={book.summary}
						on:select={(e) => goToDetail(e.detail.id)}
					/>
				</div>
			{/each}
		</Carousel>
	</div>
{/if}