const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarPerfilController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const user = await usuarioModel.findUserById(userId);



    return res.render("pages/editar-perfil.ejs", {
        data: {
          page_name: "Editar_Perfil",
          input_values: {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
          },
        },
      });
    };
};
    
const editarPerfilControllerRead = new EditarPerfilController();

module.exports = editarPerfilControllerRead;