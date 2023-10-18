class LoginController {
    async autorizarUsuario(req, res) {
        var login = 1;

        return res.redirect("/rodas-de-conversa?hidden=1");
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;