const jwt = require("jsonwebtoken");

class LoginController {
    async autorizarUsuario(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/rodas-de-conversa";
        req.session.loginRedirectUrl = null;

        if (userType === "admin") {
            return res.redirect("/home-admin");
        }

        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;