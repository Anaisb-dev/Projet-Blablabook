<script>
    import { onMount, onDestroy } from "svelte";

	export let autoplay = 3000;
	export let itemsVisible = 4;
	export let totalItems = 0;

	let currentIndex = 0;
	let intervalId;
	let currentItemsVisible = itemsVisible;

	// Breakpoints responsifs
	function updateItemsVisible() {
		if (typeof window === "undefined") return;
		if (window.innerWidth < 480) {
			currentItemsVisible = 1;      // Mobile : 1 carte centrée
		} else if (window.innerWidth < 768) {
			currentItemsVisible = 2;      // Petite tablette : 2 cartes
		} else if (window.innerWidth < 1024) {
			currentItemsVisible = 3;      // Tablette : 3 cartes
		} else {
			currentItemsVisible = itemsVisible; // Desktop : 4 cartes
		}
	}

	onMount(() => {
		updateItemsVisible();
		window.addEventListener("resize", updateItemsVisible);
	});

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("resize", updateItemsVisible);
		}
		clearInterval(intervalId);
	});

	function next() {
		if (totalItems <= 0) return;
		const maxIndex = Math.max(totalItems - currentItemsVisible, 0);
		currentIndex = currentIndex + 1;
		if (currentIndex > maxIndex) currentIndex = 0;
	}

	function prev() {
		if (totalItems <= 0) return;
		const maxIndex = Math.max(totalItems - currentItemsVisible, 0);
		currentIndex = currentIndex - 1;
		if (currentIndex < 0) currentIndex = maxIndex;
	}

	$: {
		clearInterval(intervalId);
		if (autoplay > 0) {
			intervalId = setInterval(() => { next(); }, autoplay);
		}
	}

	// Calcul de la largeur de chaque carte selon le nombre visible
	// On soustrait le gap total réparti entre les cartes
	$: cardWidth = `calc(${100 / currentItemsVisible}% - ${(currentItemsVisible - 1) * 12 / currentItemsVisible}px)`;
	$: translateX = `translateX(calc(-${currentIndex * (100 / currentItemsVisible)}% - ${currentIndex * 12 / currentItemsVisible * (currentItemsVisible - 1)}px))`;
</script>

<div class="carousel">
	<button class="nav left" on:click={prev} aria-label="Précédent">‹</button>
	<button class="nav right" on:click={next} aria-label="Suivant">›</button>

	<div
		class="track"
		style={`grid-auto-columns: ${cardWidth}; transform: translateX(-${currentIndex * (100 / currentItemsVisible)}%);`}
	>
		<slot />
	</div>
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		overflow: hidden;
		padding: 0 2rem;
		box-sizing: border-box;
	}

	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 25%;
		gap: 12px;
		height: 450px;
	}

	.nav {
		position: absolute;
		top: 40%;
		transform: translateY(-50%);
		width: 32px;
		height: 32px;
		border-radius: 9999px;
		border: none;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		font-size: 1.2rem;
	}

	.nav.left { left: 4px; }
	.nav.right { right: 4px; }
</style>