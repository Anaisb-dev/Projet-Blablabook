<script>
    import Input from "../ui/Input.svelte";
    import TextArea from "../ui/TextArea.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";

    // Faux utilisateur
    let user = {
    username: "johndoe",
    last_name: "Doe",
    first_name: "John",
    email: "john.doe@gmail.com",
    bio: "Passionné de lecture et de voyages. J'aime découvrir de nouveaux auteurs et partager mes coups de cœur littéraires avec mes amis."
};
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Mes informations </h1>
<div class="border p-4 rounded-xl w-2/3 mx-auto bg-white">
    <p class="text-center">Email</p>
    <Input bind:value={user.email} />
    <p class="text-center">Pseudo</p>
    <Input bind:value={user.username} />
    <p class="text-center">Nom</p>
    <Input bind:value={user.last_name} />
    <p class="text-center">Prénom</p>
    <Input bind:value={user.first_name} />
    <p class="text-center">Bio</p>
    <TextArea bind:value={user.bio} />
    <Button> Enregistrer les modifications </Button>
</div>

<div class="border p-4 rounded-xl w-2/3 mx-auto bg-white mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center  pb-1">Modifier mon mot de passe</h2>
    <p class="text-center">Nouveau mot de passe</p>
    <PasswordInput />
    <p class="text-center">Confirmer le nouveau mot de passe</p>
    <PasswordInput />
    <Button>Modifier le mot de passe</Button>
</div>

<Button>Supprimer mon compte</Button>