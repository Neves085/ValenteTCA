const rodaDeConversaModel = require("../../../models/RodaDeConversa");

class CriarRodaDeConversaController {
	async createRodaDeConversa(req, res) {
		const { nome } = req.body;
        const file = req.file;

        const imagem_tipo = file.mimetype;
        const imagem_buffer = file.buffer;

		try {
            await rodaDeConversaModel.createRodaDeConversa({
                nome,
                imagem_banner: imagem_buffer,
                tipo_imagem_banner: imagem_tipo
            });

			return res.redirect("/rodas-de-conversa-admin");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/admin/criar-roda-de-conversa-admin.ejs", {
					data: {
						page: "Valente Admin",
						input_values: {
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

			return res.render("pages/admin/criar-roda-de-conversa-admin.ejs", {
				data: {
					page: "Valente Admin",
					input_values: {
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

const criarRodaDeConversaControllerCreate = new CriarRodaDeConversaController();

module.exports = criarRodaDeConversaControllerCreate;
