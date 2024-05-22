// Controlador para tbl_filme_genero
const filmesGeneroDAO = require('../model/DAO/generoFilme.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovoFilmeGenero = async function(dadosFilmeGenero, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosFilmeGenero.id_genero || !dadosFilmeGenero.id_filme) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoFilmeGenero = await filmesGeneroDAO.insertFilmeGenero(dadosFilmeGenero);
                if (novoFilmeGenero) {
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
const getListaFilmesGeneros = async function() {
    try {
        let filmesGenerosJson = {};
        let dadosFilmesGeneros = await filmesGeneroDAO.selectAllFilmesGeneros();
        if (dadosFilmesGeneros) {
            filmesGenerosJson.filmesGeneros = dadosFilmesGeneros;
            filmesGenerosJson.quantidade = dadosFilmesGeneros.length;
            filmesGenerosJson.status_code = 200;
            return filmesGenerosJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarFilmeGenero = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let filmeGeneroAtualizado = await filmesGeneroDAO.updateFilmeGenero(id, novosDados);
        if (filmeGeneroAtualizado) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirFilmeGenero = async function(id) {
    try {
        let filmeGeneroExcluido = await filmesGeneroDAO.deleteFilmeGenero(id);
        if (filmeGeneroExcluido) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovoFilmeGenero,
    getListaFilmesGeneros,
    atualizarFilmeGenero,
    excluirFilmeGenero
};