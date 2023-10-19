class LoginController {
    async autorizarUsuario(req, res) {

        return res.redirect("/editar-perfil");
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;