const profissionalModel = require("../../models/Profissional");
const jwt = require("jsonwebtoken");
const sessaoModel = require("../../models/Sessao");

class perfilController {
    async returnPage(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        let usuarioLogado = true;

        const profissional = await profissionalModel.findProfissionalById(userId);
        const sessoes = await sessaoModel.findAllSessoesFromUser(userId);

        return res.render("pages/perfil-profissional.ejs", {
            data: {
                page: "perfil",
                usuarioLogado,
                profissional,
                tipoUsuario: userType,
                sessoes
            }
        })
    }
}

const perfilControllerRead = new perfilController();

module.exports = perfilControllerRead;