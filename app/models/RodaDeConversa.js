const prisma = require("../../server/database/prismaClient");

class RodaDeConversa {
    async createRodaDeConversa(data) {
        return await prisma.roda_De_Conversa.create({
            data
        });
    }

    async findRodaDeConversaById(rodaDeConversaId) {
        return await prisma.roda_De_Conversa.findUnique({
            where: {
                id: rodaDeConversaId
            }
        })
    }

    async findAllRodasDeConversa(query) {
        return await prisma.roda_De_Conversa.findMany({
            where: {
                OR: [
                    {
                        id: {
                            contains: query
                        }
                    },
                    {
                        nome: {
                            contains: query
                        }
                    }
                ]
            }
        })
    }

    async findSomeRodasDeConvesa() {
        return await prisma.roda_De_Conversa.findMany({
            take: 3
        })
    }

    async updateRodaDeConversa(data, rodaDeConversaId) {
        return await prisma.roda_De_Conversa.update({
            where: {
                id: rodaDeConversaId
            },
            data
        })
    }

    async deletarRodaDeConversa(rodaDeConversaId) {
        return await prisma.roda_De_Conversa.delete({
            where: {
                id: rodaDeConversaId
            }
        })
    }

    async getRodaDeConversaImageCapa(rodaDeConversaId) {
        return await prisma.roda_De_Conversa.findUnique({
            where: {
                id: rodaDeConversaId
            },
            select: {
                imagem_banner: true,
                tipo_imagem_banner: true
            }
        })
    }
}


const rodaDeConversaModel = new RodaDeConversa();

module.exports = rodaDeConversaModel;