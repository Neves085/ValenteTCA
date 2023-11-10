const jwt = require("jsonwebtoken");

class CriarSessoesController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;
        const nomeRoda = req.params.nomeRoda;

        if (token) {
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            usuarioLogado = true;
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/criar-sessao.ejs", {
            data: {
                page: "Sessão",
                usuarioLogado,
                tipoUsuario,
                nomeRoda
            }
        })
    }
}

const criarSessoesControllerRead = new CriarSessoesController();

module.exports = criarSessoesControllerRead;