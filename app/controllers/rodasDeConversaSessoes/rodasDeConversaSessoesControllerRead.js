const jwt = require("jsonwebtoken");

class RodaDeConversaSessoesController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/roda-de-conversa-sessoes.ejs", {
            data: {
                page: "Sessões roda de conversa",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const rodaDeConversaSessoesControllerRead = new RodaDeConversaSessoesController();

module.exports = rodaDeConversaSessoesControllerRead;