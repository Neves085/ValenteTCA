const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarPerfilController {
  async getPage(req, res) {
    try {
      const token = req.session.token;
      const { userId } = jwt.decode(token, process.env.SECRET);
      const user = await usuarioModel.findUserById(userId);

      return res.render("pages/editar-perfil.ejs", {
        data: {
          page_name: "Editar Perfil",
          input_values: {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
          }
        }
      });
    } catch (error) {
      console.error("Erro ao buscar e renderizar página de edição de perfil:", error);
      return res.status(500).json({ error: "Erro ao buscar e renderizar página de edição de perfil." });
    }
  }
}

const editarPerfilControllerRead = new EditarPerfilController();

module.exports = editarPerfilControllerRead;
