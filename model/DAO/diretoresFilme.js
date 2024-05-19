const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const diretoresFilmeDAO = {
    insertDiretoresFilme: async function(dadosDiretoresFilme) {
        try {
            const result = await prisma.tbl_diretores_filme.create({
                data: {
                    id_diretor: dadosDiretoresFilme.id_diretor,
                    id_filme: dadosDiretoresFilme.id_filme
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertDiretoresFilme:", error);
            return false;
        }
    },
    // Listar todas as relações diretores-filme
    getAllDiretoresFilme: async function() {
        try {
            const diretoresFilmeList = await prisma.tbl_diretores_filme.findMany();
            return diretoresFilmeList;
        } catch (error) {
            console.error("Error in getAllDiretoresFilme:", error);
            return null;
        }
    },
    // Atualizar uma relação diretores-filme
    updateDiretoresFilme: async function(id, novosDados) {
        try {
            const diretoresFilmeAtualizada = await prisma.tbl_diretores_filme.update({
                where: { id: id },
                data: {
                    id_diretor: novosDados.id_diretor,
                    id_filme: novosDados.id_filme
                }
            });
            return diretoresFilmeAtualizada;
        } catch (error) {
            console.error("Error in updateDiretoresFilme:", error);
            return null;
        }
    },
    // Excluir uma relação diretores-filme
    deleteDiretoresFilme: async function(id) {
        try {
            const result = await prisma.tbl_diretores_filme.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteDiretoresFilme:", error);
            return false;
        }
    }
};

module.exports = diretoresFilmeDAO;