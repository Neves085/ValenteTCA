const desabafoModel = require("../models/Desabafos");
const jwt = require("jsonwebtoken");

class IndexController {
    async returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let userId = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            userId = tokenInfo.userId;
        }

        const desabafos = await desabafoModel.findAllDesabafos();

        return res.render("pages/index.ejs", {
            data: {
                page: "Valente",
                usuarioLogado,
                desabafos,
                userId
            }
        })
    }
}

const indexControllerRead = new IndexController();

module.exports = indexControllerRead;