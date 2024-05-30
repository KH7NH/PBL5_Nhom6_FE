const { pool } = require('../config/db.config');
const bcrypt = require('bcryptjs');
const { BadRequest } = require('http-errors');

const authService = {
    register: (username, password, email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

                if (existingUsers.length > 0) {
                    throw new BadRequest('Username already exists.');
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                const [result] = await pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    },
    login: (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
                if(users.length === 0) {
                    throw new BadRequest('Username or password is incorrect.');
                }
                // check password
                const isMatch = await bcrypt.compare(password, users[0].password);
                if(!isMatch) {
                    throw new BadRequest('Username or password is incorrect.');
                }
                resolve(users[0]);
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = authService