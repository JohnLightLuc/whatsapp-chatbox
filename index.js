const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");



const TOKEN = process.env.TOKEN || "EAAHfmAcYAfABOwKDWdGOYrSiNakj0chZAXa5TyZCOdoBIctAAvLqO4UlRBZBUsxJ0J0qrpuiIWi7fE6tkLei5m6S4GwXXYnngT6mXJ6qRTpS4reML1YkxH8aaNFiQTS3SgoDVhFFpzfsYCM7FGSZBtGb0qQhTDD45tCPQEr4ZCHxCjw01L8PcHxiY3m36ZAfvBJ0ZCZCCHaOYJSlNxiGv57TZBEQE1f0ZD";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "";
const PHONE_NUMBER_ID =  process.env.PHONE_NUMBER_ID || "1183590933141053";

app.get("/", (req, res) => {
    res.render("index");
});

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

app.listen(3000, () => console.log("Bot WhatsApp en ligne sur port 3000 🚀"));
