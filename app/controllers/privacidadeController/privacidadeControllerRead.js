class privacidadeController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/privacidade.ejs", {
            data: {
                page: "Privacidade",
                usuarioLogado
            }
        })
    }
}

const privacidadeControllerRead = new privacidadeController();

module.exports = privacidadeControllerRead;