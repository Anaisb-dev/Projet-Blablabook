<script>
    import Button from "../ui/Button.svelte";
    import Icon from "@iconify/svelte";
    import { authStore } from "../store/auth.svelte";   

    const bio =
        "Passionné de lecture et de voyages. J'aime découvrir de nouveaux auteurs et partager mes coups de cœur littéraires avec mes amis.";
</script>

<div class="border p-4 rounded-xl w-2/3 mx-auto bg-white">
    <h2 class="font-bold text-lg">
        {authStore.user?.username || "Utilisateur"}
    </h2>
    <div class="flex justify-between items-center gap-4">
        <p class="text-sm text-gray-600 text-justify flex-1">{bio}</p>
        <Button variant="icon">
            <a href="/#/settings">
                <Icon icon="ph:pencil-thin" />
            </a>
        </Button>
    </div>
</div>
