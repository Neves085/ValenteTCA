const usuarioModel = require("../../../models/Usuario");

class DeletarUsuarioController {
	async deletarUsuario(req, res) {
		try {
			const userId = req.params.userId;

			await usuarioModel.deleteUsuario(userId);

			return res.redirect("/home-admin");
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Erro ao excluir o usuário" });
		}
	}
}

const deletarUsuarioControllerDelete = new DeletarUsuarioController();

module.exports = deletarUsuarioControllerDelete;
