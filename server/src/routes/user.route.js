const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const userController = require('../controller/user.controller');

router.get('/search', auth(), userController.getListUser);

module.exports = router