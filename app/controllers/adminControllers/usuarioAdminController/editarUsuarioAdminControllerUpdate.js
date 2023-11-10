const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarUsuarioAdminController {
	constructor() {
		this.editUser = this.editUser.bind(this);
	}

	async editUser(req, res) {
		const token = req.session.token;
		const { userType } = jwt.decode(token, process.env.SECRET);
        const userId = req.params.userId;
		const user = await usuarioModel.findUserById(userId);

        const file = req.file;
		let tipo_imagem = user.tipo_imagem_perfil;
		let buffer_imagem = user.imagem_perfil;

		if (file) {
			tipo_imagem = file.mimetype;
			buffer_imagem = file.buffer;
		}

		if (userType !== "admin") {
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
                    imagem_perfil: buffer_imagem
				},
				userId
			);
			return res.redirect("/home-admin");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/admin/editar-usuario-admin.ejs", {
					data: {
						page: "Editar usuário Admin",
						input_values: {
                            id: userId,
                            imagem_perfil: user.imagem_perfil,
							nome,
							email,
							telefone,
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/admin/editar-usuario-admin.ejs", {
				data: {
					page: "Editar usuário Admin",
					input_values: {
                        id: userId,
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
				},
			});
		}
	}
}

const editarUsuarioAdminControllerUpdate = new EditarUsuarioAdminController();

module.exports = editarUsuarioAdminControllerUpdate;
