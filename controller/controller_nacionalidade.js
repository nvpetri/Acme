// Controlador para tbl_nacionalidade
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovaNacionalidade = async function(dadosNacionalidade, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosNacionalidade.nome) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novaNacionalidade = await nacionalidadeDAO.insertNacionalidade(dadosNacionalidade);
                if (novaNacionalidade) {
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
const getListaNacionalidades = async function() {
    try {
        let nacionalidadesJson = {};
        let dadosNacionalidades = await nacionalidadeDAO.selectAllNacionalidades();
        if (dadosNacionalidades) {
            nacionalidadesJson.nacionalidades = dadosNacionalidades;
            nacionalidadesJson.quantidade = dadosNacionalidades.length;
            nacionalidadesJson.status_code = 200;
            return nacionalidadesJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarNacionalidade = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let nacionalidadeAtualizada = await nacionalidadeDAO.updateNacionalidade(id, novosDados);
        if (nacionalidadeAtualizada) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirNacionalidade = async function(id) {
    try {
        let nacionalidadeExcluida = await nacionalidadeDAO.deleteNacionalidade(id);
        if (nacionalidadeExcluida) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovaNacionalidade,
    getListaNacionalidades,
    atualizarNacionalidade,
    excluirNacionalidade
};