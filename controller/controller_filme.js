/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os filmes
 * Data: 30/01/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const filmesDAO = require('../model/DAO/filme.js')
const ERROR_Messages = require('../modulo/config.js')

// Função para add novo filme
const setNovoFilme = async function(dadosFilme, content) {

    // const contentConvert = String(content).toLowerCase()

    // console.log(contentConvert)

    if (String(content).toLowerCase() == 'application/json') {

        let statusValidate = false
        let novoFilmeJson = {}

        if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.nome == null || dadosFilme.sinopse > 65000 ||
            dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao > 9 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
        ) {
            return ERROR_Messages.ERROR_REQUIRED_FIELDS
        } else {
            if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
                if (dadosFilme.data_relancamento.length != 10) {
                    return ERROR_Messages.ERROR_REQUIRED_FIELDS
                } else {
                    statusValidate = true
                }
            } else {
                statusValidate = true
            }
            if (statusValidate) {
                let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                if (novoFilme) {

                    novoFilmeJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoFilmeJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoFilmeJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoFilmeJson.filme = dadosFilme

                    return novoFilmeJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } else {
        return ERROR_Messages.ERROR_INVALID_FORMAT
    }

}


const setAtualizarFilme = async function() {

}

const setExcluirFilme = async function() {

}

const getListarFilmes = async function() {

    let filmesJson = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJson.filmes = dadosFilmes
            filmesJson.quantidade = dadosFilmes.length
            filmesJson.status_code = 200

            return filmesJson

        } else {
            return ERROR_Messages.ERROR_NOTFOUND
        }
    } else {
        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarFilme = async function(id) {
    let idFilme = id

    let filmeJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return ERROR_Messages.ERROR_INVALID_ID
    } else {
        let dadosFilme = await filmesDAO.selectFilmeById(idFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson

            } else
                return ERROR_Messages.ERROR_NOTFOUND
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const getFilmeNome = async function(name) {
    let nomeFilme = name

    let filmeJson = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return ERROR_Messages.ERROR_INVALID_NAME
    } else {
        let dadosFilme = await filmesDAO.selectFilmeByName(nomeFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeNome
}