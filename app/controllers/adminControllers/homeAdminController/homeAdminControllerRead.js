const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class HomeAdminController {
    async returnPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        let query = req.query.query;

        if (!query) {
            query = "";
        }

        const users = await usuarioModel.findAllUsers(userId, query);

        return res.render("pages/admin/home-admin.ejs", {
            data: {
                page: "Valente Admin",
                users,
                query
            }
        })
    }
}

const homeAdminControllerRead = new HomeAdminController();

module.exports = homeAdminControllerRead;