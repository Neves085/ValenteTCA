const usuarioModel = require("../../models/Usuario");

class ImagemPerfilPacienteController {
    async getImage(req, res) {
        const userId = req.params.userId;

        const imagemPerfil = await usuarioModel.getUserImage(userId);

        try {
            res.setHeader("Content-Type", imagemPerfil.tipo_imagem_perfil);
            return res.send(imagemPerfil.imagem_perfil);
        } catch (erro) {
            console.log(erro);
            return
        }
    }
}

const imagemPerfilPacienteControllerRead = new ImagemPerfilPacienteController();

module.exports = imagemPerfilPacienteControllerRead;