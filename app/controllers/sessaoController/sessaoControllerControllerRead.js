const jwt = require("jsonwebtoken");
const sessaoModel = require("../../models/Sessao");

class SessoesController {
    async returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;
        const sessaoId = req.params.sessaoId;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType
        }

        const sessao = await sessaoModel.findSessaoById(sessaoId);

        return res.render("pages/sessao.ejs", {
            data: {
                page: "Sessão",
                usuarioLogado,
                tipoUsuario,
                sessao
            }
        })
    }
}

const sessoesControllerRead = new SessoesController();

module.exports = sessoesControllerRead;