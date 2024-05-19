// Controlador para tbl_atores_filme
const atoresFilmeDAO = require('../model/DAO/atoresFilme.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovoAtorFilme = async function(dadosAtorFilme, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosAtorFilme.id_ator || !dadosAtorFilme.id_filme) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoAtorFilme = await atoresFilmeDAO.insertAtorFilme(dadosAtorFilme);
                if (novoAtorFilme) {
                    return ERROR_Messages.SUCCESS_CREATED_ITEM;
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Ler todos os registros
const getListaAtoresFilmes = async function() {
    try {
        let atoresFilmesJson = {};
        let dadosAtoresFilmes = await atoresFilmeDAO.selectAllAtoresFilmes();
        if (dadosAtoresFilmes) {
            atoresFilmesJson.atoresFilmes = dadosAtoresFilmes;
            atoresFilmesJson.quantidade = dadosAtoresFilmes.length;
            atoresFilmesJson.status_code = 200;
            return atoresFilmesJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarAtorFilme = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let atorFilmeAtualizado = await atoresFilmeDAO.updateAtorFilme(id, novosDados);
        if (atorFilmeAtualizado) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirAtorFilme = async function(id) {
    try {
        let atorFilmeExcluido = await atoresFilmeDAO.deleteAtorFilme(id);
        if (atorFilmeExcluido) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovoAtorFilme,
    getListaAtoresFilmes,
    atualizarAtorFilme,
    excluirAtorFilme
};