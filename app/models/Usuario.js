const prisma = require("../../server/database/prismaClient");

class Usuario {
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

    async deleteUsuario(data, userId){
        await prisma.usuario.delete({
            where:{
                id: userId
            },
            data
        })
    }

}

const usuarioModel = new Usuario();

module.exports = usuarioModel;