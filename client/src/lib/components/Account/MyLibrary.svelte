<script>
    import Button from "../ui/Button.svelte";
    import Icon from "@iconify/svelte";
    import BookCard from "../ui/BookCard.svelte";
    import {fly} from "svelte/transition";

    let books = [
        {
            id: 1,
            cover: "book.jpg",
            title: "Atomic Habits",
            author: "James Clear",
            status: "to-read",
        },
        {
            id: 2,
            cover: "book.jpg",
            title: "Deep Work",
            author: "Cal Newport",
            status: "to-read",
        },
        {
            id: 3,
            cover: "book.jpg",
            title: "Clean Code",
            author: "Robert C. Martin",
            status: "reading",
        },
    ];

    // Filtre pour afficher les livres selon leur statut
    let activeFilter = "to-read";

    // Pour mettre à jour la liste des livres affichés en fonction du filtre actif
    $: filteredBooks =
        activeFilter === "all"
            ? books
            : books.filter((book) => book.status === activeFilter);

    // Variables et Fonction pour supprimer un livre de la bibliothèque et avoir un message d'annulation de suppression
    let lastDeletedBook = null;
    let showDeleteMessage = false;
    let progressBar = 100;

    function deleteBook(id) {
        const bookToDelete = books.find((book) => book.id === id); // Trouve le livre à supprimer pour pouvoir le remettre en ligne si besoin

        lastDeletedBook = bookToDelete; // Stocke le livre supprimé pour pouvoir le remettre en ligne si besoin

        books = books.filter((book) => book.id !== id); // Supprime le livre de la liste des livres

        showDeleteMessage = true; // Affiche le message de suppression
        
        const interval = setInterval(() => {
		progressBar -= 2; // vitesse (100 → 0 en ~5s)

		if (progressBar <= 0) {
			clearInterval(interval);
		}
	}, 100);

        setTimeout(() => {
            showDeleteMessage = false;
            lastDeletedBook = null;
        }, 5000); // Cache le message de suppression après 5 secondes et réinitialise le livre supprimé
    }

    // Remettre en ligne le livre qui vient d'être supprimé
    function restoreDeletedBook() {
	if (lastDeletedBook) {
		books = [...books, lastDeletedBook];
	}

	showDeleteMessage = false;
	lastDeletedBook = null;
}
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-3 justify-items-center w-fit mx-auto"
>
    <!-- À lire -->
    <Button
        variant="iconText"
        active={activeFilter === "to-read"}
        on:click={() => (activeFilter = "to-read")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="solar:book-bold" class="w-5 h-5" />
            À lire
        </div>
    </Button>

    <!-- En cours -->
    <Button
        variant="iconText"
        active={activeFilter === "reading"}
        on:click={() => (activeFilter = "reading")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="mdi:book-open-page-variant" class="w-5 h-5" />
            En cours
        </div>
    </Button>

    <!-- Lu -->
    <Button
        variant="iconText"
        active={activeFilter === "finished"}
        on:click={() => (activeFilter = "finished")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="garden:book-closed-fill-12" class="w-5 h-5" />
            Lu
        </div>
    </Button>

    <!-- Tous -->
    <Button
        variant="iconText"
        active={activeFilter === "all"}
        on:click={() => (activeFilter = "all")}
    >
        <div class="flex items-center gap-2 cursor-pointer cursor-pointer">
            <Icon icon="glyphs:books-bold" class="w-5 h-5" />
            Tous mes livres
        </div>
    </Button>
</div>

<div
    class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-3 justify-items-center w-fit mx-auto mt-10 mb-20"
>
    {#each filteredBooks as book}
        <div class="relative">
            <BookCard {...book} />
            <button
                class="absolute top-2 right-2 z-10 w-[40px] h-[40px] rounded-xl border bg-white flex items-center justify-center hover:bg-[#F2E0D0] cursor-pointer"
                on:click={() => deleteBook(book.id)}
            >
                <Icon icon="iconamoon:trash-light" class="w-5 h-5" />
            </button>
        </div>
    {/each}
</div>

<!-- Message de suppression -->
{#if showDeleteMessage}
	<div 
        in:fly={{ y: 20, duration: 300 }}
        out:fly={{ y: -20, duration: 300 }}
        class="fixed bottom-5 right-5 bg-[#590212] text-white px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg">
            <span>Le livre "{lastDeletedBook.title}" a été supprimé de votre bibliothèque</span>
            <button class="underline" on:click={restoreDeletedBook}>
                Annuler
            </button>

            <!-- Barre de progression -->
		<div class="w-full h-[4px] bg-gray-300 rounded overflow-hidden">
			<div
				class="h-full bg-[#F2E0D0] transition-all duration-100"
				style="width: {progressBar}%"
			></div>
		</div>
	</div>
{/if}