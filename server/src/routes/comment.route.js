const express = require('express');
const auth = require('../middleware/auth.middleware');
const commentController = require('../controller/comment.controller');
const router = express.Router();

router.post('/', auth(), commentController.createComment);
router.get('/:card_id', auth(), commentController.getAllCommentByCard);
router.delete('/:id', auth(), commentController.deleteComment);

module.exports = router