class ProfissionaisController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/profissionais.ejs", {
            data: {
                page: "Profissionais",
                usuarioLogado
            }
        })
    }
}

const profissionaisControllerRead = new ProfissionaisController();

module.exports = profissionaisControllerRead;