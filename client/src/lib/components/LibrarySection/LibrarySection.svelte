<script>
    import SearchBar from "../ui/SearchBar.svelte";
    import BookGrid from "./BookGrid.svelte";
    import BookDetail from "./BookDetail.svelte";
    import { addBookToPersonalLibrary } from "../../../../services/bookService.js";

    import { onMount } from "svelte";
    import {
        searchBooks,
        getRandomBooks,
    } from "../../../../services/bookService.js";

    let query = "";
    let books = [];
    let loading = false;

    async function handleSearch(query) {
        if (!query) return;

        loading = true;
        books = await searchBooks(query);
        loading = false;
    }
    // Chargement automatique
    onMount(async () => {
        loading = true;
        books = await getRandomBooks();
        loading = false;
    });

    async function handleAdd(event) {
    const id = event.detail.id;

    try {
        await addBookToPersonalLibrary(id);
        alert("Livre ajouté !");
    } catch (e) {
        console.error(e);
        alert("Erreur ajout");
    }
}
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Bibliothèque </h1>

<div class="flex justify-center mb-10">
    <SearchBar on:search={(e) => handleSearch(e.detail.query)} />
    </div>
{#if books.length > 0}
    <BookGrid {books} on:select={handleSelect} on:add={handleAdd} />
{/if}
