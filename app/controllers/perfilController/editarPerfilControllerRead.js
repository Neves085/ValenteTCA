const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarPerfilController {
	async getPage(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
        let usuarioLogado = true;

		const user = await usuarioModel.findUserById(userId);

		return res.render("pages/editar-perfil.ejs", {
			data: {
				page: "EditarPerfil",
				input_values: {
                    id: user.id,
                    imagem_perfil: user.imagem_perfil,
					nome: user.nome,
					email: user.email,
					telefone: user.telefone,
                    descricao: user.descricao
				},
                usuarioLogado,
                tipoUsuario: userType
			},
		});
	}
}

const editarPerfilControllerRead = new EditarPerfilController();

module.exports = editarPerfilControllerRead;
