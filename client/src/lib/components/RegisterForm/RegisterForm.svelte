<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import Checkbox from "../ui/Checkbox.svelte";
    import { registerUser } from "../../../../services/auth.service.js";

    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";

    $: console.log({ username, email, password, confirmPassword });

</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Créer un compte </h1>
<p class="text-center">Pseudo</p>
<Input bind:value={username}/>

<p class="text-center">Email</p>
<Input bind:value={email}/>

<p class="text-center">Mot de passe</p>
<PasswordInput bind:value={password}/>

<p class="text-center">Confirmer le mot de passe</p>
<PasswordInput bind:value={confirmPassword}/>

<Checkbox />
<Button> Créer un compte </Button>
<p class="text-center text-sm mt-4">
    Vous avez déjà un compte ? <a href="/#/login" class="text-[#590212] hover:underline">Connectez-vous</a>
</p>
