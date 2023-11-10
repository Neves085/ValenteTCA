const usuarioModel = require("../models/Usuario");
const profissionalModel = require("../models/Profissional");
const desabafoModel = require("../models/Desabafos");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class ValidacaoFormularios {
	constructor() {
		this.validacaoCadastro = this.validacaoCadastro.bind(this);
        this.validacaoCadastroProfissional = this.validacaoCadastroProfissional.bind(this);
        this.validacaoEditarProfissional = this.validacaoEditarProfissional.bind(this);
        this.validacaoEditarProfissionalAdmin = this.validacaoEditarProfissionalAdmin.bind(this);
		this.validacaoLogin = this.validacaoLogin.bind(this);
		this.editarPerfilValidation = this.editarPerfilValidation.bind(this);
        this.editarUsuarioAdminValidation = this.editarUsuarioAdminValidation.bind(this);
		this.validacaoDesabafo = this.validacaoDesabafo.bind(this);
        this.validacaoCriarRodaDeConversa = this.validacaoCriarRodaDeConversa.bind(this);
        this.validacaoEditarRodaDeConversa = this.validacaoEditarRodaDeConversa.bind(this);
	}

	async validacaoDesabafo(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { desabafo } = req.body;
            const desabafos = await desabafoModel.findAllDesabafos();
            const usuarioLogado = true;

			const desabafo_error = errors.errors.find((error) => error.path === "desabafo");

			return res.render("pages/index.ejs", {
				data: {
					page: "Valente",
                    desabafos,
                    usuarioLogado,
					input_values: {
						desabafo,
					},
					errors: {
						desabafo_error,
					}
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
					page: "Cadastro",
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

    validacaoCadastroProfissional(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;
        const file = req.file;

        this.#validarExistenciaImagemProfissional(file, errors);

        if (file) {
            this.#validarTipoImagem(file, errors, "imagem_perfil");
        }

		this.#validacaoConfirmarSenha(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const { nome, email, telefone, cpf } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const cpf_error = errors.errors.find((error) => error.path === "cpf");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/cadastro-profissional.ejs", {
				data: {
					page: "Cadastro profissional",
					input_values: {
						nome,
						email,
						telefone,
                        cpf,
						senha,
						confirmacao_senha,
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        cpf_error,
						senha_error,
						confirmacao_senha_error,
                        imagem_perfil_error
					},
				},
			});
		}

		return next();
	}

    async validacaoEditarProfissional(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;
        const file = req.file;

        if (file) {
            this.#validarTipoImagem(file, errors, "imagem_perfil");
        }

		this.#validacaoConfirmarSenha(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const { nome, email, telefone, cpf, descricao } = req.body;
            const userId = req.params.userId;
            const user = await profissionalModel.findProfissionalById(userId);

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const cpf_error = errors.errors.find((error) => error.path === "cpf");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/editar-perfil-profissional.ejs", {
				data: {
					page: "Editar Perfil profissional",
					input_values: {
                        id: userId,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
                        cpf,
						senha,
						confirmacao_senha,
                        descricao
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        cpf_error,
						senha_error,
						confirmacao_senha_error,
                        imagem_perfil_error,
                        descricao_error
					},
                    usuarioLogado: true,
                    tipoUsuario: "profissional"
				},
			});
		}

		return next();
	}

    async validacaoEditarProfissionalAdmin(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;
        const file = req.file;

        if (file) {
            this.#validarTipoImagem(file, errors, "imagem_perfil");
        }

		this.#validacaoConfirmarSenha(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const { nome, email, telefone, cpf, descricao } = req.body;
            const userId = req.params.userId;
            const user = await profissionalModel.findProfissionalById(userId);

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const cpf_error = errors.errors.find((error) => error.path === "cpf");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/admin/editar-profissional-admin.ejs", {
				data: {
					page: "Editar Perfil profissional",
					input_values: {
                        id: userId,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
                        cpf,
						senha,
						confirmacao_senha,
                        descricao
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        cpf_error,
						senha_error,
						confirmacao_senha_error,
                        imagem_perfil_error,
                        descricao_error
					},
                    usuarioLogado: true,
                    tipoUsuario: "profissional"
				},
			});
		}

		return next();
	}

	async validacaoLogin(req, res, next) {
		const { email, senha } = req.body;

		let user = await usuarioModel.findUserByEmail(email);

        if (!user) {
            user = await profissionalModel.findProfissionalByEmail(email);
        }

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

        if (!user.ativado) {
            return res.render("pages/login.ejs", {
                data: {
                    input_values: {
                        email,
                        senha
                    },
                    errors: {
                        sistema_error: {
                            msg: "Usuário desativado, entre em contato com o suporte!"
                        }
                    }
                }
            })
        }

		bcrypt
			.compare(senha, user.senha)
			.then((auth) => {
				if (auth) {
					const token = jwt.sign({ userId: user.id, userType: user.cargo }, process.env.SECRET);

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

	#validacaoConfirmarSenha(confirmacao_senha, senha, errors) {
		if (confirmacao_senha !== senha) {
			errors.errors.push({
				msg: "As senhas devem ser iguais!",
				path: "confirmacao_senha",
			});
		}
	}

	async editarPerfilValidation(req, res, next) {
		const errors = validationResult(req);
        const file = req.file;

        if (file) {
            this.#validarTipoImagem(file, errors, "imagem_perfil");
        }

		if (!errors.isEmpty()) {
			const { nome, email, telefone, descricao } = req.body;
            const token = req.session.token;
            const {userId} = jwt.decode(token, process.env.SECRET);
            const user = await usuarioModel.findUserById(userId);

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/editar-perfil.ejs", {
				data: {
					page: "Editar perfil",
					input_values: {
                        id: userId,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
                        descricao
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        descricao_error,
                        imagem_perfil_error
					},
                    usuarioLogado: true,
                    tipoUsuario: "user"
				},
			});
		}

		return next();
	}

    async editarUsuarioAdminValidation(req, res, next) {
        const errors = validationResult(req);
        const file = req.file;

        if (file) {
            this.#validarTipoImagem(file, errors, "imagem_perfil");
        }

		if (!errors.isEmpty()) {
			const { nome, email, telefone, descricao } = req.body;
            const userId = req.params.userId;
            const user = await usuarioModel.findUserById(userId);

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const telefone_error = errors.errors.find((error) => error.path === "telefone");
            const descricao_error = errors.errors.find((error) => error.path === "descricao");
            const imagem_perfil_error = errors.errors.find((error) => error.path === "imagem_perfil");

			return res.render("pages/admin/editar-usuario-admin.ejs", {
				data: {
					page: "Editar usuário admin",
					input_values: {
                        id: userId,
                        imagem_perfil: user.imagem_perfil,
						nome,
						email,
						telefone,
                        descricao
					},
					errors: {
						nome_error,
						email_error,
						telefone_error,
                        descricao_error,
                        imagem_perfil_error
					},
				},
			});
		}

		return next();
    }

    async validacaoCriarRodaDeConversa(req, res, next) {
        const errors = validationResult(req);
        const file = req.file;

        this.#validarExistenciaImagem(file, errors);

        if (file) {
            this.#validarTipoImagem(file, errors, "foto_capa");
        }

		if (!errors.isEmpty()) {
			const { nome } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
            const imagem_capa_error = errors.errors.find((error) => error.path === "foto_capa");

			return res.render("pages/admin/criar-roda-de-conversa-admin.ejs", {
				data: {
					page: "Valente Admin",
					input_values: {
						nome,
					},
					errors: {
						nome_error,
                        imagem_capa_error
					},
				},
			});
		}

		return next();
    }

    async validacaoEditarRodaDeConversa(req, res, next) {
        const errors = validationResult(req);
        const file = req.file;

        if (file) {
            this.#validarTipoImagem(file, errors, "foto_capa");
        }

		if (!errors.isEmpty()) {
			const { nome } = req.body;
            const rodaDeConversaId = req.params.rodaDeConversaId;

			const nome_error = errors.errors.find((error) => error.path === "nome");
            const imagem_capa_error = errors.errors.find((error) => error.path === "foto_capa");

			return res.render("pages/admin/editar-roda-de-conversa-admin.ejs", {
				data: {
					page: "Valente Admin",
					input_values: {
                        id: rodaDeConversaId,
						nome,
					},
					errors: {
						nome_error,
                        imagem_capa_error
					},
				},
			});
		}

		return next();
    }

    #validarTipoImagem(file, errors, path) {
        if (!file.mimetype.match("image/")) {
            errors.errors.push({
                msg: "O arquivo deve ser uma imagem!",
				path: path,
            })
        }
    }

    #validarExistenciaImagem(file, errors) {
        if (!file) {
            errors.errors.push({
                msg: "Você deve selecionar uma imagem para a capa da roda de conversa!",
                path: "foto_capa"
            })
        }
    }

    #validarExistenciaImagemProfissional(file, errors) {
        if (!file) {
            errors.errors.push({
                msg: "Você deve selecionar uma imagem para a foto de perfil!",
                path: "imagem_perfil"
            })
        }
    }
}

const validacaoFormulariosMiddleware = new ValidacaoFormularios();

module.exports = validacaoFormulariosMiddleware;
