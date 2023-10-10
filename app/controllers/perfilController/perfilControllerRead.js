class perfilController {
    returnPage(req, res) {
        return res.render("pages/perfil.ejs", {
            data: {
                page: "Perfil"
            }
        })
    }
}

const perfilControllerRead = new perfilController();

module.exports = perfilControllerRead;