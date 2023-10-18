const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PerfilController {
    async deletarUsuario(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ error: "Token não fornecido" });
            }

            const { userId } = jwt.verify(token, process.env.SECRET);

            const deletedUser = await prisma.usuario.delete({
                where: { id: userId }
            });

            return res.render("pages/perfil.ejs", {
                data: {
                    page: "Perfil",
                    deletedUser
                }});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao excluir o usuário" });
        }
    }
}

const perfilControllerRead = new PerfilController();

module.exports = perfilControllerRead;
