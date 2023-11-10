class CriarRodasDeConversaAdminController {
    async returnPage(req, res) {

        return res.render("pages/admin/criar-roda-de-conversa-admin.ejs", {
            data: {
                page: "Valente Admin"
            }
        })
    }
}

const criarRodasDeConversaAdminControllerRead = new CriarRodasDeConversaAdminController();

module.exports = criarRodasDeConversaAdminControllerRead;