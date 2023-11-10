const profissionalModel = require("../../models/Profissional");
const jwt = require("jsonwebtoken");

class EditarPerfilProfissionalController {
	async getPage(req, res) {
		const token = req.session.token;
		const { userId, userType } = jwt.decode(token, process.env.SECRET);
        let usuarioLogado = true;

		const user = await profissionalModel.findProfissionalById(userId);

		return res.render("pages/editar-perfil-profissional.ejs", {
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
                usuarioLogado,
                tipoUsuario: userType
			},
		});
	}
}

const editarPerfilProfissionalControllerRead = new EditarPerfilProfissionalController();

module.exports = editarPerfilProfissionalControllerRead;
