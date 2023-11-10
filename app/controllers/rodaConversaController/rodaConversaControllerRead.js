const rodaDeConversaModel = require("../../models/RodaDeConversa");
const jwt = require("jsonwebtoken");

class RodaDeConversaController {
    async returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        const rodasDeConversa = await rodaDeConversaModel.findAllRodasDeConversa("");

        return res.render("pages/roda-de-conversa.ejs", {
            data: {
                page: "Roda de conversa",
                usuarioLogado,
                rodasDeConversa,
                tipoUsuario
            }
        })
    }
}

const rodaDeConversaControllerRead = new RodaDeConversaController();

module.exports = rodaDeConversaControllerRead;