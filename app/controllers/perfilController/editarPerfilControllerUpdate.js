const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarPerfilController {
	constructor() {
		this.editUser = this.editUser.bind(this);
	}

	async editUser(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
		const user = await usuarioModel.findUserById(userId);
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

		const { nome, email, telefone, descricao } = req.body;

		try {
			await usuarioModel.updatePerfil(
				{
					nome,
					email,
					telefone,
					descricao,
					tipo_imagem_perfil: tipo_imagem,
					imagem_perfil: buffer_imagem,
				},
				userId
			);

			return res.redirect("/perfil");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/editar-perfil.ejs", {
					data: {
						page: "Editar perfil",
						input_values: {
                            id: user.id,
                            imgem_perfil: user.imagem_perfil,
							nome,
							email,
							telefone,
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
                        usuarioLogado: true,
                        tipoUsuario: "user"
					},
				});
			}

			return res.render("pages/editar-perfil.ejs", {
				data: {
					page: "Editar perfil",
					input_values: {
                        id: user.id,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
                    usuarioLogado: true,
                        tipoUsuario: "user"
				},
			});
		}
	}
}

const editarPerfilControllerUpdate = new EditarPerfilController();

module.exports = editarPerfilControllerUpdate;
