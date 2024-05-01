/**********************************\
 * Autor: Nicolas Vasconcelos      \
 * Versão: 1.2                     \
 **********************************/

/**
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()

})

const bodyParserJSON = bodyParser.json()

app.use(bodyParserJSON)

/*ENDPOINTS FILMES*/

/*imports dos arquivos internos*/
const funcoes = require('./controller/funcoes.js')

const controllerFilmes = require('./controller/controller_filme.js')

const controller_genero = require('./controller/controller_genero.js')

const controller_classificacao = require('./controller/controller_classificacao.js')

const controllerAtores = require('./controller/controller_atores.js')

const controller_diretores = require('./controller/controller_diretores.js')

// retorna os dados do arquivo json
app.get('/v1/acmefilmes/filmes', cors(), async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})

app.get('/v1/acmefilmes/filme/:id', cors(), async(request, response, next) => {

    let idFilme = request.params.id

    response.json(funcoes.getFilme(idFilme))
    response.status(200)
})

// retorna os dados do banco de dados
app.get('/v2/acmefilmes/filmes', cors(), async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) response.json(dadosFilmes), response.status(200)
    else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.get('/v2/acmefilmes/filme/:id', cors(), async(request, response, next) => {
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v2/acmefilmes/atualizarFilme/:id', cors(), bodyParserJSON, async(request, response, next) => {

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controllerFilmes.setAtualizarFilme(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deleteFilme/:id', cors(), async(request, response, next) => {
    const idFilme = request.params.id

    let resultDados = await controllerFilmes.setExcluirFilme(idFilme)

    response.json(resultDados)
})

/*ENDPOINTS GENERO */

app.get('/v2/acmefilmes/generos', cors(), async(request, response, next) => {

    let dadosGeneros = await controller_genero.getListarGenero()

    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirGenero', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_genero.setNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_genero.setAtualizarGenero(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.setExcluirGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.getBuscarGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/*ENDPOINTS CLASSIFICAÇÃO */

app.get('/v2/acmefilmes/classificacao', cors(), async(request, response, next) => {

    let dadosClassificacao = await controller_classificacao.getListarClassificacao()

    if (dadosClassificacao) {
        response.json(dadosClassificacao)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirClassificacao', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_classificacao.setNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_classificacao.setAtualizarClassificacao(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.setExcluirClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.getBuscarClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/*ENDPOINTS ATORES*/

app.get('/v2/acmefilmes/atores', cors(), async(request, response, next) => {
    let dadosAtores = await controllerAtores.getListarAtores()

    if (dadosAtores) {
        response.json(dadosAtores)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
    }
})

app.post('/v2/acmefilmes/inserirAtor', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerAtores.setNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarAtor/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controllerAtores.setAtualizarAtor(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarAtor/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controllerAtores.setExcluirAtor(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarAtor/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controllerAtores.getAtorId(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarAtorNome/', cors(), async(request, response, next) => {
    let nome = request.query.nome

    let resultDados = await controllerAtores.getAtorNome(nome)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/*ENDPOINTS DIRETORES */
app.get('/v2/acmefilmes/diretores', cors(), async(request, response, next) => {
    let dadosDiretor = await controller_diretores.getListarDiretores()

    if (dadosDiretor) {
        response.json(dadosDiretor)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
    }
})

app.post('/v2/acmefilmes/inserirDiretor', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_diretores.setNovoDiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarDiretor/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_diretores.setAtualizarDiretor(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarDiretor/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_diretores.setExcluirDiretor(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarDiretor/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_diretores.getDiretorId(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarDiretorNome/', cors(), async(request, response, next) => {
    let nome = request.query.nome

    let resultDados = await controller_diretores.getDiretorNome(nome)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

console.log("API funcionando na porta 8080")
app.listen(8080, () => {})