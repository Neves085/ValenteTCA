const jwt = require("jsonwebtoken");

class LoginController {
    getPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/login.ejs", {
            data: {
                page: "Login",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const loginControllerRead = new LoginController();

module.exports = loginControllerRead;