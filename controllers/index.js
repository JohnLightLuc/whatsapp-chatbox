const axios = require("axios");
const { config } = require("../config");

exports.home = async (req, res) => {
    res.render("index")
};

exports.getWebhook = async(req, res) => {
    if (req.query["hub.verify_token"] === config.VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    } else {
        res.sendStatus(403);
    }
}

exports.postWebhook = async (req, res) => {
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
}

// Fonction pour envoyer un message WhatsApp
async function sendMessage(to, message) {
    await axios.post(
        `https://graph.facebook.com/v17.0/${config.PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: to,
            text: { body: message },
        },
        { headers: { Authorization: `Bearer ${config.TOKEN}` } }
    );
}
