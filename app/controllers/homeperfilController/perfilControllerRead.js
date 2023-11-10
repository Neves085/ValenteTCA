const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class perfilController {
    async returnPage(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        let usuarioLogado = true;

        const user = await usuarioModel.findUserById(userId);

        return res.render("pages/perfil.ejs", {
            data: {
                page: "perfil",
                usuarioLogado,
                user,
                tipoUsuario: userType
            }
        })
    }
}

const perfilControllerRead = new perfilController();

module.exports = perfilControllerRead;