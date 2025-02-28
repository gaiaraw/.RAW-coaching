require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route pour traiter le paiement et envoyer l'email
app.post('/process-payment', async (req, res) => {
    try {
        // Créer le paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 4900, // 49€ en centimes
            currency: 'eur',
            payment_method: req.body.paymentMethodId,
            confirm: true,
        });

        // Préparer l'email
        const emailContent = `
            Nouveau questionnaire reçu :
            
            Informations personnelles :
            - Nom : ${req.body.name}
            - Âge : ${req.body.age}
            - Email : ${req.body.email}
            
            Objectifs :
            - Principal : ${req.body.mainGoal}
            - Niveau : ${req.body.experience}
            
            Entraînement :
            - Lieu : ${req.body.trainingLocation}
            - Séances par semaine : ${req.body.sessionsPerWeek}
        `;

        // Envoyer l'email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Nouveau programme Premium commandé',
            text: emailContent
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Une erreur est survenue lors du traitement.' 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 