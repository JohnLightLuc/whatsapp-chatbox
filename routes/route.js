
const express = require('express');
const router = express.Router();
const controllers = require('../controllers');


router.get("/", controllers.home);

// Vérification du Webhook
router.get("/webhook", controllers.getWebhook);

// Réception des messages WhatsApp
router.post("/webhook", controllers.postWebhook);


module.exports = router;