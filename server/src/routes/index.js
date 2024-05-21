const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.config');

// Example route to fetch data from the database
router.use('/auth', require('./auth.route'));

module.exports = router;