const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Autenticacao {
    async encriptarSenha(req, res, next) {
        const {
            nome,
            email,
            telefone,
            senha
        } = req.body;
        const salt = Number(process.env.SALT);

        try {
            const senhaEncriptada = await bcrypt.hash(senha, salt);

            req.senhaEncriptada = senhaEncriptada;

            return next();
        } catch (erro) {
            console.log(erro);

            return res.render("pages/cadastro", {
                data: {
                    page_name: "Cadastro",
                    input_values: {
                        nome,
                        email,
                        telefone,
                        senha
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

    validateJWT(req, res, next) {
        const token = req.session.token;
        req.session.loginRedirectUrl = req.url;

        if (!token) {
            return res.redirect("/login");
        }

        try {
            jwt.verify(token, process.env.SECRET);

            return next();
        } catch (erro) {
            console.log(erro);

            return res.redirect("/login");
        }
    }
}

const AutenticacaoMiddleware = new Autenticacao();

module.exports = AutenticacaoMiddleware;