const jwt = require("jsonwebtoken");
const rodaDeConversaModel = require("../../models/RodaDeConversa");

class RodaDeConversaSessoesController {
    async returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;
        const nomeRoda = req.params.nomeRoda;

        const rodaDeConversa = await rodaDeConversaModel.findRodaDeConversaByNome(nomeRoda);

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/roda-de-conversa-sessoes.ejs", {
            data: {
                page: "Sessões roda de conversa",
                usuarioLogado,
                tipoUsuario,
                rodaDeConversa
            }
        })
    }
}

const rodaDeConversaSessoesControllerRead = new RodaDeConversaSessoesController();

module.exports = rodaDeConversaSessoesControllerRead;