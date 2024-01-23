const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST')
    app.use(cors)
    next()

})


app.get('/v1/acme/filmes', async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})


app.listen(8080, () => {})