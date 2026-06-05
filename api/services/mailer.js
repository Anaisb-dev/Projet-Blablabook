import "dotenv/config";
// import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to, link) {
    await resend.emails.send({
        from: 'BlablaBook <onboarding@resend.dev>',
        to,
        subject: 'Confirme ton compte',
        html: `
            <h2>Bienvenue parmi nous ! 👋🏻</h2>
            <p>Prêt à dévorer tous nos livres ? Clique ici pour activer ton compte :</p>
            <a href="${link}">Confirmer mon compte</a>
        `
    });
};

export async function sendContactMessage({ email, subject, message }) {
    await resend.emails.send({
        from: 'BlablaBook <onboarding@resend.dev>', // expéditeur = Resend
        to: process.env.EMAIL_USER, // destinataire = brnt.anais@gmail.com / blablabook.contact@gmail.com
        subject: `Nouveau message ${subject}`,
        html: `
            <h2>Nouveau message utilisateur</h2>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
        `
    });
}