/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os atores
 * Data: 15/04/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const atoresDAO = require('../model/DAO/atores.js')
const Messages = require('../modulo/config.js')

const setNovoAtor = async function(novosDados, content) {

}

const setAtualizarAtor = async function(id, novosDados, content) {

}

const setExcluirAtor = async function(id) {

}

const getListarAtores = async function() {

}

const getBuscarAtorId = async function(id) {

}

const getBuscarAtorNome = async function(nome) {

}

module.exports = {
    setNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getListarAtores,
    getBuscarAtorId,
    getBuscarAtorNome
}