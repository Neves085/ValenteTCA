const jwt = require("jsonwebtoken");
const profissionalModel = require("../../models/Profissional");

class PerfilProfissionalController {
    async deletarProfissional(req, res) {
        try {
            const token = req.session.token;
            const { userId } = jwt.decode(token, process.env.SECRET);

            await profissionalModel.deleteProfissional(userId);

            req.session.destroy();

            return res.redirect("/");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao excluir o usuário" });
        }
    }
}

const perfilProfissionalControllerRead = new PerfilProfissionalController();

module.exports = perfilProfissionalControllerRead;
