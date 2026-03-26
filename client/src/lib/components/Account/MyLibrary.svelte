<script>
    import Button from "../ui/Button.svelte";
    import Icon from "@iconify/svelte";   
</script>

<!-- Bouton A lire-->
<Button variant="iconText">
            <a href="/#/settings" class="flex items-center gap-2">
                <Icon icon="solar:book-bold" class="w-5 h-5" />
                À Lire
            </a>
</Button>

<!-- Bouton "En cours"-->
<Button variant="iconText">
            <a href="/#/settings" class="flex items-center gap-2">
                <Icon icon="mdi:book-open-page-variant" class="w-5 h-5" />
                En cours
            </a>
</Button>

<!-- Bouton "Lu"-->
<Button variant="iconText">
            <a href="/#/settings" class="flex items-center gap-2">
                <Icon icon="garden:book-closed-fill-12" class="w-5 h-5" />
                Lu
            </a>
</Button>

<!-- Bouton "Tous mes livres"-->
<Button variant="iconText">
            <a href="/#/settings" class="flex items-center gap-2">
                <Icon icon="glyphs:books-bold" class="w-5 h-5" />
                Tous mes livres
            </a>
</Button>

