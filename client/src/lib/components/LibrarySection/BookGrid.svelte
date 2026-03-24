<script>
    import BookCard from "../ui/BookCard.svelte";

// données fake (temporaire)
	const books = [
	{
		title: "Atomic Habits",
		author: "James Clear",
		cover: "/book.jpg",
		description: "Un livre sur l'amélioration des habitudes."
	},
	{
		title: "Deep Work",
		author: "Cal Newport",
		cover: "/book.jpg",
		description: "Un livre sur la concentration."
	}, 
    {
		title: "Deep Work",
		author: "Cal Newport",
		cover: "/book.jpg",
		description: "Un livre sur la concentration."
	}
];
</script>

<div class="flex flex-wrap justify-center gap-6 p-4">
	{#each books as book}
		<BookCard {...book} />
	{/each}
</div>