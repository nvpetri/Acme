/****************************************
 * Objetivo: fazer as consultas no json
 * Autor: Nicolas Vasconcelos
 * Data: 23/01/2024
 * Versão: 1.0
 *****************************************/

var dadosFilmes = require('../model/filmes.js')

const getListaFilmes = () => {
    const filmes = dadosFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []

    filmes.forEach((filme) => {
        let jsonFilmes = {
            id: filme.id,
            nome: filme.nome,
        }

        arrayFilmes.push(jsonFilmes)
    })

    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes

}

module.exports = {
    getListaFilmes
}