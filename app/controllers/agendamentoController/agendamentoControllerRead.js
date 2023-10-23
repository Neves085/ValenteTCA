class agendamentoController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/agendamento.ejs", {
            data: {
                page: "Agendamento",
                usuarioLogado
            }
        })
    }
}

const agendamentoControllerRead = new agendamentoController();

module.exports = agendamentoControllerRead;