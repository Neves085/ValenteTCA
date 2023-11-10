const usuarioModel = require("../../../models/Usuario");

class EditarPerfilAdminController {
	async getPage(req, res) {
        const userId = req.params.userId;

		const user = await usuarioModel.findUserById(userId);

		return res.render("pages/admin/editar-usuario-admin.ejs", {
			data: {
				page: "Editar Perfil Admin",
				input_values: {
                    id: userId,
                    imagem_perfil: user.imagem_perfil,
					nome: user.nome,
					email: user.email,
					telefone: user.telefone,
                    descricao: user.descricao
				},
			},
		});
	}
}

const editarPerfilAdminControllerRead = new EditarPerfilAdminController();

module.exports = editarPerfilAdminControllerRead;
