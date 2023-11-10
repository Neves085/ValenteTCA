const prisma = require("../../server/database/prismaClient");

class Sessao {
    async createSessao(data) {
        return await prisma.sessao.create({
            data
        });
    }

    async findAllSessoesFromUser(userId) {
        return await prisma.sessao.findMany({
            where: {
                criador: userId
            }
        })
    }

    async findSessaoById(sessaoId) {
        return await prisma.sessao.findUnique({
            where: {
                id: sessaoId
            },
            include: {
                profissional: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });
    }

    async inscreverUsuario(data) {
        await prisma.sessao.create({
            data
        })
    }
}


const sessaoModel = new Sessao();

module.exports = sessaoModel;