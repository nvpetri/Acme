/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no banco de dados MySql
 * Data: 30/01/2024
 * Autor: Nicolas Vasconcelos
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertFilme = async function() {

}

const updateFilme = async function() {

}

const deleteFilme = async function() {

}

const selectAllFilmes = async function() {
    let sql = 'select * from tbl_filme'

    /**
     * $queryRawUnsafe(sql) --encaminha uma variavel
     * $queryRaw('select * from tbl_filme') -- encaminha o script direto
     */

    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if (rsFilmes.length > 0) return rsFilmes
    else return false
}

const selectFilmeById = async function() {

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeById
}