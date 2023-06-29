class LoginController {
    async autorizarUsuario(req, res) {
        return res.redirect("/rodas-de-conversa");
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;