const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.config');

// Example route to fetch data from the database
router.use('/auth', require('./auth.route'));
router.use('/board', require('./board.route'));
router.use('/list', require('./list.route'));
router.use('/card', require('./card.route'));

module.exports = router;