const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const atoresFilmeDAO = {
    insertAtoresFilme: async function(dadosAtoresFilme) {
        try {
            const result = await prisma.tbl_atores_filme.create({
                data: {
                    id_ator: dadosAtoresFilme.id_ator,
                    id_filme: dadosAtoresFilme.id_filme
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertAtoresFilme:", error);
            return false;
        }
    },
    // Listar todas as relações atores-filme
    getAllAtoresFilme: async function() {
        try {
            const atoresFilmeList = await prisma.tbl_atores_filme.findMany();
            return atoresFilmeList;
        } catch (error) {
            console.error("Error in getAllAtoresFilme:", error);
            return null;
        }
    },
    // Atualizar uma relação atores-filme
    updateAtoresFilme: async function(id, novosDados) {
        try {
            const atoresFilmeAtualizada = await prisma.tbl_atores_filme.update({
                where: { id: id },
                data: {
                    id_ator: novosDados.id_ator,
                    id_filme: novosDados.id_filme
                }
            });
            return atoresFilmeAtualizada;
        } catch (error) {
            console.error("Error in updateAtoresFilme:", error);
            return null;
        }
    },
    // Excluir uma relação atores-filme
    deleteAtoresFilme: async function(id) {
        try {
            const result = await prisma.tbl_atores_filme.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteAtoresFilme:", error);
            return false;
        }
    }
};

module.exports = atoresFilmeDAO;