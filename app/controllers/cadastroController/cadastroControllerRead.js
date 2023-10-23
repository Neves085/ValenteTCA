class CadastroController {
    returnPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/cadastro.ejs", {
            data: {
                page: "Cadastro",
                usuarioLogado
            }
        })
    }
}

const cadastroControllerRead = new CadastroController();

module.exports = cadastroControllerRead;