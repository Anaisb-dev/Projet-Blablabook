<script>
    import { onMount, onDestroy } from "svelte";

	// vitesse de défilement en ms 
	export let autoplay = 3000;

	// nombre d'images visibles en même temps (valeur par défaut sur grand écran)
	export let itemsVisible = 4;

	// nombre total d'éléments dans le carrousel
	export let totalItems = 0;

	let currentIndex = 0;
	let intervalId;
	let currentItemsVisible = itemsVisible;

	// Met à jour le nombre de cartes visibles selon la largeur d'écran
	function updateItemsVisible() {
		if (typeof window === "undefined") return;
		if (window.innerWidth < 480) {
			currentItemsVisible = 1; // mobile : 1 carte
		} else if (window.innerWidth < 768) {
			currentItemsVisible = 2; // petite tablette : 2 cartes
		} else if (window.innerWidth < 1024) {
			currentItemsVisible = 3; // tablette : 3 cartes
		} else {
			currentItemsVisible = itemsVisible; // desktop : valeur par défaut (4)
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
</script>

<div class="carousel">
	<button class="nav left" on:click={prev} aria-label="Précédent">‹</button>
	<button class="nav right" on:click={next} aria-label="Suivant">›</button>

	<div
		class="track"
		style={`grid-auto-columns: calc(${100 / currentItemsVisible}% - ${(currentItemsVisible - 1) * 16 / currentItemsVisible}px); transform: translateX(-${currentIndex * (100 / currentItemsVisible)}%);`}
	>
		<slot />
	</div>
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		overflow: hidden;
		padding: 0 2.5rem;
		box-sizing: border-box;
	}

	.track {
		display: grid;
		grid-auto-flow: column;
		gap: 1rem;
		transition: transform 0.4s ease;
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