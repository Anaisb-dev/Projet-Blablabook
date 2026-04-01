<script>
    import Input from "../ui/Input.svelte";
    import TextArea from "../ui/TextArea.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import PopUp from "../ui/PopUp.svelte";
    import { push } from "svelte-spa-router"; // Pour permettre de retourner à la bibliothèque après modification des infos
    import { AlertDialog } from "bits-ui";
    import { authStore } from "../store/auth.svelte";
    import { updateUser } from "../../../../services/user.services.js";
    import { updatePassword } from "../../../../services/user.services.js";


    // Stocker les informations originelles de l'utilisateur, utilisé pour réinitialiser le formulaire en cas d'erreur de validation
    let originalUser = $state({
    username: "",
    last_name: "",
    first_name: "",
    email: "",
    bio: ""
    });

    // Stocker les informations de l'utilisateur et contrôler l'ouverture du dialogue de confirmation de suppression de compte
    let user = $state({
    username: "",
    last_name: "",
    first_name: "",
    email: "",
    bio: ""
    });

    let newPassword = $state(""); // Nouveau mot de passe
    let confirmNewPassword = $state(""); // Confirmer le nouveau mot de passe 
    let passwordError = $state("");
    let open = $state(false); // État pour contrôler l'ouverture du dialogue de confirmation de suppression de compte
    let isDeleted = $state(false); // État pour indiquer si le compte a été supprimé, utilisé pour afficher un message de confirmation après suppression

    let showUpdatePopUp = $state(false); // Affichage de la pop-up 
    let updateMessage = $state(""); // Texte afficher dans la pop-up

    // Fonction pour retourner à la bibliothèque
    function goToLibrary() {
        push(`/profile`); 
    }

    // Simuler la récupération des données utilisateur depuis le store authStore
    $effect(() => {
    if (authStore.user) {
        const data = {
            username: authStore.user.username || "",
            last_name: authStore.user.last_name || "",
            first_name: authStore.user.first_name || "",
            email: authStore.user.email || "",
            bio: authStore.user.bio || ""
        };

        user = data; // pré-remplir le formulaire avec les données de l'utilisateur
        originalUser = data; // stocker les données originales pour pouvoir les réinitialiser en cas d'annulation
    }
});

    // Fonction pour gérer la mise à jour des informations utilisateur
    async function handleUpdate() {
        // Validation pour s'assurer que les champs obligatoires sont remplis avant de tenter de mettre à jour le profil
    if (!user.email.trim() || !user.username.trim()) {
        showUpdateMessage("Le pseudo et l’email sont obligatoires.");
        user = { ...originalUser }; // Réinitialiser les champs du formulaire avec les données originales en cas d'erreur de validation
        return;
    }
    try {
        await updateUser(user);
        showUpdateMessage("Profil mis à jour !");
    } catch (err) {
        console.error(err);
        showUpdateMessage("Erreur lors de la mise à jour");
    }
}

    // Fonction pour la gestion de la pop-up de confirmation de modifications des informations
    function showUpdateMessage(message) {
        updateMessage = message;
        showUpdatePopUp = true;

        setTimeout(() => {
            showUpdatePopUp = false;
        }, 3000);
    }


    // Fonction dédié à la modification du mot de passe
    async function handlePasswordUpdate() {
        passwordError = "";

        const error = validatePassword(newPassword);

        if (error) {
            passwordError = error;
            return;
        }

        if (!confirmNewPassword) {
            passwordError = "Veuillez confirmer votre mot de passe";
            return;
        }

        if (newPassword !== confirmNewPassword) {
            passwordError = "Les mots de passe ne correspondent pas";
            return;
        }

        try {
            await updatePassword(newPassword, confirmNewPassword);

            showUpdateMessage("Mot de passe mis à jour avec succès");

            newPassword = "";
            confirmNewPassword = "";
            passwordError = "";

        } catch (err) {
            console.error(err);
            passwordError = "Erreur lors de la mise à jour du mot de passe";
        }
    }
// Fonction qui vérifie si le ,nouveau mot de passe respecte les regex
function validatePassword(password) {
    if (!password) return "Veuillez saisir un mot de passe";

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*._-]).{8,}$/;

    if (!regex.test(password)) {
        return "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial (@*._-)";
    }

    return "";
}


// Fonction de suppression de compte
    function handleDeleteAccount() {
        isDeleted = true;
    }
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10">Mes informations</h1>

<button class="mt-4 underline p-4 cursor-pointer" onclick={goToLibrary}>
    ←Retourner dans Ma Bibliothèque
</button>

<div class="border p-4 rounded-xl bg-white mt-10 ml-5 mr-6 lg:w-2/3 lg:mx-auto">
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

    <Button on:click={handleUpdate}>
    Enregistrer les modifications
    </Button>
</div>

<div class="border p-4 rounded-xl bg-white mt-10 ml-5 mr-6 lg:w-2/3 lg:mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-center pb-1">
        Modifier mon mot de passe
    </h2>

    <p class="text-center">Nouveau mot de passe</p>
    <PasswordInput bind:value={newPassword} />
    {#if passwordError}
        <p class="text-red-500 text-sm mt-2 text-center">
            {passwordError}
        </p>
    {/if}

    <p class="text-center">Confirmer le nouveau mot de passe</p>
    <PasswordInput bind:value={confirmNewPassword} />

    <Button on:click={handlePasswordUpdate}>Modifier le mot de passe</Button>
</div>

<div class="flex items-center justify-center">
    <button
        class="mt-10 w-[250px] rounded-xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] flex items-center justify-center mx-auto cursor-pointer hover:bg-[#590212]"
        onclick={() => open = true}
    >
        Supprimer mon compte
    </button>

    <AlertDialog.Root bind:open>
        <AlertDialog.Portal>
            <AlertDialog.Overlay class="fixed inset-0 bg-black/80" />

            <AlertDialog.Content class="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
                {#if !isDeleted}
                    <div class="flex flex-col gap-4 pb-6">
                        <AlertDialog.Title class="text-lg font-bold text-center">
                            Supprimer mon compte
                        </AlertDialog.Title>

                        <AlertDialog.Description class="text-center">
                            Cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?
                        </AlertDialog.Description>
                    </div>

                    <div class="flex w-full items-center justify-center gap-2">
                        <AlertDialog.Cancel
                            class="w-full border rounded-lg p-2 cursor-pointer hover:bg-[#F2E0D0]"
                        >
                            Annuler
                        </AlertDialog.Cancel>

                        <button
                            class="w-full border rounded-lg p-2 cursor-pointer text-white bg-[#BF9075] hover:bg-[#590212]"
                            onclick={handleDeleteAccount}
                        >
                            Supprimer mon compte
                        </button>
                    </div>
                {:else}
                    <div class="flex flex-col gap-4 pb-6">
                        <AlertDialog.Title class="text-lg font-bold text-center">
                            Compte supprimé
                        </AlertDialog.Title>

                        <AlertDialog.Description class="text-center">
                            Votre compte a bien été supprimé.
                        </AlertDialog.Description>
                    </div>

                    <div class="flex w-full items-center justify-center">
                        <button
                            class="w-full border rounded-lg p-2 cursor-pointer text-white bg-[#BF9075] hover:bg-[#590212]"
                            onclick={() => push("/")}
                        >
                            Retour à l’accueil
                        </button>
                    </div>
                {/if}
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
</div>

<!-- Gestion de l'affichage de la pop-up indiquant le statut des modifications  -->
<PopUp
    message={updateMessage}
    show={showUpdatePopUp}
    onClose={() => showUpdatePopUp = false}
/>

