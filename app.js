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

const filmeGeneroController = require('./controller/controller_filme_genero.js')

const nacionalidadeController = require('./controller/controller_nacionalidade.js')

const nacionalidadeAtorController = require('./controller/controller_nacionalidade_ator.js')

const nacionalidadeDiretorController = require('./controller/controller_nacionalidade_diretor.js')

const diretoresFilmeController = require('./controller/controller_diretores_filmes.js')

const atoresFilmeController = require('./controller/controller_atores_filme.js')

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

/*ENDPOINTS SEXO */

app.get('/v2/acmefilmes/sexos', cors(), async(request, response, next) => {
    let dadosSexo = await sexoController.getListarSexos()

    if (dadosSexo) {
        response.status(dadosSexo.status_code).json(dadosSexo)
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' })
    }
})

app.post('/v2/acmefilmes/inserirSexo', cors(), bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await sexoController.setNovoSexo(dadosBody, contentType)

    response.status(resultDados.status_code).json(resultDados)
})

app.put('/v2/acmefilmes/atualizarSexo/:id', cors(), bodyParser.json(), async(request, response, next) => {
    const id = request.params.id
    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await sexoController.setAtualizarSexo(id, novosDados, contentType)

    response.status(resultDados.status_code).json(resultDados)
})

app.delete('/v2/acmefilmes/deletarSexo/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await sexoController.setExcluirSexo(id)

    response.status(resultDados.status_code).json(resultDados)
})

app.get('/v2/acmefilmes/buscarSexo/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await sexoController.getBuscarSexo(id)

    response.status(resultDados.status_code).json(resultDados)
})

app.get('/v2/acmefilmes/buscarSexoNome/', cors(), async(request, response, next) => {
    let nome = request.query.nome

    let resultDados = await sexoController.getSexoNome(nome)

    response.status(resultDados.status_code).json(resultDados)
})

/*ENDPOINTS NACIONALIDADE */

// Rotas para tbl_filme_genero
app.get('/v2/acmefilmes/filmeGenero', async(request, response, next) => {
    let dadosFilmeGenero = await filmeGeneroController.getListarFilmesGeneros();

    if (dadosFilmeGenero) {
        response.status(dadosFilmeGenero.status_code).json(dadosFilmeGenero);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirFilmeGenero', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDados = await filmeGeneroController.setNovoFilmeGenero(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.put('/v2/acmefilmes/atualizarFilmeGenero/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;

    let resultDados = await filmeGeneroController.atualizarFilmeGenero(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarFilmeGenero/:id', async(request, response, next) => {
    const id = request.params.id;

    let resultDados = await filmeGeneroController.excluirFilmeGenero(id);

    response.status(resultDados.status_code).json(resultDados);
});

// Rotas para tbl_nacionalidade
app.get('/v2/acmefilmes/nacionalidade', async(request, response, next) => {
    let dadosNacionalidade = await nacionalidadeController.getListarNacionalidades();

    if (dadosNacionalidade) {
        response.status(dadosNacionalidade.status_code).json(dadosNacionalidade);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirNacionalidade', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDados = await nacionalidadeController.setNovaNacionalidade(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.put('/v2/acmefilmes/atualizarNacionalidade/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;

    let resultDados = await nacionalidadeController.atualizarNacionalidade(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarNacionalidade/:id', async(request, response, next) => {
    const id = request.params.id;

    let resultDados = await nacionalidadeController.excluirNacionalidade(id);

    response.status(resultDados.status_code).json(resultDados);
});

// Rotas para tbl_nacionalidade_ator
app.get('/v2/acmefilmes/nacionalidadeAtor', async(request, response, next) => {
    let dadosNacionalidadeAtor = await nacionalidadeAtorController.getListarNacionalidadesAtores();

    if (dadosNacionalidadeAtor) {
        response.status(dadosNacionalidadeAtor.status_code).json(dadosNacionalidadeAtor);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirNacionalidadeAtor', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDados = await nacionalidadeAtorController.setNovaNacionalidadeAtor(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.put('/v2/acmefilmes/atualizarNacionalidadeAtor/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;
    let resultDados = await nacionalidadeAtorController.atualizarNacionalidadeAtor(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarNacionalidadeAtor/:id', async(request, response, next) => {
    const id = request.params.id;
    let resultDados = await nacionalidadeAtorController.excluirNacionalidadeAtor(id);

    response.status(resultDados.status_code).json(resultDados);
});

// Rotas para tbl_nacionalidade_diretor
app.get('/v2/acmefilmes/nacionalidadeDiretor', async(request, response, next) => {
    let dadosNacionalidadeDiretor = await nacionalidadeDiretorController.getListarNacionalidadesDiretores();
    if (dadosNacionalidadeDiretor) {
        response.status(dadosNacionalidadeDiretor.status_code).json(dadosNacionalidadeDiretor);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirNacionalidadeDiretor', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDados = await nacionalidadeDiretorController.setNovaNacionalidadeDiretor(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.put('/v2/acmefilmes/atualizarNacionalidadeDiretor/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;
    let resultDados = await nacionalidadeDiretorController.atualizarNacionalidadeDiretor(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarNacionalidadeDiretor/:id', async(request, response, next) => {
    const id = request.params.id;
    let resultDados = await nacionalidadeDiretorController.excluirNacionalidadeDiretor(id);

    response.status(resultDados.status_code).json(resultDados);
});

// Rotas para tbl_diretores_filme
app.get('/v2/acmefilmes/diretoresFilme', async(request, response, next) => {
    let dadosDiretoresFilme = await diretoresFilmeController.getListarDiretoresFilmes();

    if (dadosDiretoresFilme) {
        response.status(dadosDiretoresFilme.status_code).json(dadosDiretoresFilme);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirDiretorFilme', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDados = await diretoresFilmeController.setNovoDiretorFilme(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.put('/v2/acmefilmes/atualizarDiretorFilme/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;
    let resultDados = await diretoresFilmeController.atualizarDiretorFilme(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarDiretorFilme/:id', async(request, response, next) => {
    const id = request.params.id;
    let resultDados = await diretoresFilmeController.excluirDiretorFilme(id);

    response.status(resultDados.status_code).json(resultDados);
});

// Rotas para tbl_atores_filme
app.get('/v2/acmefilmes/atoresFilme', async(request, response, next) => {
    let dadosAtoresFilme = await atoresFilmeController.getListarAtoresFilmes();

    if (dadosAtoresFilme) {
        response.status(dadosAtoresFilme.status_code).json(dadosAtoresFilme);
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' });
    }
});

app.post('/v2/acmefilmes/inserirAtorFilme', bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultDados = await atoresFilmeController.setNovoAtorFilme(dadosBody, contentType);

    response.status(resultDados.status_code).json(resultDados);

});

app.put('/v2/acmefilmes/atualizarAtorFilme/:id', bodyParser.json(), async(request, response, next) => {
    const id = request.params.id;
    let contentType = request.headers['content-type'];
    let novosDados = request.body;

    let resultDados = await atoresFilmeController.atualizarAtorFilme(id, novosDados, contentType);

    response.status(resultDados.status_code).json(resultDados);
});

app.delete('/v2/acmefilmes/deletarAtorFilme/:id', async(request, response, next) => {
    const id = request.params.id;

    let resultDados = await atoresFilmeController.excluirAtorFilme(id);

    response.status(resultDados.status_code).json(resultDados);
});


console.log("API funcionando na porta 8080")
app.listen(8080, () => {})