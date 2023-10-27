const jwt = require("jsonwebtoken");
const desabafoModel = require("../../models/Desabafos");

class DesabafoController {
    async cadastrarDesabafo(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const {desabafo} = req.body;

        try {
            await desabafoModel.createDesabafo({mensagem: desabafo, user_id: userId});

            return res.redirect("/");
        } catch (erro) {
            console.log(erro);

            return res.redirect("/");
        }
    }
}

const desabafoControllerCreate = new DesabafoController();

module.exports = desabafoControllerCreate;