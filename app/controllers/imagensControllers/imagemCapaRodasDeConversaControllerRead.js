const rodaDeConversaModel = require("../../models/RodaDeConversa");

class ImagemCapaRodasDeConversaController {
    async getImage(req, res) {
        const rodaDeConversaId = req.params.rodaDeConversaId;

        const imagemCapa = await rodaDeConversaModel.getRodaDeConversaImageCapa(rodaDeConversaId);

        try {
            res.setHeader("Content-Type", imagemCapa.tipo_imagem_banner);
            return res.send(imagemCapa.imagem_banner);
        } catch (erro) {
            console.log(erro);
            return
        }
    }
}

const imagemCapaRodasDeConversaControllerRead = new ImagemCapaRodasDeConversaController();

module.exports = imagemCapaRodasDeConversaControllerRead;