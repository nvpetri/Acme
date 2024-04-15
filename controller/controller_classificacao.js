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