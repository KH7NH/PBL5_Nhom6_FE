const authService = require('../service/auth.service');
const catchAsync = require('../utils/catchAsync');
const { createToken } = require('../utils/token');
const authController = {
    register: catchAsync(async (req, res) => {
        const { username, password, email } = req.body;
        await authService.register(username, password, email);
        const token = createToken({ username });
        res.status(201).json({ 
            status: 'success',
            token
         });
    }),
    login: catchAsync(async (req, res) => {
        const { username, password } = req.body;
        await authService.login(username, password);
        const token = createToken({ username });
        res.status(200).json({ 
            status: 'success',
            token
         });
    })
}

module.exports = authController