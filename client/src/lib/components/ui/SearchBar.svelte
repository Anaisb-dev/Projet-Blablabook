<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let query = "";

  function handleInput() {
    dispatch("search", { query });
  }
  
  function handleSubmit() {
    dispatch("search", { query });
  }
</script>

<div class="relative w-full max-w-md">
  <input
    type="text"
    bind:value={query}
    on:input={handleInput}
    placeholder="Rechercher un livre..."
    class="border rounded w-full py-2 pl-3 pr-10"
  />

  <button
    type="button"
    on:click={handleSubmit}
    class="absolute inset-y-0 right-2 my-auto flex items-center justify-center text-gray-500 hover:text-gray-700"
    aria-label="Rechercher"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="6" />
      <line x1="16" y1="16" x2="21" y2="21" />
    </svg>
  </button>
</div>