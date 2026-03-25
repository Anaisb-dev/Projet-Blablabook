<script>
    import { createEventDispatcher } from "svelte";
    import SearchBar from "../ui/SearchBar.svelte";
    import BookGrid from "./BookGrid.svelte";

    const dispatch = createEventDispatcher();

    function handleSearch(event) {
        // Propage l'événement search vers le parent (App.svelte)
        dispatch("search", event.detail);
    }
</script>

<SearchBar on:search={handleSearch} />
<BookGrid />