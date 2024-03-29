const prisma = require("../../server/database/prismaClient");

class Desabafo {
    async createDesabafo(data) {
        await prisma.desabafo.create({
            data
        })
    }

    async findAllDesabafos() {
        return await prisma.desabafo.findMany({
            include: {
                user: true
            }
        });
    }
}

const desabafoModel = new Desabafo();

module.exports = desabafoModel;