class termosController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/termos.ejs", {
            data: {
                page: "Termos",
                usuarioLogado
            }
        })
    }
}

const termosControllerRead = new termosController();

module.exports = termosControllerRead;