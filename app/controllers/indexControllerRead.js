const desabafoModel = require("../models/Desabafos");
const rodaDeConversaModel = require("../models/RodaDeConversa");
const profissionalModel = require("../models/Profissional");
const jwt = require("jsonwebtoken");

class IndexController {
    async returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userId = undefined;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userId = tokenInfo.userId;
            tipoUsuario = tokenInfo.userType;
        }

        const desabafos = await desabafoModel.findAllDesabafos();
        const rodasDeConversa = await rodaDeConversaModel.findSomeRodasDeConvesa();
        const profissionais = await profissionalModel.findAllProfissionais(userId, "");

        return res.render("pages/index.ejs", {
            data: {
                page: "Valente",
                usuarioLogado,
                desabafos,
                rodasDeConversa,
                userId,
                tipoUsuario,
                profissionais
            }
        })
    }
}

const indexControllerRead = new IndexController();

module.exports = indexControllerRead;