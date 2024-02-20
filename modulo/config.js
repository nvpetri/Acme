/*************************************************************************
 * Objetivo: Arquivo responsável pelas variaveis globais, onde haverão
 * mensagens, status code e outros conteudos para o projeto.
 * 
 * Data: 20/02/2024
 * Autor: Nicolas
 * Versão: 1.0
 ************************************************************************/

/***********************Mensagens de erro******************************* */
const ERROR_INVALID_ID = { status: false, status_code: 400, message: "Id invalido" }

const ERROR_NOTFOUND = { status: false, status_code: 404, message: "Nenhum item encontrado" }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: "Ocorreram erros no processamento da DB. Contate o administrador da API" }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOTFOUND,
    ERROR_INTERNAL_SERVER_DB
}