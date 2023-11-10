const jwt = require('jsonwebtoken');

class CadastroProfissionalController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/cadastro-profissional.ejs", {
            data: {
                page: "Cadastro profissional",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const cadastroProfissionalControllerRead = new CadastroProfissionalController();

module.exports = cadastroProfissionalControllerRead;