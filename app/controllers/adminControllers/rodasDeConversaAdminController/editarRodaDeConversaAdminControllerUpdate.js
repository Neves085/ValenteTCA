const rodaDeConversaModel = require("../../../models/RodaDeConversa");

class EditarRodaDeConversaAdminController {
	async editRodaDeConversa(req, res) {
        const rodaDeConversaId = req.params.rodaDeConversaId;
		const rodaDeConvesa = await rodaDeConversaModel.findRodaDeConversaById(rodaDeConversaId);

        const file = req.file;
		let tipo_imagem = rodaDeConvesa.tipo_imagem_perfil;
		let buffer_imagem = rodaDeConvesa.imagem_perfil;

		if (file) {
			tipo_imagem = file.mimetype;
			buffer_imagem = file.buffer;
		}

		const { nome } = req.body;

		try {
			await rodaDeConversaModel.updateRodaDeConversa(
				{
					nome,
                    tipo_imagem_banner: tipo_imagem,
                    imagem_banner: buffer_imagem
				},
				rodaDeConversaId
			);
			return res.redirect("/rodas-de-conversa-admin");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/admin/criar-roda-de-conversa-admin.ejs", {
					data: {
						page: "Valente Admin",
						input_values: {
                            id: rodaDeConversaId,
							nome,
						},
						errors: {
							nome_error: {
								msg: "Nome já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/admin/editar-roda-de-conversa-admin.ejs", {
				data: {
					page: "Editar usuário Admin",
					input_values: {
                        id: rodaDeConversaId,
						nome,
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
				},
			});
		}
	}
}

const editarUsuarioAdminControllerUpdate = new EditarRodaDeConversaAdminController();

module.exports = editarUsuarioAdminControllerUpdate;
