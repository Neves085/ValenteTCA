const jwt = require("jsonwebtoken");
const profissionalModel = require("../../models/Profissional");
const sessaoModel = require("../../models/Sessao");

class PerfilProfissionalPacienteController {
    async returnPage(req, res) {
        const token = req.session.token;
        const profissionalId = req.params.perfissionalId;
        let usuarioLogado = false;
        let tipoUsuario = undefined;
        let usuarioId = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
            usuarioId = tokenInfo.userId;
        }

        if (usuarioId === profissionalId) {
            res.redirect("/perfil-profissional");
        }

        const profissional = await profissionalModel.findProfissionalById(profissionalId);
        const sessoes = await sessaoModel.findAllSessoesFromUser(profissionalId);

        return res.render("pages/perfil-profissional-paciente.ejs", {
            data: {
                page: "Perfil do profissional",
                usuarioLogado,
                tipoUsuario,
                profissional,
                sessoes
            }
        })
    }
}

const perfilProfissionalPacienteControllerRead = new PerfilProfissionalPacienteController();

module.exports = perfilProfissionalPacienteControllerRead;