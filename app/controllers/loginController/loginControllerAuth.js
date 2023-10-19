const jwt = require("jsonwebtoken");

class LoginController {
    async autorizarUsuario(req, res) {
        const token = jwt.sign({ userId:use.id},process.env.SECRET);
        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/rodas-de-conversa";
        req.session.token = token;
        req.session.loginRedirectUrl = null;
        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;