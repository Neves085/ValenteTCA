const express = require('express');
const session = require('express-session');
const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: 'strict',
    },
  })
);

// Outras configurações do Express...

class CadastroController {
  async criarUsuario(req, res) {
    const { nome, email, telefone, senha, confirmacao_senha } = req.body;
    const senhaCriptografada = req.senhaEncriptada;

    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          telefone,
          senha: senhaCriptografada,
          ativo: true,
        },
      });

      // Armazene o ID do usuário na sessão
      req.session.userId = usuario.id;

      return res.redirect('/login');
    } catch (erro) {
      // Trate os erros como você estava fazendo no código original.
    }
  }
}

// Resto do código...

module.exports = CadastroControllerCreate;
