const express = require('express');
const authController = require('../controller/auth.controller');
const validate = require('../middleware/validate.middleware');
const router = express.Router();
const authValidation = require('../validation/auth.validation');

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;