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

<!-- Hero section — Grande image centrée avec texte en overlay -->
<section class="flex justify-center px-8 py-10">
	<div
		class="relative w-full max-w-5xl rounded-2xl overflow-hidden"
		style="height: 480px;"
	>
		<img
			src="/test2.jpg"
			alt="Bibliothèque"
			class="w-full h-full object-cover"
		/>
		<!-- Overlay -->
		<div
			class="overlay absolute inset-0"
			style="background: rgba(89,2,18,0.65);"
		></div>
		<!-- Texte centré par-dessus -->
		<div
			class="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center"
		>
			<h2 class="text-6xl font-bold">
				<span class="blabla"style="color: #FFFFFF;">Blabla</span><span
					style="color: #BF9075;">Book</span
				>
			</h2>
			<p
				class="text-lg leading-relaxed"
				style="color: #FFFFFF; max-width: 600px;"
			>
				Votre bibliothèque personnelle en ligne. Découvrez des milliers
				de livres, gérez vos lectures et partagez vos coups de cœur.
			</p>

			<a
				href="/#/books"
				class="px-8 py-3 rounded-2xl text-sm font-medium transition hover:opacity-90"
				style="background: #BF9075; color: #FFF7F1;"
			>
				Découvrir les livres</a
			>
		</div>
	</div>
</section>

<!-- Titre carousel -->
<h3 class="text-3xl font-bold text-center my-8" style="color: #590212;">
	Livre aléatoire
</h3>

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