const catchAsync = require("../utils/catchAsync");
const boardService = require("../service/board.service");

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
    })
};

module.exports = boardController