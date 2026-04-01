import "dotenv/config"
import nodemailer from "nodemailer";
import "dotenv/config";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log('test', transporter)

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

