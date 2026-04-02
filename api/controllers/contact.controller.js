import { sendContactMessage } from "../services/mailer.js";

export const contact = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }

        // Envoi du mail via le service mailer (Nodemailer)
        await sendContactMessage({ email, subject, message });

        console.log("Headers reçus :", req.headers);
        console.log("Body reçu :", req.body);

        res.status(200).json({ message: "Message envoyé avec succès !" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
};