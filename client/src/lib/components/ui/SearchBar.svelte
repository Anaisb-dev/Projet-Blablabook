<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let query = "";

  function handleInput() {
    dispatch("search", { query });
  }
</script>

<input
  type="text"
  bind:value={query}
  on:input={handleInput}
  placeholder="Rechercher un livre..."
  class="border rounded px-3 py-2 w-full"
/>