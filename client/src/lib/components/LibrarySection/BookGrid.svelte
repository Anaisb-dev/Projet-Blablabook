<script>
	import { onMount } from "svelte";
	import api from "../../api.js";
	import { createEventDispatcher } from "svelte";
	import BookCard from "../ui/BookCard.svelte";
	import PopUp from "../ui/PopUp.svelte";
	import Icon from "@iconify/svelte";
	import { addBookToPersonalLibrary } from "../../../../services/bookService.js";
	import { authStore } from "../store/auth.svelte";
	import { AlertDialog } from "bits-ui";

	// Données des livres à afficher depuis l'API Google Books
	export let books = [];

	// Livres de la bibliothèque personnelle de l'utilisateur
	let userBooks = [];

	// Affiche un message d'authentification si l'utilisateur n'est pas connecté
	let showAuthPopUp = false;

	// Affiche un message de confirmation après ajout d'un livre
	let showPopup = false;
	let popupMessage = "";

	const dispatch = createEventDispatcher();

	function handleSelect(event) {
		dispatch("select", event.detail); // remonte l'id au parent
	}
	async function handleAdd(googleBookId) {
		// Si l'utilisateur n'est pas connecté, on affiche un message d'authentification
		if (!authStore.user) {
			showAuthPopUp = true;
			return;
		}

		// sinon, on ajoute le livre à la bibliothèque personnelle
		try {
			await addBookToPersonalLibrary(googleBookId);

			// Mise à jour de la liste des livres de l'utilisateur pour afficher le status du livre ajouté
			userBooks = await api("/api/users/books", "GET");

			popupMessage = "Livre ajouté !";
			showPopup = true;
		} catch (e) {
			console.error(e);

			popupMessage = "Erreur lors de l'ajout";
			showPopup = true;
		}
	}

	// Création d'une map pour accéder rapidement au status des livres de l'utilisateur 
	$: userBooksMap = new Map(userBooks.map(b => [b.google_book_id, b]));
	// Cette ligne crée une "Map" (comme un dictionnaire) à partir de userBooks
	// Elle permet de retrouver un livre instantanément avec son google_book_id
	// Exemple : userBooksMap.get("abc123") → retourne le livre correspondant
	// Le "$:" signifie que cette ligne se met à jour automatiquement à chaque fois que userBooks change (réactivité Svelte)


	// Récupération des livres de la bibliothèque personnelle de l'utilisateur pour afficher leur status
	onMount(async () => {
		if (authStore.user) {
			try {
				userBooks = await api("/api/users/books", "GET");
				console.log("USER BOOKS:", userBooks);
			} catch (e) {
				console.error(e);
			}
		}
	});
</script>

<div
	class="flex flex-wrap justify-center gap-6 p-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:max-w-[1400px] lg:mx-auto"
>
	{#if books.length === 0}
		<p class="text-gray-500">Aucun livre trouvé.</p>
	{/if}
	{#each books as book}
		<div class="relative">
			<BookCard
				id={book.id}
				googleBookId={book.google_book_id}
				title={book.title || book.volumeInfo?.title}
				author={book.authors?.join(", ") ||
					book.volumeInfo?.authors?.join(", ") ||
					"Auteur inconnu"}
				cover={book.cover_image ||
					book.volumeInfo?.imageLinks?.thumbnail}
				description={book.summary || book.volumeInfo?.description}
				on:select={handleSelect}
			/>

			<!-- Si le livre est déjà dans la bibliothèque de l'utilisateur, on affiche son status, sinon on affiche le bouton d'ajout -->
			{#if userBooksMap.get(book.google_book_id || book.id)}
				<div class="absolute top-2 right-2 z-10">
					<button
						class="w-[110px] h-[40px] rounded-xl border bg-white flex items-center justify-center"
					>
						{#if userBooksMap.get(book.google_book_id || book.id).status === "à lire"}
							<Icon icon="solar:book-bold" class="w-4 h-4 mr-1" />
							à lire
						{:else if userBooksMap.get(book.google_book_id || book.id).status === "en cours"}
							<Icon
								icon="mdi:book-open-page-variant"
								class="w-4 h-4 mr-1"
							/>
							en cours
						{:else if userBooksMap.get(book.google_book_id || book.id).status === "lu"}
							<Icon
								icon="garden:book-closed-fill-12"
								class="w-4 h-4 mr-1"
							/>
							lu
						{/if}
					</button>
				</div>
			{:else}
				<button
					//on:click={() => dispatch("add", { id: book.id })}
					on:click={() => handleAdd(book.google_book_id)}
					class="absolute top-2 right-2 z-10 w-8 h-8 rounded-xl bg-[#BF9075] text-white flex items-center justify-center shadow hover:scale-105 transition cursor-pointer hover:bg-[#590212]"
				>
					+
				</button>
			{/if}
		</div>
	{/each}

	<!-- Affichage du pop-up d'authentification si l'utilisateur n'est pas connecté -->
	<AlertDialog.Root bind:open={showAuthPopUp}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay
				class="fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex items-center justify-center"
			/>

			<AlertDialog.Content
				class="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50"
			>
				<button
					on:click={() => (showAuthPopUp = false)}
					class="absolute top-3 right-3 text-[#BF9075] hover:text-[#590212] text-xl cursor-pointer"
				>
					✕
				</button>

				<div class="flex flex-col gap-4 pb-6">
					<AlertDialog.Title class="text-lg font-bold text-center">
						Connexion requise
					</AlertDialog.Title>

					<AlertDialog.Description class="text-center">
						Tu dois être connecté pour ajouter un livre à ta
						bibliothèque.
					</AlertDialog.Description>
				</div>

				<div class="flex w-full items-center justify-center gap-2">
					<a
						href="/#/login"
						class="w-full text-center border rounded-lg p-2 text-white bg-[#BF9075] hover:bg-[#590212]"
					>
						Se connecter
					</a>
				</div>

				<div class="flex w-full mt-2">
					<a
						href="/#/register"
						class="w-full text-center border rounded-lg p-2 hover:bg-[#F2E0D0]"
					>
						S'inscrire
					</a>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
</div>

<!-- Affichage du pop-up de confirmation après ajout d'un livre -->
<PopUp
	message={popupMessage}
	show={showPopup}
	onClose={() => (showPopup = false)}
/>
