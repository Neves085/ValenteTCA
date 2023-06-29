class DoacaoController {
    returnPage(req, res) {
        return res.render("pages/doacao.ejs", {
            data: {
                page: "Doação"
            }
        })
    }
}

const doacaoControllerRead = new DoacaoController();

module.exports = doacaoControllerRead;