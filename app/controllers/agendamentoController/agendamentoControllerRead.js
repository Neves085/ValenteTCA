class agendamentoController {
    returnPage(req, res) {
        return res.render("pages/agendamento.ejs", {
            data: {
                page: "Agendamento"
            }
        })
    }
}

const agendamentoControllerRead = new agendamentoController();

module.exports = agendamentoControllerRead;