import "dotenv/config";
import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true pour le port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendVerificationEmail(to, link) {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Confirme ton compte",
        html: `
            <h2>Bienvenue parmis nous ! 👋🏻</h2>
            <p> Prêt à dévorer tous nos livres ? Clique ici pour activer ton compte :</p>
            <a href="${link}">Confirmer mon compte</a>`
    });
};

export async function sendContactMessage({ email, subject, message }) {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
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

