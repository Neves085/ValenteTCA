const profissionalModel = require("../../models/Profissional");

class ImagemPerfilProfissinalController {
    async getImage(req, res) {
        const userId = req.params.userId;

        const imagemPerfil = await profissionalModel.getProfissionalImage(userId);

        try {
            res.setHeader("Content-Type", imagemPerfil.tipo_imagem_perfil);
            return res.send(imagemPerfil.imagem_perfil);
        } catch (erro) {
            console.log(erro);
            return
        }
    }
}

const imagemPerfilProfissionalControllerRead = new ImagemPerfilProfissinalController();

module.exports = imagemPerfilProfissionalControllerRead;