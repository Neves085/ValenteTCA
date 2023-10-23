class LoginController {
    async autorizarUsuario(req, res) {
        const token = req.session.token;
        console.log(token);

        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/rodas-de-conversa";
        req.session.loginRedirectUrl = null;
        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;