class termosController {
    returnPage(req, res) {
        return res.render("pages/termos.ejs", {
            data: {
                page: "Termos"
            }
        })
    }
}

const termosControllerRead = new termosController();

module.exports = termosControllerRead;