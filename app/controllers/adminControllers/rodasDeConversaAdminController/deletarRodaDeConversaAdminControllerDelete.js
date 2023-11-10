const rodaDeConversaModel = require("../../../models/RodaDeConversa");

class DeletarRodaDeConversaController {
	async deletarRodaDeConversa(req, res) {
		try {
			const rodaDeConversaId = req.params.rodaDeConversaId;

            await rodaDeConversaModel.deletarRodaDeConversa(rodaDeConversaId);

			return res.redirect("/rodas-de-conversa-admin");
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao excluir o usuário" });
		}
	}
}

const deletarRodaDeConversaControllerDelete = new DeletarRodaDeConversaController();

module.exports = deletarRodaDeConversaControllerDelete;
