class ProfissionaisController {
    returnPage(req, res) {
        return res.render("pages/profissionais.ejs", {
            data: {
                page: "Profissionais"
            }
        })
    }
}

const profissionaisControllerRead = new ProfissionaisController();

module.exports = profissionaisControllerRead;