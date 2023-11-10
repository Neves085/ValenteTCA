const profissionalModel = require("../../../models/Profissional");
const jwt = require("jsonwebtoken");

class ProfissionalAdminController {
    async returnPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        let query = req.query.query;

        if (!query) {
            query = "";
        }

        const profissionais = await profissionalModel.findAllProfissionais(userId, query);

        return res.render("pages/admin/profissionais-admin.ejs", {
            data: {
                page: "Valente Admin",
                profissionais,
                query
            }
        })
    }
}

const profissionalAdminControllerRead = new ProfissionalAdminController();

module.exports = profissionalAdminControllerRead;