const { Router } = require('express');
const m$article = require('../modules/artikel.modules');
const response = require('../helpers/response');
const userSession = require('../middleware/auth.middleware');

const ArticleController = Router();

/**
 * List Article
 * @param {number} id_user
 */

ArticleController.get('/', async (req, res, next) => {
    const list = await m$article.listArticle(req.body);
    response.sendResponse(res, list);
});

/**
 * Detail Article
 * @param {number} id_article
 */

 ArticleController.get('/detail/:id', async (req, res, next) => {
    const detail = await m$article.detailArticle(req.params.id);
    response.sendResponse(res, detail);
});

/**
 * Add Article
 * @param {number} id_user
 * @param {string} title
 * @param {string} description
 */

ArticleController.post('/',userSession, async (req, res, next) => {
    // req body, req params, req query
    const add = await m$article.addArticle(req.body);
    response.sendResponse(res, add);
});

/**
 * Edit Article
 * @param {string} title
 * @param {string} description
 * @param {number} id_artikel
 */

ArticleController.put('/',userSession, async (req, res, next) => {
    const edit = await m$article.editArticle(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Article
 * @param {number} id_article
 */

ArticleController.delete('/:id',userSession, async (req, res, next) => {
    const del = await m$article.deleteArticle(req.params.id);
    response.sendResponse(res, del);
});

module.exports = ArticleController;