import api from "../src/lib/api";

    // Service pour envoyer un message depuis le formulaire de contact
export async function sendContactMessage({email, subject, message }) {
    // Appel à la fonction API générique
    // { withAuth: false } : on n’envoie pas le token car la route est publique
    return api("/api/contact", "POST", { email, subject, message},{ withAuth: false });
}