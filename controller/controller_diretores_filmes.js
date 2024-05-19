// Controlador para tbl_diretores_filme
const diretoresFilmeDAO = require('../model/DAO/diretoresFilme.js');
const ERROR_Messages = require('../modulo/config.js');

// Adicionar um novo registro
const setNovoDiretorFilme = async function(dadosDiretorFilme, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (!dadosDiretorFilme.id_diretor || !dadosDiretorFilme.id_filme) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoDiretorFilme = await diretoresFilmeDAO.insertDiretorFilme(dadosDiretorFilme);
                if (novoDiretorFilme) {
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
const getListaDiretoresFilmes = async function() {
    try {
        let diretoresFilmes
        Json = {};
        let dadosDiretoresFilmes = await diretoresFilmeDAO.selectAllDiretoresFilmes();
        if (dadosDiretoresFilmes) {
            diretoresFilmesJson.diretoresFilmes = dadosDiretoresFilmes;
            diretoresFilmesJson.quantidade = dadosDiretoresFilmes.length;
            diretoresFilmesJson.status_code = 200;
            return diretoresFilmesJson;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

// Atualizar um registro existente
const atualizarDiretorFilme = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT;
        }

        let diretorFilmeAtualizado = await diretoresFilmeDAO.updateDiretorFilme(id, novosDados);
        if (diretorFilmeAtualizado) {
            return ERROR_Messages.SUCCESS_UPDATED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM;
    }
};

// Excluir um registro
const excluirDiretorFilme = async function(id) {
    try {
        let diretorFilmeExcluido = await diretoresFilmeDAO.deleteDiretorFilme(id);
        if (diretorFilmeExcluido) {
            return ERROR_Messages.SUCCESS_DELETED_ITEM;
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setNovoDiretorFilme,
    getListaDiretoresFilmes,
    atualizarDiretorFilme,
    excluirDiretorFilme
};