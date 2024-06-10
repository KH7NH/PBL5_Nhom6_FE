const express = require('express');
const router = express.Router();
const { pool } = require('../config/db.config');

// Example route to fetch data from the database
router.use('/auth', require('./auth.route'));
router.use('/board', require('./board.route'));
router.use('/list', require('./list.route'));
router.use('/card', require('./card.route'));
router.use('/member', require('./member.route'));
router.use('/user', require('./user.route'));
router.use('/notify', require('./notify.route'));
router.use('/upload', require('./upload.route'));
router.use('/comment', require('./comment.route'));


module.exports = router;