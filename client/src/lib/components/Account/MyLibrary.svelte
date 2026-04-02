<script>
    import { onMount } from "svelte";
    import { authStore } from "../store/auth.svelte";
    import api from "../../api.js";
    import { deleteBookFromPersonalLibrary } from "../../../../services/bookService.js";

    import Button from "../ui/Button.svelte";
    import Icon from "@iconify/svelte";
    import BookCard from "../ui/BookCard.svelte";
    import { fly } from "svelte/transition";

    let user = null;
    let books = [];
    let activeFilter = "to-read";
    let lastDeletedBook = null;
    let showDeleteMessage = false;
    let progressBar = 0;
    let interval;
    let startTime;
    const duration = 5000;

    onMount(async () => {
        // authStore
        if (!authStore.user) {
            window.location.href = "/#/login";
            return;
        }

        user = authStore.user;

        try {
            // route
            const data = await api("/users/books", "GET");
            console.log("BOOKS API :", data);
            books = data;
        } catch (err) {
            console.error("Erreur récupération livres :", err);
        }
    });

    // Filtre
    $: filteredBooks =
        activeFilter === "all"
            ? books
            : books.filter((book) => book.status === activeFilter);

    async function deleteBook(id) {
    const bookToDelete = books.find((book) => book.id === id);
    lastDeletedBook = bookToDelete;

    // suppression visuelle immédiate
    books = books.filter((book) => book.id !== id);

    showDeleteMessage = true;
    progressBar = 0;
    startTime = Date.now();

    clearInterval(interval);

    interval = setInterval(() => {
        const timePassed = Date.now() - startTime;
        progressBar = (timePassed / duration) * 100;

        if (progressBar >= 100) clearInterval(interval);
    }, 50);

    // appel backend après délai
    setTimeout(async () => {
        if (lastDeletedBook) {
            try {
                await deleteBookFromPersonalLibrary(id);
                console.log("Suppression backend OK");
            } catch (e) {
                console.error("Erreur suppression backend :", e);
            }
        }

        showDeleteMessage = false;
        lastDeletedBook = null;
        clearInterval(interval);
    }, duration);
}

    // annuler suppression
    function restoreDeletedBook() {
        if (lastDeletedBook) {
            books = [...books, lastDeletedBook];
        }

        showDeleteMessage = false;
        lastDeletedBook = null;
    }


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
        variant="myLibraryButton"
        active={activeFilter === "à lire"}
        on:click={() => (activeFilter = "à lire")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="solar:book-bold" class="w-5 h-5" />
            À lire
        </div>
    </Button>

    <!-- En cours -->
    <Button
        variant="myLibraryButton"
        active={activeFilter === "en cours"}
        on:click={() => (activeFilter = "en cours")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="mdi:book-open-page-variant" class="w-5 h-5" />
            En cours
        </div>
    </Button>

    <!-- Lu -->
    <Button
        variant="myLibraryButton"
        active={activeFilter === "lu"}
        on:click={() => (activeFilter = "lu")}
    >
        <div class="flex items-center gap-2 cursor-pointer">
            <Icon icon="garden:book-closed-fill-12" class="w-5 h-5" />
            Lu
        </div>
    </Button>

    <!-- Tous les livres -->
    <Button
        variant="myLibraryButton"
        active={activeFilter === "all"}
        on:click={() => (activeFilter = "all")}
    >
        <div class="flex items-center gap-2 cursor-pointer cursor-pointer">
            <Icon icon="glyphs:books-bold" class="w-5 h-5" />
            Tous mes livres
        </div>
    </Button>
</div>

<!--Affichage des livres et bouton de suppression-->
<div
    class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-3 justify-items-center w-fit mx-auto mt-10 mb-20"
>
    {#each filteredBooks as book}
        <div class="relative">
            <BookCard
                id={book.id}
                googleBookId={book.google_book_id}
                title={book.title}
                author={book.authors
                    ?.map((a) => a.first_name + " " + a.last_name)
                    .join(", ")}
                cover={book.cover_image || book.cover}
                description={book.summary}
            />
            <button
                class="absolute top-2 right-2 z-10 w-[40px] h-[40px] rounded-xl border bg-white flex items-center justify-center hover:bg-[#F2E0D0] cursor-pointer"
                on:click={() => deleteBook(book.id)}
            >
                <Icon icon="iconamoon:trash-light" class="w-5 h-5" />
            </button>
        </div>
    {/each}
</div>

<!-- Message de suppression avec annulation et barre de progression -->
{#if showDeleteMessage}
    <div
        in:fly={{ y: 20, duration: 300 }}
        out:fly={{ y: -20, duration: 300 }}
        class="fixed bottom-5 right-5 bg-[#590212] text-white px-4 py-3 rounded-lg shadow-lg w-[300px]"
    >
        <div class="flex items-center justify-between">
            <span>Le livre "{lastDeletedBook.title}" a été supprimé</span>
            <button
                class="underline cursor-pointer"
                on:click={restoreDeletedBook}
            >
                Annuler
            </button>
        </div>
        <div class="w-full h-[4px] bg-[#2A0D14] rounded overflow-hidden mt-2">
            <div
                class="h-full bg-[#FF6B6B] transition-all duration-50"
                style="width: {progressBar}%"
            ></div>
        </div>
    </div>
{/if}
