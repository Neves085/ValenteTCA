const jwt = require("jsonwebtoken");
const profissionalModel = require("../../models/Profissional");

class PerfilProfissionalPacienteController {
    async returnPage(req, res) {
        const token = req.session.token;
        const profissionalId = req.params.perfissionalId;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
        }

        const profissional = await profissionalModel.findProfissionalById(profissionalId);

        return res.render("pages/perfil-profissional-paciente.ejs", {
            data: {
                page: "Perfil do profissional",
                usuarioLogado,
                tipoUsuario,
                profissional
            }
        })
    }
}

const perfilProfissionalPacienteControllerRead = new PerfilProfissionalPacienteController();

module.exports = perfilProfissionalPacienteControllerRead;