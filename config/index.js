require("dotenv").config();

exports.config = {
    PORT : process.env.PORT,
    TOKEN : process.env.TOKEN ,
    VERIFY_TOKEN : process.env.VERIFY_TOKEN,
    PHONE_NUMBER_ID :  process.env.PHONE_NUMBER_ID,
    WHATSAPP_BUSINESS_ID : process.env.WHATSAPP_BUSINESS_ID,
    MONGO_URI : process.env.MONGO_URI
}