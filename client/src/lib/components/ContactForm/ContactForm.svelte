<script>
    import Input from "../ui/Input.svelte";
    import Button from "../ui/Button.svelte";
    import TextArea from "../ui/TextArea.svelte";
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10">Contact</h1>

<p class="text-center">E-mail</p>
<Input />

<p class="text-center">Sujet</p>
<Input />

<p class="text-center">Message</p>
<TextArea variant="wide"/>

<Button>Envoyer votre message</Button>