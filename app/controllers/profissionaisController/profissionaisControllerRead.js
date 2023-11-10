const jwt = require("jsonwebtoken");

class ProfissionaisController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/profissionais.ejs", {
            data: {
                page: "Profissionais",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const profissionaisControllerRead = new ProfissionaisController();

module.exports = profissionaisControllerRead;