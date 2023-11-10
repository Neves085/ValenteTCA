const rodaDeConversaModel = require("../../../models/RodaDeConversa");

class RodasDeConversaAdminController {
    async returnPage(req, res) {
        let query = req.query.query;

        if (!query) {
            query = "";
        }

        const rodasDeConversa = await rodaDeConversaModel.findAllRodasDeConversa(query);

        return res.render("pages/admin/rodas-de-conversa-admin.ejs", {
            data: {
                page: "Valente Admin",
                rodasDeConversa,
                query
            }
        })
    }
}

const rodasDeConversaAdminControllerRead = new RodasDeConversaAdminController();

module.exports = rodasDeConversaAdminControllerRead;