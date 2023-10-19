const usuarioModel = require("../../models/Usuario");

class CadastroController {
    constructor() {
		this.createUsuario = this.createUsuario.bind(this);
	}
    async createUsuario(req, res) {
        const {
            nome,
            email,
            telefone,
            senha,
            confirmacao_senha
        } = req.body;
        const senhaCriptografada = req.senhaEncriptada;

        try {
            await usuarioModel.createUsuario({
                data: {
                    nome,
                    email,
                    telefone,
                    senha: senhaCriptografada
                }
            })

            return res.redirect("/login");
        } catch (erro) {
            console.log(erro);

            if (erro.code === "P2002") {
                return res.render("pages/cadastro.ejs", {
                    data: {
                        page_name: "Cadastro",
                        input_values: {
                            nome,
                            email,
                            telefone,
                            senha,
                            confirmacao_senha
                        },
                        errors: {
                            email_error: {
                                msg: "Email já cadastrado!"
                            }
                        }
                    }
                });
            }

            return res.render("pages/cadastro.ejs", {
                data: {
                    page_name: "Cadastro",
                    input_values: {
                        nome,
                        email,
                        telefone,
                        senha,
                        confirmacao_senha
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
        }
    }
}

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;