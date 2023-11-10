const sessaoModel = require("../../models/Sessao");
const jwt = require("jsonwebtoken");

class InscreverUsuarioController {
	async inscreverUsuario(req, res) {
        const sessaoId = req.params.sessaoId;

        const sessao = await sessaoModel.findSessaoById(sessaoId);

        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

		try {
            await sessaoModel.inscreverUsuario({
                nome: sessao.nome,
                data_reuniao: sessao.data_reuniao,
                quantidade_pessoas: sessao.quantidade_pessoas,
                descricao: sessao.descricao,
                link_reuniao: sessao.link_reuniao,
                tema: sessao.tema,
                criador: userId,
            });

			return res.redirect(`/perfil`);
		} catch (erro) {
			console.log(erro);

			return res.redirect("/perfil");
		}
	}
}

const inscreverUsuarioControllerCreate = new InscreverUsuarioController();

module.exports = inscreverUsuarioControllerCreate;
