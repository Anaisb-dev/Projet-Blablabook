<script>
    import SearchBar from "../ui/SearchBar.svelte";
    import BookGrid from "./BookGrid.svelte";

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
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Bibliothèque </h1>

<div class="flex justify-center mb-10">
    <SearchBar on:search={(e) => handleSearch(e.detail.query)} />
</div>

<BookGrid {books} />