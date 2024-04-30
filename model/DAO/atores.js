const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertAtor = async function(dadosAtores) {
    try {
        let sql

        if (
            dadosAtores.data_falecimento == '' && dadosAtores.data_falecimento == undefined && dadosAtores.data_falecimento == null
        ) {
            sql = `insert into tbl_atores (
                                                nome,
                                                nome_artistico,
                                                biografia,
                                                foto,
                                                data_nascimento,
                                                data_falecimento,
                                                id_sexo
                                            ) values(
                                                        '${dadosAtores.nome}',
                                                        '${dadosAtores.nome_artistico}',
                                                        '${dadosAtores.biografia}',
                                                        '${dadosAtores.foto}',
                                                        '${dadosAtores.data_nascimento}',
                                                        null,
                                                        '${dadosAtores.id_sexo}',
                                                    )`
        } else {
            sql = `insert into tbl_atores (
                                                nome,
                                                nome_artistico,
                                                biografia,
                                                foto,
                                                data_nascimento,
                                                data_falecimento,
                                                id_sexo
                                            ) values(
                                                        '${dadosAtores.nome}',
                                                        '${dadosAtores.nome_artistico}',
                                                        '${dadosAtores.biografia}',
                                                        '${dadosAtores.foto}',
                                                        '${dadosAtores.data_nascimento}',
                                                        '${dadosAtores.data_falecimento}',
                                                        '${dadosAtores.id_sexo}',
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
        const sqlGet = 'select cast(id as decimal) as id from tbl_atores order by id desc limit 1'

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

const updateAtor = async function(id, novosDados) {
    try {
        let sql = `UPDATE tbl_atores SET `
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

const deleteAtor = async function(id) {
    const idFilme = id

    try {
        let sql = `delete from tbl_atores where id = ${idFilme}`

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

const selectAllAtores = async function() {
    try {

        let sql = 'select * from tbl_atores'

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectAtoresId = async function(id) {
    try {
        let sql = `select * from tbl_atores where id=${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

const selectAtoresNome = async function(nome) {
    try {
        let sql = `select * from tbl_atores where nome like "%${nome}%"`

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtor,
    getId,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectAtoresId,
    selectAtoresNome
}