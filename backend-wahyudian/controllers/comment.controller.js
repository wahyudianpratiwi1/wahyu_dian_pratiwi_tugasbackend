const { Router } = require('express');
const m$comment = require('../modules/comment.modules');
const response = require('../helpers/response');

const CommentController = Router();

/**
 * List Comment
 * @param {number} id_article
 */

CommentController.get('/:id', async (req, res, next) => {
    const list = await m$comment.listComment(req.params.id);
    response.sendResponse(res, list);
});

/**
 * Create Comment
 * @param {number} id_artikel
 * @param {string} comment
 * @param {number} id_user
 */

 CommentController.post('/', async (req, res, next) => {
    const add = await m$comment.addComment(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Comment
 * @param {string} comment
 * @param {number} id_comment
 */

CommentController.put('/', async (req, res, next) => {
    const edit = await m$comment.editComment(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Comment
 * @param {number} id_comment
 */

CommentController.delete('/:id', async (req, res, next) => {
    const del = await m$comment.deleteComment(req.params.id);
    response.sendResponse(res, del);
});

module.exports = CommentController;