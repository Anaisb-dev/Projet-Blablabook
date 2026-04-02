import api from "../src/lib/api";

export async function sendContactMessage({email, subject, message }) {
    return api("/api/contact", "POST", { email, subject, message},{ withAuth: false });
}