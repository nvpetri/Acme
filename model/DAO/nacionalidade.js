const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nacionalidadeDAO = {
    insertNacionalidade: async function(nomeNacionalidade) {
        try {
            const result = await prisma.tbl_nacionalidade.create({
                data: {
                    nome: nomeNacionalidade
                }
            });
            return true;
        } catch (error) {
            console.error("Error in insertNacionalidade:", error);
            return false;
        }
    },
    // Listar todas as nacionalidades
    getAllNacionalidades: async function() {
        try {
            const nacionalidades = await prisma.tbl_nacionalidade.findMany();
            return nacionalidades;
        } catch (error) {
            console.error("Error in getAllNacionalidades:", error);
            return null;
        }
    },
    // Atualizar uma nacionalidade
    updateNacionalidade: async function(id, novoNome) {
        try {
            const nacionalidadeAtualizada = await prisma.tbl_nacionalidade.update({
                where: { id: id },
                data: { nome: novoNome }
            });
            return nacionalidadeAtualizada;
        } catch (error) {
            console.error("Error in updateNacionalidade:", error);
            return null;
        }
    },
    // Excluir uma nacionalidade
    deleteNacionalidade: async function(id) {
        try {
            const result = await prisma.tbl_nacionalidade.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            console.error("Error in deleteNacionalidade:", error);
            return false;
        }
    }
};

module.exports = nacionalidadeDAO;