<script>
  import Layout from "./lib/components/layout/Layout.svelte";
  import LibrarySection from "./lib/components/LibrarySection/LibrarySection.svelte";
  import { onMount } from "svelte";
  import { searchBooks, getRandomBooks } from "../services/bookService.js";

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

<Layout>
  <LibrarySection />

  <h1>BlablaBook</h1>

  <input
    type="text"
    bind:value={query}
    placeholder="Rechercher un livre..."
  />

  <button on:click={handleSearch}>
    Rechercher
  </button>

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
</Layout>
