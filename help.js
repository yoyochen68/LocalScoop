//check if the session exist,if exist,  
const mysqlDB = require('./database/databaseAccessLayer')


function sellerAuthorized(req, res, next) {
    if (!req.session.seller) {
        res.redirect("/index2")
        // console.log("index2")
        return
    }
    next()

}



exports.sellerAuthorized = sellerAuthorized



