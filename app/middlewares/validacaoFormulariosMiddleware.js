const usuarioModel = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class ValidacaoFormularios {
	constructor() {
		this.validacaoCadastro = this.validacaoCadastro.bind(this);
		this.validacaoLogin = this.validacaoLogin.bind(this);
		this.editarPerfilValidation = this.editarPerfilValidation.bind(this);
		this.validacaoDesabafo = this.validacaoDesabafo.bind(this);
	}

	validacaoDesabafo(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { desabafo } = req.body;

			const desabafo_error = errors.errors.find((error) => error.path === "desabafo");

			return res.render("pages/index.ejs", {
				data: {
					page_name: "Valente",
					input_values: {
						desabafo,
					},
					errors: {
						desabafo_error,
					},
				},
			});
		}

		return next();
	}

	validacaoCadastro(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;

		this.#validacaoConfirmarSenha(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const { nome, email, telefone } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");

			return res.render("pages/cadastro.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome,
						email,
						telefone,
						senha,
						confirmacao_senha,
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
						senha_error,
						confirmacao_senha_error,
					},
				},
			});
		}

		return next();
	}

	async validacaoLogin(req, res, next) {
		const { email, senha } = req.body;

		const user = await usuarioModel.findUserByEmail(email);

		if (!user) {
			return res.render("pages/login.ejs", {
				data: {
					input_values: {
						email,
						senha,
					},
					errors: {
						email_error: {
							msg: "Usuário não encontrado",
						},
					},
				},
			});
		}

		bcrypt
			.compare(senha, user.senha)
			.then((auth) => {
				if (auth) {
					const token = jwt.sign({ userId: user.id }, process.env.SECRET);

					req.session.token = token;

					return next();
				}

				return res.render("pages/login.ejs", {
					data: {
						input_values: {
							email,
							senha,
						},
						errors: {
							senha_error: {
								msg: "Senha incorreta",
							},
						},
					},
				});
			})
			.catch((erro) => {
				console.log(erro);
				return res.render("pages/login.ejs", {
					data: {
						input_values: {
							email,
							senha,
						},
						errors: {
							sistema_error: {
								msg: "Erro de sistema, tente novamente mais tarde!",
							},
						},
					},
				});
			});
	}

	// async #usuarioBanco(email) {
	// 	const user = await prisma.usuario.findUnique({
	// 		where: {
	// 			email,
	// 		},
	// 	});

	// 	return user;
	// }

	#validacaoConfirmarSenha(confirmacao_senha, senha, errors) {
		if (confirmacao_senha !== senha) {
			errors.errors.push({
				msg: "As senhas devem ser iguais!",
				path: "confirmacao_senha",
			});
		}
	}

	editarPerfilValidation(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { nome, email, telefone, descricao } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");

			return res.render("pages/editar-perfil.ejs", {
				data: {
					page_name: "Editar perfil",
					input_values: {
						nome,
						email,
						telefone,
                        descricao
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        descricao_error
					},
				},
			});
		}

		return next();
	}
}

const validacaoFormulariosMiddleware = new ValidacaoFormularios();

module.exports = validacaoFormulariosMiddleware;
