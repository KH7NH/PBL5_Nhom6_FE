const { pool } = require("../config/db.config");

const cardController = {
   createCard: async (req, res) => {
       const { name, list_id, board_id } = req.body;
       const [lengthList] = await pool.query('SELECT * FROM card WHERE board_id = ? AND list_id = ?', [board_id, list_id]);
       const pos = (lengthList.length + 1)* 10000;

       const [result] = await pool.query('INSERT INTO card (name, list_id, board_id, pos) VALUES (?, ?, ?, ?)', [name, list_id, board_id, pos]);
       res.status(201).json({ 
           status: 'success',
           result: {
               id: result.insertId,
               list_id,
               board_id,
               name,
               pos
           }
        });
   },
   getAllCard: async (req, res) => {
       const { board_id } = req.params;
       const [result] = await pool.query('SELECT * FROM card WHERE board_id = ?', [board_id]);
       res.status(200).json({ 
           status: 'success',
           result
        });
   },
   changeOrderCard: async (req, res) => {
       const { activeId, overId, oldListId, newListId} = req.body
       if(oldListId === newListId){
        const [oldCard] = await pool.query('SELECT * FROM card WHERE id = ?', [activeId]);
        const [newCard] = await pool.query('SELECT * FROM card WHERE id = ?', [overId]);
        if(oldCard[0].pos < newCard[0].pos){
            await pool.query('UPDATE card SET pos = ? WHERE id = ?', [newCard[0].pos + 1, activeId]);
        }
        if(oldCard[0].pos > newCard[0].pos){
            await pool.query('UPDATE card SET pos = ? WHERE id = ?', [newCard[0].pos - 1, activeId]);
        }
        return res.status(200).json({ 
            status: 'success',
            data: "ok"
         });
       }
       const [newList] = await pool.query('SELECT * FROM card WHERE list_id = ?', [newListId]);
       if(oldListId !== newListId && newList.length === 0){
        await pool.query('UPDATE card SET pos = ?, list_id = ? WHERE id = ?', [ 10000, newListId , activeId]);
        return res.status(200).json({ 
            status: 'success',
            data: "ok"
         });
       }
       if(oldListId !== newListId && newList.length !== 0){
        const newCard = await pool.query('SELECT * FROM card WHERE id = ?', [overId]);
        const newCardPos = newCard[0][0].pos;
        await pool.query('UPDATE card SET pos = ?, list_id = ? WHERE id = ?', [newCardPos - 1,newListId, activeId]);
        await pool.query('UPDATE card SET pos = ? WHERE id = ?', [newCardPos + 1, overId]);
        return res.status(200).json({ 
            status: 'success',
            data: "ok"
         });
       }

       return res.status(200).json({
           status: 'success',
           data: "ok"
       })
   }
};

module.exports = cardController