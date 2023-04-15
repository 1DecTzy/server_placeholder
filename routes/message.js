const express = require('express');
const router = express.Router();
const cors = require('cors');
const messagesController = require('../controller/messagesController')
router.use(cors());
router.post("/chat",messagesController.chat)
router.get('/chat/get' , messagesController.get)
module.exports = router;