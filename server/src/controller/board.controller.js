const catchAsync = require("../utils/catchAsync");
const boardService = require("../service/board.service");
const { pool } = require("../config/db.config");

const boardController = {
    createBoard: catchAsync(async (req, res) => {
        const { name, description } = req.body;
        const { id } = req.user;
        const result = await boardService.createBoard({ name, description, user_id: id });
        res.status(201).json({ 
            status: 'success',
            result
         });
    }),
    getAllBoards: catchAsync(async (req, res) => {
        const result = await boardService.getAllBoards(req.user.id);
        res.status(200).json({ 
            status: 'success',
            result
         });
    }),
    getAllBoardShared: catchAsync(async (req, res) => {
        const userId = req.user.id;
        const [result] = await pool.query('SELECT boards.* FROM member JOIN boards ON member.board_id = boards.id WHERE member.user_id = ?', [userId]);
        res.status(200).json({ 
            status: 'success',
            result
         });
    })
};

module.exports = boardController