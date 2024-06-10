const express = require('express');
const router = express.Router();
const memberController = require('../controller/member.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth(), memberController.addMember)
router.get('/:boardId', auth(), memberController.getListMemberInBoard)

module.exports = router