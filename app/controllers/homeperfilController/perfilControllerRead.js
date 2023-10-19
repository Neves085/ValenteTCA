class perfilController {
    returnPage(req, res) {
        return res.render("pages/perfil.ejs", {
            data: {
                page: "Doação"
            }
        })
    }
}

const perfilControllerRead = new perfilController();

module.exports = perfilControllerRead;