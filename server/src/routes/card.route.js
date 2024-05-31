const express = require('express');
const auth = require('../middleware/auth.middleware');
const cardController = require('../controller/card.controller');
const router = express.Router();

router.post('/', auth(), cardController.createCard)
router.get('/all/:board_id', auth(), cardController.getAllCard)
router.patch('/order', auth(), cardController.changeOrderCard)

module.exports = router