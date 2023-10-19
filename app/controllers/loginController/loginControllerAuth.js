const jwt = require("jsonwebtoken");

class LoginController {
    async authUser(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/perfil";
        req.session.loginRedirectUrl = null;
        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;