class privacidadeController {
    returnPage(req, res) {
        return res.render("pages/privacidade.ejs", {
            data: {
                page: "Privacidade"
            }
        })
    }
}

const privacidadeControllerRead = new privacidadeController();

module.exports = privacidadeControllerRead;