const express = require('express')
const response = require('./helpers/response')
const app = express()
const routes = require('./routes')

const port = process.env.PORT || 4001
// app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res, next)=>{
    res.status(200).send({
        message: 'Welcome to API To Do List'
    })
})
routes(app)

//Error handler
// app.use(response.errorHandler())
app.listen(port, ()=>{
    console.log(`Server is listening on https://localhost${port}`)
})
