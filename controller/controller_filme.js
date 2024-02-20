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
const setNovoFilme = async function() {

}


const setAtualizarFilme = async function() {

}

const setExcluirFilme = async function() {

}

const getListarFilmes = async function() {

    let filmesJson = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes) {
        filmesJson.filmes = dadosFilmes
        filmesJson.quantidade = dadosFilmes.length
        filmesJson.status_code = 200

        return filmesJson
    } else {
        return false
    }
}

const getBuscarFilme = async function(id) {
    let idFilme = id

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return ERROR_Messages.ERROR_INVALID_ID
    } else {
        let dadosFilme = await filmesDAO.selectFilmeById

        if (dadosFilme) {
            let filmeJson = {}

            filmeJson.filme = dadosFilme
            filmeJson.status_code = 200

            return filmeJson
        } else {
            return ERROR_Messages.ERROR_NOTFOUND
        }
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}