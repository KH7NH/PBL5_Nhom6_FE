const { pool } = require("../config/db.config");
const notifyService = require("../service/notify.service");

const memberController = {
    addMember: async (req, res, next) => {
        try {
            const { boardId, username } = req.body;
            const [user] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
            if(!user || user.length === 0) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                });
            }
            const user_id = user[0].id;
            const [board] = await pool.query('SELECT * FROM boards WHERE id = ?', [boardId]);
            if(!board || board.length === 0) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Board not found'
                });
            }
            const ownerId = board[0].user_id;
            if(ownerId === user_id) {
                return res.status(403).json({
                    status: 'fail',
                    message: 'Cannot add yourself as member'
                });
            }
            const [memberExistInBoard] = await pool.query('SELECT * FROM member WHERE board_id = ? AND user_id = ?', [boardId, user_id]);
            if(memberExistInBoard.length > 0) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Member already exist in board'
                });
            }
            const [result] = await pool.query('INSERT INTO member (board_id, user_id) VALUES (?, ?)', [boardId, user_id]);
            await notifyService.pushNotify({title: 'Thông báo thêm thành viên', content: `Bạn đã được thêm vảo bảng ${board[0].name}`, user_id: user_id});
            res.status(201).json({
                status: 'success',
                result
            });
        } catch (error) {
            next(error)
        }
    },
    getListMemberInBoard: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const [result] = await pool.query('SELECT users.username, users.id, users.email FROM member JOIN users ON member.user_id = users.id WHERE board_id = ?', [boardId]);
            res.status(200).json({ 
                status: 'success',
                result
             });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = memberController