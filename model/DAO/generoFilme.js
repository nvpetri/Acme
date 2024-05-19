const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const filmeGeneroDAO = {
    insertFilmeGenero: async function(dadosFilmeGenero) {
        try {
            const result = await prisma.tbl_filme_genero.create({
                data: {
                    id_genero: dadosFilmeGenero.id_genero,
                    id_filme: dadosFilmeGenero.id_filme
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertFilmeGenero:", error);
            return false;
        }
    },
    // Listar todos os registros de filme_genero
    getAllFilmeGenero: async function() {
        try {
            const filmeGeneroList = await prisma.tbl_filme_genero.findMany();
            return filmeGeneroList;
        } catch (error) {
            console.error("Error in getAllFilmeGenero:", error);
            return null;
        }
    },
    // Atualizar um registro de filme_genero
    updateFilmeGenero: async function(id, novosDados) {
        try {
            const filmeGeneroAtualizado = await prisma.tbl_filme_genero.update({
                where: { id: id },
                data: {
                    id_genero: novosDados.id_genero,
                    id_filme: novosDados.id_filme
                }
            });
            return filmeGeneroAtualizado;
        } catch (error) {
            console.error("Error in updateFilmeGenero:", error);
            return null;
        }
    },
    // Excluir um registro de filme_genero
    deleteFilmeGenero: async function(id) {
        try {
            const result = await prisma.tbl_filme_genero.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteFilmeGenero:", error);
            return false;
        }
    }
};

module.exports = filmeGeneroDAO;