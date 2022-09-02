const { Router } = require('express');
const m$user = require('../modules/auth.modules');
const response = require('../helpers/response');
const userSession = require('../middleware/auth.middleware');

const AuthController = Router();

/**
 * Login
 * @param {string} username
 * @param {string} password
 * @return {object} token
 */

AuthController.post('/login', async (req, res, next) => {
    const login = await m$user.login(req.body);
    response.sendResponse(res, login);
});

/**
 * Register
 * @param {string} username
 * @param {string} password
 */

AuthController.post('/register', async (req, res, next) => {
    const register = await m$user.register(req.body);
    response.sendResponse(res, register);
});

/**
 * Logout
 */

AuthController.post('/logout', userSession, async (req, res, next) => {
    const logout = await m$user.logout(req.body);
    response.sendResponse(res, logout);
});

module.exports = AuthController;