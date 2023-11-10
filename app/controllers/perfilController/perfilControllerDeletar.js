const jwt = require("jsonwebtoken");
const usuarioModel = require("../../models/Usuario");

class PerfilController {
    async deletarUsuario(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ error: "Token não fornecido" });
            }

            const { userId } = jwt.decode(token, process.env.SECRET);

            await usuarioModel.deleteUsuario(userId);

            req.session.destroy();

            return res.redirect("/");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao excluir o usuário" });
        }
    }
}

const perfilControllerRead = new PerfilController();

module.exports = perfilControllerRead;
