<script>
	export let value = "";
	export let placeholder = "";
	export let variant = "default";

	const styles = {
		default: "w-[300px] flex justify-center",
		wide: "w-[300px] lg:w-[600px] flex justify-center"
	};

    const placeholders = {
	default: "Présentez-vous en quelques mots…",
	wide: "Écrivez votre message"
};
</script>

<textarea
	bind:value
	placeholder={placeholder || placeholders[variant]} // utilise le placeholder nommé si fourni, sinon utilise le placeholder par défaut pour le variant
	class={`border rounded-xl h-[200px] bg-white p-4 text-justify mx-auto mb-4 ${styles[variant]}`}
></textarea>