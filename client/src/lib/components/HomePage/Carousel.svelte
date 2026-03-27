<script>

	// vitesse de défilement en ms 
	export let autoplay = 3000; // 3 secondes par défaut

	// nombre d'images visibles en même temps
	export let itemsVisible = 3;

	// nombre total d'éléments dans le carrousel
	export let totalItems = 0;

	let currentIndex = 0;
	let intervalId;


	// function pour aller à la slide suivante
	function next() {
    if (totalItems <= 0) return;

		// on avance, et si on dépasse la dernière "page" on revient au début
	const maxIndex = Math.max(totalItems - itemsVisible, 0);
    currentIndex = currentIndex + 1;
    if (currentIndex > maxIndex) {
    	currentIndex = 0;
    	}
	}

	// function pour aller à la slide précédente
	function prev() {
    if (totalItems <= 0) return;

    const maxIndex = Math.max(totalItems - itemsVisible, 0);
    // on recule, et si on passe avant 0 on revient à la dernière "page"
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
    	currentIndex = maxIndex;
    }
	}

	//lancement de l'autoplay
	$:{
		clearInterval(intervalId);
		if ( autoplay>0){
			intervalId =  setInterval(()=>{
				next();
			}, autoplay);
		}
	}
</script>
<!--bouton gauche et droite -->
<div class="carousel">
	<button class="nav left" on:click={prev} aria-label="Précedent">‹</button>
	<button class="nav right" on:click={next} aria-label="Suivant">›</button>

	<!-- CONTENU DU CARROUSEL à modifier dans HomePage.svelte dans <Carousel> ... </Carousel>  -->
	<div class="track"
 		style={`grid-auto-columns: calc(100% / ${itemsVisible}); transform: translateX(-${currentIndex * (100 / itemsVisible)}%);`}>
		<slot />
	</div>
</div>


<style>
	.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
	}

	/* Bande qui contient les slides */
	.track {
    display: grid;
    grid-auto-flow: column;
    transition: transform 0.4s ease;
	}

	/* Boutons gauche / droite */
	.nav {
    position: absolute;
    top: 50%;
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
	}

	.nav.left {
    left: 8px;
	}

	.nav.right {
    right: 8px;
	}
</style>