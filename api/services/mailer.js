// Chargement des variables d'environnement (.env)
import "dotenv/config";

// Nodemailer (ancienne solution) remplacé par Resend
// Render bloquait les ports SMTP 587 et 465 sur le plan gratuit
// import nodemailer from "nodemailer";

// Resend : service d'envoi d'emails transactionnels via API HTTP
import { Resend } from "resend";

// Initialisation du client Resend avec la clé API stockée en variable d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);



// EMAIL DE CONFIRMATION D'INSCRIPTION
// Envoyé automatiquement après la création d'un compte
// Contient un lien unique permettant d'activer le compte

export async function sendVerificationEmail(to, link) {
    await resend.emails.send({
        from: 'BlablaBook <onboarding@resend.dev>', // Expéditeur (domaine Resend gratuit)
        to,                                          // Destinataire : email de l'utilisateur inscrit
        subject: 'Confirme ton compte',
        // Corps de l'email en HTML avec le lien de confirmation
        // Le lien contient le token JWT généré dans auth.controller.js
        html: `
            <h2>Bienvenue parmi nous ! 👋🏻</h2>
            <p>Prêt à dévorer tous nos livres ? Clique ici pour activer ton compte :</p>
            <a href="${link}">Confirmer mon compte</a>
        `
    });
};



// EMAIL DE CONTACT
// Envoyé quand un utilisateur soumet le formulaire de contact
// L'email arrive sur la boîte de l'équipe BlablaBook

export async function sendContactMessage({ email, subject, message }) {
    await resend.emails.send({
        from: 'BlablaBook <onboarding@resend.dev>', // Expéditeur : Resend au nom de BlablaBook
        to: process.env.EMAIL_USER,                 // Destinataire : boîte mail de l'équipe BlablaBook
        reply_to: email,                            // Si on répond à cet email → la réponse ira vers l'utilisateur
        subject: `Nouveau message ${subject}`,
        // Corps de l'email avec les informations saisies dans le formulaire
        html: `
            <h2>Nouveau message utilisateur</h2>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
        `
    });
}