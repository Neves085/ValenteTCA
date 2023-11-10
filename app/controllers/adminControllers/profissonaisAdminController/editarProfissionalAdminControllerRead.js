const profissionalModel = require("../../../models/Profissional");

class EditarPerfilProfissionalAdminController {
	async getPage(req, res) {
		const userId = req.params.userId;

		const user = await profissionalModel.findProfissionalById(userId);

		return res.render("pages/admin/editar-profissional-admin.ejs", {
			data: {
				page: "Editar Perfil Profissional",
				input_values: {
                    id: user.id,
                    imagem_perfil: user.imagem_perfil,
					nome: user.nome,
					email: user.email,
					telefone: user.telefone,
                    cpf: user.cpf,
                    descricao: user.descricao
				},
			},
		});
	}
}

const editarPerfilProfissionalAdminControllerRead = new EditarPerfilProfissionalAdminController();

module.exports = editarPerfilProfissionalAdminControllerRead;
