const rodaDeConversaModel = require("../../../models/RodaDeConversa");

class EditarRodasDeConversaAdminController {
    async returnPage(req, res) {
        const rodaDeConversaId = req.params.rodaDeConversaId;

        const rodaDeConversa = await rodaDeConversaModel.findRodaDeConversaById(rodaDeConversaId);

        return res.render("pages/admin/editar-roda-de-conversa-admin.ejs", {
            data: {
                page: "Valente Admin",
                input_values: {
                    id: rodaDeConversa.id,
                    nome: rodaDeConversa.nome
                }
            }
        })
    }
}

const editarRodasDeConversaAdminControllerRead = new EditarRodasDeConversaAdminController();

module.exports = editarRodasDeConversaAdminControllerRead;