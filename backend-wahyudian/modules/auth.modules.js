const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../helpers/auth');
const m$user = require('./users.modules');


class _auth{
    login = async (data) => {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });

        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);

            return {
                status: false,
                code: 422,
                error: errorDetails
            }
        }
        
        const checkUsername = await m$user.getUserByUsername(data.username);
        if (!checkUsername.status) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        const isMatch = await comparePassword(data.password, checkUsername.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        const token = generateToken({ username: data.username });

        return {
            status: true,
            data: token,
        }
    }

    register = async (data) => {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });

        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);

            return {
                status: false,
                code: 422,
                error: errorDetails
            }
        }

        const checkUsername = await m$user.getUserByUsername(data.username);
        if (checkUsername.status) {
            return {
                status: false,
                code: 422,
                data: 'Sorry, username already exist'
            }
        }

        data.password = await hashPassword(data.password);
        
        const register = await m$user.addUser(data);
        if (!register.status) {
            return {
                status: false,
                code: 500,
                data: 'Sorry, register failed'
            }
        }

        return {
            status: true,
            data: 'Register success'
        }
    }

    logout = async (data) => {
        return {
            status: true,
            data: 'Logout success'
        }
    }
}

module.exports = new _auth();