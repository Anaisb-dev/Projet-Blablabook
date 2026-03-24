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

<SearchBar on:search={(e) => handleSearch(e.detail.query)} />
<BookGrid {books}/>

<!-- <h1>BlablaBook</h1>

<input type="text" bind:value={query} placeholder="Rechercher un livre..." />

<button onclick={handleSearch}> Rechercher </button>

{#if loading}
    <p>Chargement...</p>
{/if}


{#if books.length > 0}
    <div>
        {#each books as book}
            <div style="border:1px solid #ccc; margin:10px; padding:10px;">
                <h3>{book.title}</h3>

                {#if book.cover_image}
                    <img src={book.cover_image} alt="cover" width="100" />
                {/if}

                <p><strong>Année :</strong> {book.year}</p>
                <p><strong>Pages :</strong> {book.page_number}</p>

                <p>{book.summary}</p>
            </div>
        {/each}
    </div>
{/if} 




    let query = "";
    let books = [];
    let loading = false;

    async function handleSearch() {
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

<SearchBar />
<BookGrid {books}/>

<h1>BlablaBook</h1>

<input type="text" bind:value={query} placeholder="Rechercher un livre..." />

<button onclick={handleSearch}> Rechercher </button>

{#if loading}
    <p>Chargement...</p>
{/if}



{#if books.length > 0}
    <div>
        {#each books as book}
            <div style="border:1px solid #ccc; margin:10px; padding:10px;">
                <h3>{book.title}</h3>

                {#if book.cover_image}
                    <img src={book.cover_image} alt="cover" width="100" />
                {/if}

                <p><strong>Année :</strong> {book.year}</p>
                <p><strong>Pages :</strong> {book.page_number}</p>

                <p>{book.summary}</p>
            </div>
        {/each}
    </div>
{/if} 
 --> 
