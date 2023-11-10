const prisma = require("../../server/database/prismaClient");

class Profissional {
    async createProfissional(data) {
        return await prisma.profissional.create({
            data
        })
    }

    async findProfissionalByEmail(email) {
        return await prisma.profissional.findUnique({
            where: {
                email: email
            }
        })
    }

    async findProfissionalById(id) {
        return await prisma.profissional.findUnique({
            where: {
                id: id
            }
        })
    }

    async getProfissionalImage(userId) {
        return await prisma.profissional.findUnique({
            where: {
                id: userId
            },
            select: {
                imagem_perfil: true,
                tipo_imagem_perfil: true
            }
        })
    }

    async updateProfissional(data, userId) {
        return await prisma.profissional.update({
            data,
            where: {
                id: userId
            }
        })
    }

    async deleteProfissional(userId) {
        return await prisma.profissional.update({
            where: {
                id: userId
            },
            data: {
                ativado: 0
            }
        })
    }

    async findAllProfissionais(userId, query) {
        return await prisma.profissional.findMany({
            where: {
                NOT: {
                    OR: [
                        {
                            id: userId
                        },
                        {
                            ativado: 0
                        }
                    ]
                },
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
                    },
                    {
                        email: {
                            contains: query
                        }
                    }
                ]
            }
        })
    }
}


const profissionalModel = new Profissional();

module.exports = profissionalModel;