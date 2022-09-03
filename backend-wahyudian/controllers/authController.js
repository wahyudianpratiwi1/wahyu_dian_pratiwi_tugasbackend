const { Router } = require('express');
const m$user = require('../modules/auth.modules');
const response = require('../helpers/response');
const userSession = require('../middleware/auth.middleware');

const authController = Router();

/**
 * Login
 * @param {string} username
 * @param {string} password
 */

 authController.post('/login', async (req, res, next) => {
    req.cookies = req.headers.cookie;
    const login = await m$user.login(req.body);
    response.sendResponse(res, login);
});


/**
 * Register
 * @param {string} username
 * @param {string} password
 */

authController.post('/register', async (req, res, next) => {
    const register = await m$user.register(req.body);
    response.sendResponse(res, register);
});

/**
 * Logout
 */

authController.post('/logout', userSession, async (req, res, next) => {
    const logout = await m$user.logout(req.body);
    response.sendResponse(res, logout);
})

module.exports = authController