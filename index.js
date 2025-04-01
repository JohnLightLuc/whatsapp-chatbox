const express = require("express");
const axios = require("axios");
const nodemon = require("nodemon");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(nodemon);


const TOKEN = "EAAQpPlrGId4BOZBK6QRLZAy5AkQjq7Y3qVyRGnkHLPK94scRuqk81hNBOUZB5s42OFZBneIbThVhbRx8rDikOiCG3pUeLYdae0HmjiwG7ENENe55F5AR5ODCBgHbKS6n26FtOPlWLYB7D47dNdJhUh2g4EoCcuMOQaE5FzF7wbeTSHDvkHLZCBRSWo6XABuK6pGxj6G7HlHJoZCZBCRxdHUT8uCsq8ZD";
const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN";
const PHONE_NUMBER_ID = "582030154999036";

// Vérification du Webhook
app.get("/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    } else {
        res.sendStatus(403);
    }
});

// Réception des messages WhatsApp
app.post("/webhook", async (req, res) => {
    const data = req.body;

    if (data.object === "whatsapp_business_account") {
        const message = data.entry[0].changes[0].value.messages[0];
        if (message) {
            const sender = message.from;
            const text = message.text.body.toLowerCase();

            let reply = "Désolé, je n'ai pas compris. 🤖";
            if (text.includes("bonjour")) reply = "Bonjour ! Comment puis-je vous aider ? 😊";
            if (text.includes("prix")) reply = "Nos prix sont disponibles sur notre site web.";
            
            await sendMessage(sender, reply);
        }
    }
    res.sendStatus(200);
});

// Fonction pour envoyer un message WhatsApp
async function sendMessage(to, message) {
    await axios.post(
        `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: to,
            text: { body: message },
        },
        { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
}

app.listen(3000, () => console.log("Bot WhatsApp en ligne 🚀"));
