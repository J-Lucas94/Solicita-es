module.exports = {
    eAdmin: function (req, res, next){
        console.log(req.user)
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', "Você precisa estar logado para acessar !")
        res.redirect("/login")
    }
}
