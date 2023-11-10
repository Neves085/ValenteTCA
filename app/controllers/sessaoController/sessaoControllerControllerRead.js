const jwt = require("jsonwebtoken");

class SessoesController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType
        }

        return res.render("pages/sessao.ejs", {
            data: {
                page: "Sessão",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const sessoesControllerRead = new SessoesController();

module.exports = sessoesControllerRead;