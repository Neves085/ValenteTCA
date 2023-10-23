class DoacaoController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/doacao.ejs", {
            data: {
                page: "Doação",
                usuarioLogado
            }
        })
    }
}

const doacaoControllerRead = new DoacaoController();

module.exports = doacaoControllerRead;