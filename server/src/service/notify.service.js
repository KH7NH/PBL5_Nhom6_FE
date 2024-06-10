const { pool } = require("../config/db.config")

const notifyService = {
    pushNotify: async ({title, content, user_id}) => {
        try {
            await pool.query('INSERT INTO notify (title, content, user_id) VALUES (?, ?, ?)', [title, content, user_id]);
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = notifyService