const { pool } = require("../config/db.config");
const notifyService = require("../service/notify.service");

const commentController = {
    createComment: async (req, res, next) => {
        try {
            const userId = req.user.id
            const { card_id, content } = req.body
            const [card] = await pool.query('SELECT * FROM card WHERE id = ?', [card_id])
            const [member] = await pool.query('SELECT * FROM member WHERE board_id = ?', [card[0].board_id])
            const [result] = await pool.query('INSERT INTO comment (card_id, user_id, content, createdAt) VALUES (?, ?, ?, ?)', [card_id, userId, content, new Date().getTime()])
            for (const user of member) {
                if (user.user_id !== userId) {
                    await notifyService.pushNotify({title: 'Thông báo về bình luận', content: `Người dùng ${req.user.username} đã thêm một bình luận vào thẻ ${card[0].name}`, user_id: user.user_id});
                }
            }
            res.status(201).json({
                status: 'success',
                result
            });
        } catch (error) {
            next(error)
        }
    },
    getAllCommentByCard: async (req, res, next) => {
        try {
            const { card_id } = req.params
            const [result] = await pool.query('SELECT users.*, comment.* FROM comment JOIN users ON comment.user_id = users.id WHERE card_id = ?', [card_id])
            res.status(200).json({ 
                status: 'success',
                result
             });
        } catch (error) {
            next(error)
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const { id } = req.params
            const [result] = await pool.query('DELETE FROM comment WHERE id = ?', [id])
            res.status(200).json({
                status: 'success',
                result
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = commentController