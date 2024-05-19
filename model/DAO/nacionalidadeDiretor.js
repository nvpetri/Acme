const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nacionalidadeDiretorDAO = {
    insertNacionalidadeDiretor: async function(dadosNacionalidadeDiretor) {
        try {
            const result = await prisma.tbl_nacionalidade_diretor.create({
                data: {
                    id_nacionalidade: dadosNacionalidadeDiretor.id_nacionalidade,
                    id_diretor: dadosNacionalidadeDiretor.id_diretor
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertNacionalidadeDiretor:", error);
            return false;
        }
    },
    // Listar todas as relações nacionalidade-diretor
    getAllNacionalidadeDiretor: async function() {
        try {
            const nacionalidadeDiretorList = await prisma.tbl_nacionalidade_diretor.findMany();
            return nacionalidadeDiretorList;
        } catch (error) {
            console.error("Error in getAllNacionalidadeDiretor:", error);
            return null;
        }
    },
    // Atualizar uma relação nacionalidade-diretor
    updateNacionalidadeDiretor: async function(id, novosDados) {
        try {
            const nacionalidadeDiretorAtualizada = await prisma.tbl_nacionalidade_diretor.update({
                where: { id: id },
                data: {
                    id_nacionalidade: novosDados.id_nacionalidade,
                    id_diretor: novosDados.id_diretor
                }
            });
            return nacionalidadeDiretorAtualizada;
        } catch (error) {
            console.error("Error in updateNacionalidadeDiretor:", error);
            return null;
        }
    },
    // Excluir uma relação nacionalidade-diretor
    deleteNacionalidadeDiretor: async function(id) {
        try {
            const result = await prisma.tbl_nacionalidade_diretor.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteNacionalidadeDiretor:", error);
            return false;
        }
    }
};

module.exports = nacionalidadeDiretorDAO;