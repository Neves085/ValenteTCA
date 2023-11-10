const jwt = require("jsonwebtoken");

class termosController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType
        }

        return res.render("pages/termos.ejs", {
            data: {
                page: "Termos",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const termosControllerRead = new termosController();

module.exports = termosControllerRead;