const diretoresDAO = require('../model/DAO/diretores.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovoDiretor = async function(novosDados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoDiretorJson = {}

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
                let novoDiretor = await diretoresDAO.insertDiretor(novosDados)

                if (novoDiretor) {

                    let idDiretor = await diretoresDAO.getId()

                    novoDiretorJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoDiretorJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoDiretorJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoDiretorJson.idNovoDiretor = idDiretor
                    novoDiretorJson.diretor = novosDados

                    return novoDiretorJson
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

const setAtualizarDiretor = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoDiretorJson = {}

            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 90 ||
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
                const novoDiretor = await diretoresDAO.updateDiretor(novosDados)

                if (novoDiretor) {

                    novoDiretorJson.status = ERROR_Messages.SUCCESS_UPDATED_ITEM.status
                    novoDiretorJson.status_code = ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code
                    novoDiretorJson.message = ERROR_Messages.SUCCESS_UPDATED_ITEM.message
                    novoDiretorJson.idDiretorAtualizado = novoDiretor.id
                    novoDiretorJson.diretor = novosDados

                    return novoDiretorJson
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

const setExcluirDiretor = async function(id) {
    try {
        const idDiretor = id

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            const diretorExcluido = await diretoresDAO.deleteDiretor(idDiretor)

            if (diretorExcluido) {
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

const getListarDiretores = async function() {
    try {
        let diretoresJson = {}

        let dadosDiretores = await diretoresDAO.selectAllDiretores()

        if (dadosDiretores) {
            if (dadosDiretores.length > 0) {
                diretoresJson.diretores = dadosDiretores
                diretoresJson.quantidade = dadosDiretores.length
                diretoresJson.status_code = 200

                return diretoresJson
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

const getDiretorId = async function(id) {
    try {
        let idDiretor = id

        let diretorJson = {}

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dadosDiretor = await diretoresDAO.selectDiretorById(idDiretor)

            if (dadosDiretor) {
                if (dadosDiretor.length > 0) {
                    diretorJson.diretor = dadosDiretor
                    diretorJson.status_code = 200

                    return diretorJson
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

const getDiretorNome = async function(name) {
    try {
        let nomeDiretor = name

        let diretorJson = {}

        if (nomeDiretor == '' || nomeDiretor == undefined) {
            return ERROR_Messages.ERROR_INVALID_NAME
        } else {
            let dadosDiretor = await diretoresDAO.selectDiretorByName(nomeDiretor)

            if (dadosDiretor) {
                if (dadosDiretor.length > 0) {
                    diretorJson.diretor = dadosDiretor
                    diretorJson.status_code = 200

                    return diretorJson
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
    setNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getDiretorId,
    getDiretorNome
}