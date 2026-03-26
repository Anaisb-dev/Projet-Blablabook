<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import Checkbox from "../ui/Checkbox.svelte";
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10"> Créer un compte </h1>
<p class="text-center">Pseudo</p>
<Input placeholder="Entrez votre pseudo"/>

<p class="text-center">Email</p>
<Input placeholder="Entrez votre email"/>

<p class="text-center">Mot de passe</p>
<PasswordInput/>

<p class="text-center">Confirmer le mot de passe</p>
<PasswordInput/>

<Checkbox />
<Button> Créer un compte </Button>
<p class="text-center text-sm mt-4">
    Vous avez déjà un compte ? <a href="/#/login" class="text-[#590212] hover:underline">Connectez-vous</a>
</p>
