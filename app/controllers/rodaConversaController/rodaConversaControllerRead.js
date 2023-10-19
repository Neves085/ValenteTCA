class RodaDeConversaController {
    returnPage(req, res) {
        return res.render("pages/roda-de-conversa", {
            data: {
                page: "Roda de conversa"
            }
        })
    }
}

const rodaDeConversaControllerRead = new RodaDeConversaController();

module.exports = rodaDeConversaControllerRead;