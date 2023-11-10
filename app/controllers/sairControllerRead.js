class SairController {
    async logout(req, res) {
        req.session.destroy();

        res.redirect("/");
    }
}

const sairControllerRead = new SairController();

module.exports = sairControllerRead;