<!-- JS -->
<script>
  import Layout from "./lib/components/layout/Layout.svelte";
  import BookGrid from "./lib/components/LibrarySection/BookGrid.svelte";
  import Searchbar from "./lib/components/layout/searchbar.svelte";
</script>

<!-- HTML -->
<Layout />

<main class="p-4 max-w-3xl mx-auto">
  <Searchbar />
  <BookGrid />
</main>
