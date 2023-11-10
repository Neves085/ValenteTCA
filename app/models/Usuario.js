const prisma = require("../../server/database/prismaClient");

class Usuario {
    async findAllUsers(userId, query) {
        return await prisma.usuario.findMany({
            where: {
                NOT: {
                    id: userId
                },
                ativado: 1,
                OR: [
                    {
                        id: {
                            contains: query
                        }
                    },
                    {
                        email: {
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

    async findUserById(userId) {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    }

    async findUserByEmail(userEmail) {
        const user = await prisma.usuario.findUnique({
            where: {
                email: userEmail
            }
        })

        return user;
    }

    async createUsuario(data) {
        await prisma.usuario.create({
            data
        })
    }


    async updateUserCustomerId(userId, customerId) {
        await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                customer_id: customerId
            }
        })
    }

    async updatePerfil(data, userId){
        await prisma.usuario.update({
            where: {
                id: userId
            },
            data
        })
    }

    async deleteUsuario(userId){
        await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                ativado: 0
            }
        })
    }

    async getUserImage(userId) {
        return await prisma.usuario.findUnique({
            where: {
                id: userId
            },
            select: {
                imagem_perfil: true,
                tipo_imagem_perfil: true
            }
        })
    }
}

const usuarioModel = new Usuario();

module.exports = usuarioModel;