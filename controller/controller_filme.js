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

    try {
        if (String(content).toLowerCase() == 'application/json') {

            console.table(dadosFilme)

            let statusValidate = false
            let novoFilmeJson = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.nome == null || dadosFilme.sinopse > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao > 9 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || isNaN(dadosFilme.id_classificacao) ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
            ) {

                console.log("erro if 1")
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {

                if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
                    console.log("erro if 2")
                    if (dadosFilme.data_relancamento.length != 10) {
                        console.log("teste")
                        return ERROR_Messages.ERROR_REQUIRED_FIELDS
                    } else {
                        console.log("testeeeee")
                        statusValidate = true
                    }
                } else {
                    statusValidate = true
                }
                if (statusValidate) {
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    if (novoFilme) {

                        let idFilme = await filmesDAO.getId()

                        novoFilmeJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                        novoFilmeJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                        novoFilmeJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                        novoFilmeJson.idNovoFilme = idFilme
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
    } catch (error) {
        
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarFilme = async function(id, novosDados, content) {
    try {
        console.log("oi")
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        } else {
            console.log("tudo bom?")

            if (!novosDados.nome || novosDados.nome === '' || novosDados.nome.length > 80 ||
                !novosDados.sinopse || novosDados.sinopse === '' || novosDados.sinopse.length > 65000 ||
                !novosDados.duracao || novosDados.duracao === '' || novosDados.duracao > 9 ||
                !novosDados.data_lancamento || novosDados.data_lancamento === '' || novosDados.data_lancamento.length !== 10 ||
                !novosDados.foto_capa || novosDados.foto_capa === '' || novosDados.foto_capa.length > 200 ||
                novosDados.id_classificacao == '' || novosDados.id_classificacao == undefined || novosDados.id_classificacao == null || isNaN(novosDados.id_classificacao) ||
                novosDados.valor_unitario && (isNaN(novosDados.valor_unitario) || novosDados.valor_unitario.length > 8)
            ) {
                if (!novosDados.data_relancamento || novosDados.data_relancamento.length !== 10) {
                    console.table(novosDados)
                    console.log("tudo certo")
                    const idFilme = id

                    const filmeAtualizado = await filmesDAO.updateFilme(idFilme, novosDados)

                    if (filmeAtualizado) {
                        let novoFilmeJson = {
                            status: ERROR_Messages.SUCCESS_UPDATED_ITEM.status,
                            status_code: ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code,
                            message: ERROR_Messages.SUCCESS_UPDATED_ITEM.message,
                            idFilmeAtualizado: idFilme,
                            filme: novosDados
                        }
                        return novoFilmeJson
                    } else {
                        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    return ERROR_Messages.ERROR_REQUIRED_FIELDS
                }
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM
    }
}

const setExcluirFilme = async function(id) {
    try {
        console.log(id, "id")

        const idFilme = id

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return ERROR_Messages.ERROR_INVALID_ID

        } else {
            const filmeExcluido = filmesDAO.deleteFilme(idFilme)

            if (filmeExcluido) {
                return ERROR_Messages.SUCCESS_DELETED_ITEM
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }

        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}

const getListarFilmes = async function() {

    try {

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
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getBuscarFilme = async function(id) {

    try {

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
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getFilmeNome = async function(name) {

    try {
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
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
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