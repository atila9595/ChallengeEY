module.exports = {
    eUser: function checkAuthentication(req, res, next) {
        if (req.isAuthenticated() && req.user.admin == 0) {
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else {
            req.flash({ error_msg: 'Faça Login para acessar essa pagina' })
            res.redirect("/user/missoes");
        }
    }
}