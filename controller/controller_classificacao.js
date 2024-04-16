/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para as classificações
 * Data: 15/04/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const classificacaoDAO = require('../model/DAO/classificacao.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovaClassificacao = async function(dadosClassificacao, content) {

}

const setAtualizarClassificacao = async function(id, novosDados, content) {

}

const setExcluirClassificacao = async function(id) {

}

const getListarClassificacao = async function() {
    try {

        let classificacaoJson = {}

        let dadosClassificacao = await classificacaoDAO.selectAllClassificacao()

        if (dadosClassificacao) {

            if (dadosClassificacao.length > 0) {
                classificacaoJson.Classificacao = dadosClassificacao
                classificacaoJson.quantidade = dadosClassificacao.length
                classificacaoJson.status_code = 200

                return classificacaoJson

            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getBuscarClassificacao = async function(id) {

}

const getClassificacaoNome = async function(name) {

}

module.exports = {
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacao,
    getClassificacaoNome,
    getListarClassificacao
}