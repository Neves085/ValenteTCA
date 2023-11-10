const sessaoModel = require("../../models/Sessao");
const jwt = require("jsonwebtoken");

class CriarSessaoController {
	async createSessao(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

		const { nome, quantidade_pessoas, descricao, data_reuniao, link_reuniao } = req.body;
        const nomeRoda = req.params.nomeRoda;
        const data_reuniao_array = data_reuniao.split("/");
        const data_reuniao_formatado = `${data_reuniao_array[2]}/${data_reuniao_array[1]}/${data_reuniao_array[0]}`;
        const data_reuniao_unix = Math.floor(new Date(data_reuniao_formatado).getTime() / 1000);

		try {
            await sessaoModel.createSessao({
                nome,
                data_reuniao: data_reuniao_unix,
                quantidade_pessoas: Number(quantidade_pessoas),
                descricao,
                link_reuniao,
                tema: nomeRoda,
                criador: userId,
            })

			return res.redirect(`/perfil-profissional`);
		} catch (erro) {
			console.log(erro);

			return res.render("pages/criar-sessao.ejs", {
				data: {
					page: "Criar sessão",
					input_values: {
						nome,
                        quantidade_pessoas,
                        descricao,
                        data_reuniao,
                        link_reuniao
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
                    nomeRoda
				},
			});
		}
	}
}

const criarSessaoControllerCreate = new CriarSessaoController();

module.exports = criarSessaoControllerCreate;
