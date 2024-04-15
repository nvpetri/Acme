/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os generos
 * Data: 15/04/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const generosDAO = require('../model/DAO/genero.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovoGenero = async function(dadosGenero, content) {

}

const setAtualizarGenero = async function(id, novosDados, content) {

}

const setExcluirGenero = async function(id) {

}

const getListarGenero = async function() {
    try {

        let generosJson = {}

        let dadosGenero = await generosDAO.selectAllGenero()

        if (dadosGenero) {

            if (dadosGenero.length > 0) {
                generosJson.genero = dadosGenero
                generosJson.quantidade = dadosGenero.length
                generosJson.status_code = 200

                console.log(dadosGenero)
                return generosJson

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

const getBuscarGenero = async function(id) {

}

const getGeneroNome = async function(name) {

}

module.exports = {
    setNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGenero,
    getGeneroNome,
    getListarGenero
}