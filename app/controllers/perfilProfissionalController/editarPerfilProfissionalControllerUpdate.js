const profissionalModel = require("../../models/Profissional");
const jwt = require("jsonwebtoken");

class EditarPerfilProfissionalController {
	async editUser(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);

		const user = await profissionalModel.findProfissionalById(userId);

		const file = req.file;
		let tipo_imagem = user.tipo_imagem_perfil;
		let buffer_imagem = user.imagem_perfil;

		if (file) {
			tipo_imagem = file.mimetype;
			buffer_imagem = file.buffer;
		}

		if (user.id !== userId && userType !== "admin") {
			return res.redirect("/");
		}

		const { nome, email, telefone, descricao, cpf } = req.body;

		try {
			await profissionalModel.updateProfissional(
				{
					nome,
					email,
					telefone,
					descricao,
                    cpf,
					tipo_imagem_perfil: tipo_imagem,
					imagem_perfil: buffer_imagem,
				},
				userId
			);

			return res.redirect("/perfil-profissional");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/editar-perfil-profissional.ejs", {
					data: {
						page: "Editar perfil",
						input_values: {
                            id: user.id,
                            imagem_perfil: user.imagem_perfil,
							nome,
							email,
							telefone,
                            cpf
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
                        usuarioLogado: true,
                        tipoUsuario: "profissional"
					},
				});
			}

			return res.render("pages/editar-perfil-profissional.ejs", {
				data: {
					page: "Editar perfil",
					input_values: {
                        id: user.id,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
                        cpf
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
                    usuarioLogado: true,
                    tipoUsuario: "profissional"
				},
			});
		}
	}
}

const editarPerfilProfissionalControllerUpdate = new EditarPerfilProfissionalController();

module.exports = editarPerfilProfissionalControllerUpdate;
