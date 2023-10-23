class RodaDeConversaController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/roda-de-conversa.ejs", {
            data: {
                page: "Roda de conversa",
                usuarioLogado
            }
        })
    }
}

const rodaDeConversaControllerRead = new RodaDeConversaController();

module.exports = rodaDeConversaControllerRead;