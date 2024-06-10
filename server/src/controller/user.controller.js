const userController = {
    getListUser: (req, res, next) => {
        try {
            const username = req.query.username
            const [result] = pool.query('SELECT * FROM users WHERE username = ?', [username])
            res.status(200).json({ 
                status: 'success',
                result
             });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController