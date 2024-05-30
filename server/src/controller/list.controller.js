const { pool } = require('../config/db.config');
const listController = {
    createList: async (req, res) => {
        const { name, board_id } = req.body;
        // count total list
        const [lengthList] = await pool.query('SELECT * FROM list WHERE board_id = ?', [board_id]);
        const pos = (lengthList.length + 1)* 10000;

        const [result] = await pool.query('INSERT INTO list (name, board_id, pos) VALUES (?, ?, ?)', [name, board_id, pos]);
        res.status(201).json({ 
            status: 'success',
            result: {
                id: result.insertId,
                name,
                pos
            }
         });
    },
    getAllList: async (req, res) => {
        const { board_id } = req.params;
        const [result] = await pool.query('SELECT * FROM list WHERE board_id = ?', [board_id]);
        res.status(200).json({ 
            status: 'success',
            result
         });
    },
    changeOrder: async (req, res) => {
        const { activeId, overId} = req.body
        const [activeList] = await pool.query('SELECT * FROM list WHERE id = ?', [activeId]);
        const [overList] = await pool.query('SELECT * FROM list WHERE id = ?', [overId]);
        const [result] = await pool.query('UPDATE list SET pos = ? WHERE id = ?', [overList[0].pos, activeId]);
        const [result2] = await pool.query('UPDATE list SET pos = ? WHERE id = ?', [activeList[0].pos, overId]);
        res.status(200).json({ 
            status: 'success',
            data: "ok"
         });
    }
}

module.exports = listController