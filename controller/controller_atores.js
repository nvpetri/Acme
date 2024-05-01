/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os atores
 * Data: 15/04/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const atoresDAO = require('../model/DAO/atores.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovoAtor = async function(novosDados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoAtorJson = {}

            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 90 ||
                novosDados.nome_artistico == '' || novosDados.nome_artistico == undefined || novosDados.nome_artistico == null || novosDados.nome_artistico.length > 90 ||
                novosDados.biografia == '' || novosDados.biografia == undefined || novosDados.biografia == null ||
                novosDados.data_nascimento == '' || novosDados.data_nascimento == undefined || novosDados.data_nascimento == null || novosDados.data_nascimento.length != 10 ||
                novosDados.foto == '' || novosDados.foto == undefined || novosDados.foto == null || novosDados.foto.length > 200 ||
                novosDados.id_sexo == '' || novosDados.id_sexo == undefined || novosDados.id_sexo == null || isNaN(novosDados.id_sexo)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (novosDados.data_falecimento == '' || novosDados.data_falecimento == undefined || novosDados.data_falecimento == null || novosDados.data_falecimento.length != 10) {
                    statusValidate = true
                }
            }
            if (statusValidate) {
                let novoAtor = await atoresDAO.insertAtor(novosDados)

                if (novoAtor) {

                    let idAtor = await atoresDAO.getId()

                    novoAtorJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoAtorJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoAtorJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoAtorJson.idNovoAtor = idAtor
                    novoAtorJson.ator = novosDados

                    return novoFilmeJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoAtorJson = {}

            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 90 ||
                novosDados.nome_artistico == '' || novosDados.nome_artistico == undefined || novosDados.nome_artistico == null || novosDados.nome_artistico.length > 90 ||
                novosDados.biografia == '' || novosDados.biografia == undefined || novosDados.biografia == null ||
                novosDados.data_nascimento == '' || novosDados.data_nascimento == undefined || novosDados.data_nascimento == null || novosDados.data_nascimento.length != 10 ||
                novosDados.foto == '' || novosDados.foto == undefined || novosDados.foto == null || novosDados.foto.length > 200 ||
                novosDados.id_sexo == '' || novosDados.id_sexo == undefined || novosDados.id_sexo == null || isNaN(novosDados.id_sexo)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (novosDados.data_falecimento == '' || novosDados.data_falecimento == undefined || novosDados.data_falecimento == null || novosDados.data_falecimento.length != 10) {
                    statusValidate = true
                }
            }

            if (statusValidate) {
                const novoAtor = await atoresDAO.updateAtor(novosDados)

                if (novoAtor) {

                    novoAtorJson.status = ERROR_Messages.SUCCESS_UPDATED_ITEM.status
                    novoAtorJson.status_code = ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code
                    novoAtorJson.message = ERROR_Messages.SUCCESS_UPDATED_ITEM.message
                    novoAtorJson.idAtorAtualizado = novoAtor.id
                    novoAtorJson.ator = novosDados

                    return novoAtorJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}

const setExcluirAtor = async function(id) {
    try {
        const idAtor = id

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            const atorExcluido = await atoresDAO.deleteAtor(idAtor)

            if (atorExcluido) {
                return ERROR_Messages.SUCCESS_DELETED_ITEM
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_ID
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getListarAtores = async function() {
    try {
        let atoresJson = {}

        let dadosAtores = await atoresDAO.selectAllAtores()

        if (dadosAtores) {
            if (dadosAtores.length > 0) {
                atoresJson.atores = dadosAtores
                atoresJson.quantidade = dadosAtores.length
                atoresJson.status_code = 200

                return atoresJson
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

const getAtorId = async function(id) {
    try {
        let idAtor = id

        let atorJson = {}

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dadosAtor = await atoresDAO.selectAtorById(idAtor)

            if (dadosAtor) {
                if (dadosAtor.length > 0) {
                    atorJson.ator = dadosAtor
                    atorJson.status_code = 200

                    return atorJson
                } else {
                    return ERROR_Messages.ERROR_NOTFOUND
                }
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getAtorNome = async function(name) {
    try {
        let nomeAtor = name

        let atorJson = {}

        if (nomeAtor == '' || nomeAtor == undefined) {
            return ERROR_Messages.ERROR_INVALID_NAME
        } else {
            let dadosAtor = await atoresDAO.selectAtorByName(nomeAtor)

            if (dadosAtor) {
                if (dadosAtor.length > 0) {
                    atorJson.ator = dadosAtor
                    atorJson.status_code = 200

                    return atorJson
                } else {
                    return ERROR_Messages.ERROR_NOTFOUND
                }
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    setNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getListarAtores,
    getAtorId,
    getAtorNome
}