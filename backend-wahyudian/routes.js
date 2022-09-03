const artikelController = require('./controllers/artikelController')
const AuthController = require('./controllers/authController')
const CommentController = require('./controllers/comment.controller')
const usersController = require('./controllers/usersController')
const _routes=[
    ['/',AuthController],
    ['/artikel',artikelController],
    ['/users',usersController],
    ['/komentar', CommentController]
]

const routes = (app)=>{
    _routes.forEach((route)=>{
        const [url, controller] = route
        app.use(`/api${url}`,controller)
    })
}

module.exports = routes