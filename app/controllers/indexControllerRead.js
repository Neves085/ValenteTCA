class IndexController {
    returnPage(req, res) {
        return res.render("pages/index.ejs", {
            data: {
                page: "Valente"
            }
        })
    }
}

const indexControllerRead = new IndexController();

module.exports = indexControllerRead;