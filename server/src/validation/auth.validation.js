const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        username: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = {
    register,
    login
}