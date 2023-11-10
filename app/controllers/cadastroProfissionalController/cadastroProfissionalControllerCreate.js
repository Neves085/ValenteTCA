const profissionalModel = require("../../models/Profissional");

class CadastroProfissionalController {
    async createProfissional(req, res) {
        const {
            nome,
            email,
            telefone,
            cpf,
            senha,
            confirmacao_senha
        } = req.body;

        const senhaCriptografada = req.senhaEncriptada;

        const file = req.file;
        const tipo_imagem = file.mimetype;
        const buffer_imagem = file.buffer;

        try {
            await profissionalModel.createProfissional({
                nome,
                email,
                telefone,
                cpf,
                imagem_perfil: buffer_imagem,
                tipo_imagem_perfil: tipo_imagem,
                senha: senhaCriptografada
            })

            return res.redirect("/login");
        } catch (erro) {
            console.log(erro);

            if (erro.code === "P2002") {
                if (erro.meta.target === "Usuario_email_key") {
                    return res.render("pages/cadastro-profissional.ejs", {
                        data: {
                            page: "Cadastro profissional",
                            input_values: {
                                nome,
                                email,
                                telefone,
                                cpf,
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

                if (erro.meta.target === "Usuario_telefone_key") {
                    return res.render("pages/cadastro-profissional.ejs", {
                        data: {
                            page: "Cadastro profissional",
                            input_values: {
                                nome,
                                email,
                                telefone,
                                cpf,
                                senha,
                                confirmacao_senha
                            },
                            errors: {
                                telefone_error: {
                                    msg: "Telefone já cadastrado!"
                                }
                            }
                        }
                    });
                }
            }

            return res.render("pages/cadastro-profissional.ejs", {
                data: {
                    page: "Cadastro profissional",
                    input_values: {
                        nome,
                        email,
                        telefone,
                        cpf,
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

const CadastroProfissionalControllerCreate = new CadastroProfissionalController();

module.exports = CadastroProfissionalControllerCreate;