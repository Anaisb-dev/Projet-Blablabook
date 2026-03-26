<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Connexion</h1>

<p class="text-center">Email ou pseudo</p>
<Input placeholder="Entrez votre email"/>

<p class="text-center">Mot de passe</p>
<PasswordInput/>
<p class="text-center text-sm hover:underline"><a href="/#">Mot de passe oublié ?</a></p>
<br>
<Button> Se connecter </Button>
