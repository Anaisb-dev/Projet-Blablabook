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

<!-- Hero section — Mosaïque 3 photos -->
<section class="px-8 py-10 max-w-6xl mx-auto">
	<div class="grid gap-2 rounded-2xl overflow-hidden" style="grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; height: 480px;">

		<!-- Grande image gauche avec texte en overlay -->
		<div class="relative row-span-2 overflow-hidden">
			<img src="/test1.jpg" alt="Bibliothèque" class="w-full h-full object-cover" />
			<!-- Overlay sombre -->
			<div class="absolute inset-0" style="background: rgba(89,2,18,0.45);"></div>
			<!-- Texte par-dessus -->
			<div class="absolute bottom-0 left-0 p-8 flex flex-col gap-3">
				<h2 class="text-5xl font-bold">
					<span style="color: #FFF7F1;">Blabla</span><span style="color: #BF9075;">Book</span>
				</h2>
				<p class="text-base leading-relaxed text-justify" style="color: rgba(255,255,255,0.85); max-width: 380px;">
					Votre bibliothèque personnelle en ligne. Découvrez des milliers de livres, gérez vos lectures et partagez vos coups de cœur.
				</p>
				<a
					href="/#/books"
					class="w-fit px-6 py-3 rounded-2xl text-sm font-medium transition"
					style="background: #BF9075; color: #FFF7F1;"
				>
					Découvrir les livres
				</a>
			</div>
		</div>

		<!-- Petite image haut droite -->
		<div class="overflow-hidden rounded-tr-2xl">
			<img src="/test3.jpg" alt="Bibliothèque ancienne" class="w-full h-full object-cover" />
		</div>

		<!-- Petite image bas droite -->
		<div class="overflow-hidden rounded-br-2xl">
			<img src="/test4.jpg" alt="Bibliothèque moderne" class="w-full h-full object-cover" />
		</div>

	</div>
</section>

<!-- Titre carousel -->
<h3 class="text-3xl font-bold text-center my-8" style="color: #590212;">Livre aléatoire</h3>

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