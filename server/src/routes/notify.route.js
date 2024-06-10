const express = require('express');
const auth = require('../middleware/auth.middleware');
const notifyController = require('../controller/notify.controller');
const router = express.Router();

router.get('/', auth(), notifyController.getAllNotifyByUser);

module.exports = router