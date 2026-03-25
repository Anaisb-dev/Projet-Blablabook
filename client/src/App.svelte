<script>
  import Router from "svelte-spa-router";
  import Layout from "./lib/components/layout/Layout.svelte";
  import LibrarySection from "./lib/components/LibrarySection/LibrarySection.svelte";
  import RegisterForm from "./lib/components/RegisterForm/RegisterForm.svelte";

  const routes = {
    "/": LibrarySection,
    "/book": LibrarySection,
    "/register": RegisterForm,
    "*": LibrarySection // fallback
  };
</script>

<Layout>
  <Router {routes} />
</Layout>