// Controlador para tbl_nacionalidade_ator
const nacionalidadeAtorDAO = require('../model/DAO/nacionalidadeAtor.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovaNacionalidadeAtor = async function(dadosNacionalidadeAtor, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosNacionalidadeAtor.id_nacionalidade || !dadosNacionalidadeAtor.id_ator) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoNacionalidadeAtor = await nacionalidadeAtorDAO.insertNacionalidadeAtor(dadosNacionalidadeAtor);
                if (novoNacionalidadeAtor) {
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
const getListaNacionalidadeAtores = async function() {
    try {
        let nacionalidadeAtoresJson = {};
        let dadosNacionalidadeAtores = await nacionalidadeAtorDAO.selectAllNacionalidadeAtores();
        if (dadosNacionalidadeAtores) {
            nacionalidadeAtoresJson.nacionalidadeAtores = dadosNacionalidadeAtores;
            nacionalidadeAtoresJson.quantidade = dadosNacionalidadeAtores.length;
            nacionalidadeAtoresJson.status_code = 200;
            return nacionalidadeAtoresJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarNacionalidadeAtor = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let nacionalidadeAtorAtualizado = await nacionalidadeAtorDAO.updateNacionalidadeAtor(id, novosDados);
        if (nacionalidadeAtorAtualizado) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirNacionalidadeAtor = async function(id) {
    try {
        let nacionalidadeAtorExcluido = await nacionalidadeAtorDAO.deleteNacionalidadeAtor(id);
        if (nacionalidadeAtorExcluido) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovaNacionalidadeAtor,
    getListaNacionalidadeAtores,
    atualizarNacionalidadeAtor,
    excluirNacionalidadeAtor
};