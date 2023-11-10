const jwt = require("jsonwebtoken");

class DoacaoController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/doacao.ejs", {
            data: {
                page: "Doação",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const doacaoControllerRead = new DoacaoController();

module.exports = doacaoControllerRead;