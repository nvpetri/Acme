const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nacionalidadeAtorDAO = {
    insertNacionalidadeAtor: async function(dadosNacionalidadeAtor) {
        try {
            const result = await prisma.tbl_nacionalidade_ator.create({
                data: {
                    id_nacionalidade: dadosNacionalidadeAtor.id_nacionalidade,
                    id_ator: dadosNacionalidadeAtor.id_ator
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertNacionalidadeAtor:", error);
            return false;
        }
    },
    // Listar todas as relações nacionalidade-ator
    getAllNacionalidadeAtor: async function() {
        try {
            const nacionalidadeAtorList = await prisma.tbl_nacionalidade_ator.findMany();
            return nacionalidadeAtorList;
        } catch (error) {
            console.error("Error in getAllNacionalidadeAtor:", error);
            return null;
        }
    },
    // Atualizar uma relação nacionalidade-ator
    updateNacionalidadeAtor: async function(id, novosDados) {
        try {
            const nacionalidadeAtorAtualizada = await prisma.tbl_nacionalidade_ator.update({
                where: { id: id },
                data: {
                    id_nacionalidade: novosDados.id_nacionalidade,
                    id_ator: novosDados.id_ator
                }
            });
            return nacionalidadeAtorAtualizada;
        } catch (error) {
            console.error("Error in updateNacionalidadeAtor:", error);
            return null;
        }
    },
    // Excluir uma relação nacionalidade-ator
    deleteNacionalidadeAtor: async function(id) {
        try {
            const result = await prisma.tbl_nacionalidade_ator.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteNacionalidadeAtor:", error);
            return false;
        }
    }
};

module.exports = nacionalidadeAtorDAO;