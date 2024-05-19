// Controlador para tbl_nacionalidade_diretor
const nacionalidadeDiretorDAO = require('../model/DAO/nacionalidadeDiretor.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovaNacionalidadeDiretor = async function(dadosNacionalidadeDiretor, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosNacionalidadeDiretor.id_nacionalidade || !dadosNacionalidadeDiretor.id_diretor) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoNacionalidadeDiretor = await nacionalidadeDiretorDAO.insertNacionalidadeDiretor(dadosNacionalidadeDiretor);
                if (novoNacionalidadeDiretor) {
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
const getListaNacionalidadeDiretores = async function() {
    try {
        let nacionalidadeDiretoresJson = {};
        let dadosNacionalidadeDiretores = await nacionalidadeDiretorDAO.selectAllNacionalidadeDiretores();
        if (dadosNacionalidadeDiretores) {
            nacionalidadeDiretoresJson.nacionalidadeDiretores = dadosNacionalidadeDiretores;
            nacionalidadeDiretoresJson.quantidade = dadosNacionalidadeDiretores.length;
            nacionalidadeDiretoresJson.status_code = 200;
            return nacionalidadeDiretoresJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarNacionalidadeDiretor = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let nacionalidadeDiretorAtualizado = await nacionalidadeDiretorDAO.updateNacionalidadeDiretor(id, novosDados);
        if (nacionalidadeDiretorAtualizado) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirNacionalidadeDiretor = async function(id) {
    try {
        let nacionalidadeDiretorExcluido = await nacionalidadeDiretorDAO.deleteNacionalidadeDiretor(id);
        if (nacionalidadeDiretorExcluido) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovaNacionalidadeDiretor,
    getListaNacionalidadeDiretores,
    atualizarNacionalidadeDiretor,
    excluirNacionalidadeDiretor
};