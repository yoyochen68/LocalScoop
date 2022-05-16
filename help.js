//check if the session exist,if exist,  
const mysqlDB = require('./database/databaseAccessLayer')


// function authorized(req, res, next) {
//     if (!req.session.email) {
//         res.redirect("/")
//         return
//     }
//     next()
// }



//=====function for +/- item in shopping cart=======

async function incrementQuantity(cart_product_id){
  await mysqlDB.inCartItem(cart_product_id)
    console.log("donee")
}
exports.incrementQuantity = incrementQuantity


function decrementQuantity(){

}

