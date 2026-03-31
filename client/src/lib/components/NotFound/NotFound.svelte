<script>
    import Button from "../ui/Button.svelte";
</script>

<div class="flex flex-col items-center justify-center border p-4 rounded-xl bg-white mt-10 ml-5 mr-6 lg:w-2/3 lg:mx-auto">

    <h1 class="text-2xl font-bold mb-4 text-center p-10">404 — Oops ! Anomalie dans le livre</h1>
    <img src="404.png" alt="Page non trouvée" class="w-1/1 md:w-1/2 lg:w-1/3" />
    <p class="text-center mb-3">Il semblerait que cette page ait été victime d’un sortilège de disparition, ou peut-être a-t-elle été emportée par une tempête de pixels. Quoi qu’il en soit, elle est introuvable.</p>
    <p class="text-center">Mais ne vous inquiétez pas, il existe de nombreux autres pages passionnantes à découvrir dans notre bibliothèque. Pourquoi ne pas explorer d’autres sections ou revenir à la page d’accueil pour trouver votre prochaine lecture ?</p>

    <div class="lg:flex lg:items-center lg:justify-center lg:mt-4 lg:gap-4">
        <Button><a href="/">Revenir à l’accueil</a></Button>
        <Button><a href="/#/books">Explorer la bibliothèque</a></Button>
    </div>
</div>
