class IndexController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/index.ejs", {
            data: {
                page: "Valente",
                usuarioLogado
            }
        })
    }
}

const indexControllerRead = new IndexController();

module.exports = indexControllerRead;