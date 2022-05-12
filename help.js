//check if the session exist,if exist,  
function authorized(req, res, next) {
    if (!req.session.email) {
        res.redirect("/")
        return
    }
    next()
}
