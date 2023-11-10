const jwt = require('jsonwebtoken');

class CadastroController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/cadastro.ejs", {
            data: {
                page: "Cadastro",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const cadastroControllerRead = new CadastroController();

module.exports = cadastroControllerRead;