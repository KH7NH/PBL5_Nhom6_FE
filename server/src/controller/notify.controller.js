const { pool } = require("../config/db.config");

const notifyController = {
    getAllNotifyByUser: async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const [result] = await pool.query('SELECT * FROM notify WHERE user_id = ?', [user_id]);
            res.status(200).json({ 
                status: 'success',
                result
             });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = notifyController