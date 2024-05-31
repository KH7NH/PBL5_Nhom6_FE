const { pool } = require("../config/db.config");

const boardService = {
    createBoard: async (board) => {
        const [result] = await pool.query('INSERT INTO boards (name, description, user_id) VALUES (?, ?, ?)', [board.name, board.description, board.user_id]);
        return result.insertId;
    },
    getAllBoards: async (user_id) => {
        const [result] = await pool.query('SELECT * FROM boards WHERE user_id = ?', [user_id]);
        return result;
    }
}

module.exports = boardService