const jwt = require("jsonwebtoken");

class agendamentoController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;
        let tipoUsuario = undefined;

        if (token) {
            usuarioLogado = true;
            const tokenInfo = jwt.decode(token, process.env.SECRET);
            tipoUsuario = tokenInfo.userType;
        }

        return res.render("pages/agendamento.ejs", {
            data: {
                page: "Agendamento",
                usuarioLogado,
                tipoUsuario
            }
        })
    }
}

const agendamentoControllerRead = new agendamentoController();

module.exports = agendamentoControllerRead;