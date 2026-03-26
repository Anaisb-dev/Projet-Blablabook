<script>
    import SearchBar from "../ui/SearchBar.svelte";
    import BookGrid from "./BookGrid.svelte";
    import BookDetail from "./BookDetail.svelte";

    import { onMount } from "svelte";
    import {
        searchBooks,
        getRandomBooks,
    } from "../../../../services/bookService.js";

    let query = "";
    let books = [];
    let loading = false;
    let selectedBookId = null; // id du livre sélectionné

    async function handleSearch(query) {
        if (!query) return;

        loading = true;
        books = await searchBooks(query);
        loading = false;
    }
    // on récupère l'id envoyé par BookGrid
    function handleSelect(event) {
        selectedBookId = event.detail.id;
    }

    function handleBack() {
        selectedBookId = null; // on revient à la liste
    }

    // Chargement automatique
    onMount(async () => {
        loading = true;
        books = await getRandomBooks();
        loading = false;
    });
</script>

{#if selectedBookId}
    <BookDetail bookId={selectedBookId} on:back={handleBack} />
{:else}
    <h1 class="text-2xl font-bold mb-4 text-center p-10"> Bibliothèque </h1>
    <SearchBar on:search={(e) => handleSearch(e.detail.query)} />
    <BookGrid {books} on:select={handleSelect} />
{/if}