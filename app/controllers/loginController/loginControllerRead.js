class LoginController {
    getPage(req, res) {
        const token = req.session.token;
        let usuarioLogado = false;

        if (token) {
            usuarioLogado = true;
        }

        return res.render("pages/login.ejs", {
            data: {
                page: "Login",
                usuarioLogado
            }
        })
    }
}

const loginControllerRead = new LoginController();

module.exports = loginControllerRead;