const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertDiretor = async function(dadosDiretores) {
    try {
        let sql

        if (
            dadosDiretores.data_falecimento == '' && dadosDiretores.data_falecimento == undefined && dadosDiretores.data_falecimento == null
        ) {
            sql = `insert into tbl_diretores (
                                                nome,
                                                nome_artistico,
                                                biografia,
                                                foto,
                                                data_nascimento,
                                                data_falecimento,
                                                id_sexo
                                            ) values(
                                                        '${dadosDiretores.nome}',
                                                        '${dadosDiretores.nome_artistico}',
                                                        '${dadosDiretores.biografia}',
                                                        '${dadosDiretores.foto}',
                                                        '${dadosDiretores.data_nascimento}',
                                                        null,
                                                        '${dadosDiretores.id_sexo}',
                                                    )`
        } else {
            sql = `insert into tbl_diretores (
                                                nome,
                                                nome_artistico,
                                                biografia,
                                                foto,
                                                data_nascimento,
                                                data_falecimento,
                                                id_sexo
                                            ) values(
                                                        '${dadosDiretores.nome}',
                                                        '${dadosDiretores.nome_artistico}',
                                                        '${dadosDiretores.biografia}',
                                                        '${dadosDiretores.foto}',
                                                        '${dadosDiretores.data_nascimento}',
                                                        '${dadosDiretores.data_falecimento}',
                                                        '${dadosDiretores.id_sexo}',
                                                    )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_diretores order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const updateDiretor = async function(id, novosDados) {
    try {
        let sql = `UPDATE tbl_diretores SET `
        const keys = Object.keys(novosDados)

        keys.forEach((key, index) => {
            sql += `${key} = '${novosDados[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const deleteDiretor = async function(id) {
    const idFilme = id

    try {
        let sql = `delete from tbl_diretores where id = ${idFilme}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const selectAllDiretores = async function() {
    try {

        let sql = 'select * from tbl_diretores'

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectDiretoresId = async function(id) {
    try {
        let sql = `select * from tbl_diretores where id=${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

const selectDiretoresNome = async function(nome) {
    try {
        let sql = `select * from tbl_diretores where nome like "%${nome}%"`

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretor,
    getId,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectDiretoresId,
    selectDiretoresNome
}