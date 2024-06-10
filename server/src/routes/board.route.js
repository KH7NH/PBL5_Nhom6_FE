const express = require('express');
const auth = require('../middleware/auth.middleware');
const boardController = require('../controller/board.controller');
const router = express.Router();

router.post('/', auth(), boardController.createBoard);
router.get('/', auth(), boardController.getAllBoards);
router.get('/shared', auth(), boardController.getAllBoardShared);

module.exports = router