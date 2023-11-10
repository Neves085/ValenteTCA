const jwt = require("jsonwebtoken");

class privacidadeController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/privacidade.ejs", {
            data: {
                page: "Privacidade",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const privacidadeControllerRead = new privacidadeController();

module.exports = privacidadeControllerRead;