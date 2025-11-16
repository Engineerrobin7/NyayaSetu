const express = require("express");
const { sendMessage } = require("../controllers/chatController"); // ✅ Import chat controller
const router = express.Router();

router.post("/send", sendMessage); // ✅ Chat API route

module.exports = router;
