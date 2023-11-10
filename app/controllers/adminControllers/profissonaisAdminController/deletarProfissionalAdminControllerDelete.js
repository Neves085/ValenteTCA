const profissionalModel = require("../../../models/Profissional");

class DeletarProfissionalController {
	async deletarUsuario(req, res) {
		try {
			const userId = req.params.userId;

			await profissionalModel.deleteProfissional(userId);

			return res.redirect("/profissionais-admin");
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao excluir o usuário" });
		}
	}
}

const deletarProfissionalControllerDelete = new DeletarProfissionalController();

module.exports = deletarProfissionalControllerDelete;
