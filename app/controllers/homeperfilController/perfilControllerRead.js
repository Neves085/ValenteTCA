class perfilController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/perfil.ejs", {
            data: {
                page: "perfil",
                usuarioLogado
            }
        })
    }
}

const perfilControllerRead = new perfilController();

module.exports = perfilControllerRead;