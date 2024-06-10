const express = require('express');
const auth = require('../middleware/auth.middleware');
const listController = require('../controller/list.controller');
const router = express.Router();

router.get('/all/:board_id', auth(), listController.getAllList)
router.post('/', auth(), listController.createList)

router.patch('/order', auth(), listController.changeOrder)

router.delete('/:id', auth(), listController.deleteList)

module.exports = router