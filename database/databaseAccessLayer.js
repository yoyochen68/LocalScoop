
/** database setup */
const res = require("express/lib/response");
const mysql = require("mysql2")
const is_heroku = process.env.IS_HEROKU || false;
let database;

const dbConfigHeroku = {
    host: "ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "hct0x5slkt8i1bgn",
    password: "o9dc7b1zw1ho9812",
    database: "ht3fknlbys0qeor5",
    multipleStatements: false,
    namedPlaceholders: true
};



// YASMINA's localHost
const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Fswd2021$",
	database: "localscoop",
	port: 3306,
	multipleStatements: false,
	namedPlaceholders: true
};



// KEVIN's localHost
// const dbConfigLocal = {
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "localscoop",
//     port: 3306,
//     multipleStatements: false,
//     namedPlaceholders: true
// };
//


// YOYO local database
// const dbConfigLocal = {
//     host: "localhost",
//     user: "root",
//     password: "Password",
//     database: "localscoop_local",
//     port: 3306,
//     multipleStatements: false,
//     namedPlaceholders: true
// };

if (is_heroku) {
    database = mysql.createPool(dbConfigHeroku).promise();
}
else {
    database = mysql.createPool(dbConfigLocal).promise();
}


/*****      Functions     *****/

/**
 * @param {number} store_id 
 * @returns all products belonging to a store
 */
async function getProductsByStoreId(store_id=1) {
    let query = `
    SELECT product.*, store.store_name, product_photo.photo_file_path
    FROM product
    LEFT JOIN store
    ON store.store_id = product.store_id
    LEFT JOIN product_photo
    ON product.product_id = product_photo.product_id
    WHERE store.store_id = ?
    `

    let [products, fields] = await database.query(query,[store_id])
    return products
}
exports.getProductsByStoreId = getProductsByStoreId



/** 
 * get all the orders by the giving store id in the order table
 * @param {number} store_id. 
 */
function getOrdersByStoreId(store_id = 1) {
    // has to be single line. because we used a sql keyword as table name. SO we cannot use backticks to wrap the string
    let query = "select * from `order` WHERE store_id = ?";

    database.query(query, [store_id])
        .then((orders) => {
            return orders[0]
        })
}
exports.getOrdersByStoreId = getOrdersByStoreId



async function authenticateShopOwner(store_email, store_password) {
    let query = `SELECT * FROM store WHERE store_email = ? and store_password = ?;`
    let [validatedShopOwner,filed] = await database.query(query, [store_email, store_password])
    return validatedShopOwner
}
exports.authenticateShopOwner = authenticateShopOwner
authenticateShopOwner("localscoop@gmail.com", "localscoop").then(console.log)
// authenticateShopOwner("local", "localsc").then(console.log)





async function authenticateBuyer(buyer_email, buyer_password) {
    let query = `SELECT * FROM buyer WHERE buyer_email = ? and buyer_password = ?;`
    let [validatedBuyer,filed] = await database.query(query, [buyer_email, buyer_password])
    return validatedBuyer
}
exports.authenticateBuyer = authenticateBuyer
// authenticateBuyer("localscoop@gmail.com", "localscoop").then(console.log)
// authenticateBuyer("local", "localsc").then(console.log)







 async function getAllStores(){

     let sqlQuery = `SELECT * FROM storesAndImages ORDER BY store_id ASC `
     const [stores, fields] = await database.query(sqlQuery)
     return stores
 }
exports.getAllStores = getAllStores
getAllStores().then(console.log)





async function getAllProducts() {
        let sqlQuery = `SELECT * FROM productsAndImages ORDER BY product_id ASC `
        const [products, fields] = await database.query(sqlQuery)
        return products

}

exports.getAllProducts= getAllProducts
// getAllProducts().then(console.log)



/**
 *
 * @param store_id
 * @returns {Promise<*>}
 */
async function getStoreInfoByStoreId(store_id) {

    let query = `
        SELECT store.*, 
        GROUP_CONCAT(DISTINCT category.category_name ORDER BY category.category_id SEPARATOR', ') AS "categories",
        GROUP_CONCAT(DISTINCT store_photo.photo_file_path SEPARATOR', ') AS "photos"

        FROM store
        LEFT JOIN store_category 
        ON store.store_id = store_category.store_id
        LEFT JOIN category
        ON store_category.category_id = category.category_id
        LEFT JOIN store_photo
        ON store.store_id = store_photo.store_id
        WHERE store.store_id = ?
        group by store_id `

    let [store, fields] = await database.query(query, [store_id])
    return store
}
exports.getStoreInfoByStoreId = getStoreInfoByStoreId
// getStoreInfoByStoreId(1).then(console.log)




//===================SHOP SETUP=========================

/**
 *
 * @param store_name
 * @param store_phone_number
 * @param store_email
 * @param store_password_hash
 * @returns {*}
 */

async function addShop(store_name, store_phone_number, store_email, store_password) {
    let query = `
    INSERT INTO store (store_name, store_phone_number, store_email, store_password) 
    VALUES ( ?, ?, ?, ?);`;

    let newStoreInfo= await database.query(query, [store_name, store_phone_number, store_email, store_password]);
    let newStoreId = newStoreInfo[0].insertId
    return getStoreInfoByStoreId(newStoreId)
}
exports.addShop = addShop
// addShop("store_name", "store_phone_number", "store_email", "store_password_hash").then(console.log)



/**
 * @param store_id
 * @param store_address
 * @returns {Promise<*>}
 */
async function updateShopAddressByStoreId(store_id, store_address = "") {

    let query = `
        UPDATE store
        SET store_address = ?
        WHERE store.store_id  = ?;
        `
    await database.query(query, [store_address, store_id])
    return getStoreInfoByStoreId(store_id)
}
exports.updateShopAddressByStoreId = updateShopAddressByStoreId
// updateShopAddressByStoreId(1,"123 Robson ST").then(console.log)



/**
 *
 * @param categoryNameList
 * @returns {Promise<*[]>}
 */
async function getCategoryIdByCategoryName(categoryNameList) {
    let categoryIdList = []

    let query = `
    SELECT category.category_id
    FROM category
    WHERE category.category_name=?;`

    for (let categoryName of categoryNameList) {
        let [idObjectOfName, fields] = await database.query(query, [categoryName])
        // console.log( "idObjectOfName: ",idObjectOfName)
        let idOfName = JSON.parse(idObjectOfName[0]['category_id'])
        categoryIdList.push(idOfName)
    }
    return categoryIdList
}
exports.getCategoryIdByCategoryName = getCategoryIdByCategoryName





/**
 *
 * @param store_id
 * @param categoryNameList
 * @returns {Promise<*>}
 */
async function updateShopCategoryByStoreId(store_id, categoryNameList) {
    console.log(categoryNameList)
    let catIdList = await getCategoryIdByCategoryName(categoryNameList)

    let query = `
         INSERT INTO store_category (store_id, category_id)
         VALUES (?, ?);`

    for (let catId of catIdList) await database.query(query, [store_id, catId])
    return getStoreInfoByStoreId(store_id)
}
exports.updateShopCategoryByStoreId = updateShopCategoryByStoreId
// updateShopCategoryByStoreId(1,[2, 3, 4]).then(console.log)
// updateShopCategoryByStoreId(1,["beauty", "stationary", "art"]).then(console.log)



/**
 *
 * @param store_id
 * @param delivery
 * @param pickup
 * @param radius
 * @returns {Promise<*>}
 */
async function updateShopDeliveryByStoreId(store_id, delivery=0, pickup=0, radius=0) {

    let query = `
    UPDATE store
    SET store.delivery = ?,
    store.pickup = ?,
    store.radius = ?
    WHERE store.store_id = ?;`

    await database.query(query, [delivery, pickup, radius, store_id])
    return getStoreInfoByStoreId(store_id)
}
exports.updateShopDeliveryByStoreId = updateShopDeliveryByStoreId
// updateShopDeliveryByStoreId(1,0,1,0).then(console.log)



// ***********  command works, but f() doesn't
/**
 * @param store_id
 * @param photo_path
 */
async function updateShopPhotoByStoreId(store_id, photo_path = "") {
   
    let query = `
    INSERT INTO store_photo(store_id, photo_file_path ) 
    VALUE(?, ?)`

    await database.query(query, [store_id, photo_path])
}
exports.updateShopPhotoByStoreId = updateShopPhotoByStoreId




//===================SELLER-SHOP =========================


async function getShopPhotoByStoreId(store_id) {

    let query = `
          SELECT store.store_id, 
          JSON_ARRAYAGG(store_photo.photo_file_path) AS "photos"
          FROM store
          LEFT JOIN store_photo
          ON store.store_id = store_photo.store_id
          WHERE store.store_id = ?
          group by store.store_id 
         `

    let [store, fields] = await database.query(query,[store_id])
    const photos = store[0].photos.filter(a => a)
    return photos

//           GROUP_CONCAT(DISTINCT store_photo.photo_file_path SEPARATOR', ') AS "photos"
//             FROM store
//             LEFT JOIN store_photo
//             ON store.store_id = store_photo.store_id
//             WHERE store.store_id = ?
//             group by store_id `

//     let [store, fields] = await database.query(query,[store_id])
//     let allPhotosString = store[0].photos
//     return allPhotosString.split(", ")

}
exports.getShopPhotoByStoreId = getShopPhotoByStoreId
// getShopPhotoByStoreId(1).then(console.log)



async function getProductsAndImagesByStoreID(store_id) {
    let sqlQuery = `SELECT * FROM productsAndImages WHERE store_id = ?`
    const [product, fields] = await database.query(sqlQuery, [store_id])
    return product
}
exports.getProductsAndImagesByStoreID = getProductsAndImagesByStoreID




//works for local database
async function getAllBuyers() {
    let sqlQuery = "SELECT buyer_id, buyer_firstname, buyer_lastname, buyer_email, buyer_phone_number, buyer_gender, buyer_date_of_birth, buyer_profile_photo, buyer_address FROM buyer";
    const [AllBuyers] = await database.query(sqlQuery);
    return AllBuyers;
}
exports.getAllBuyers = getAllBuyers
// getAllBuyers().then(console.log)



//works for local database
async function getBuyer(buyer_id) {
    let sqlQuery = "SELECT buyer_id, buyer_firstname, buyer_lastname, buyer_email, buyer_phone_number, buyer_gender, buyer_date_of_birth, buyer_profile_photo, buyer_address FROM buyer WHERE buyer_id = ? ";
    const [AllBuyers] = await database.query(sqlQuery, [buyer_id]);
    const buyer = AllBuyers[0];
    return buyer;
}
exports.getBuyer = getBuyer
// getBuyer(2).then(console.log)



//works for local database
async function getProductsAndImages(product_id) {
    let sqlQuery = `SELECT * FROM productsAndImages WHERE product_id = ?`
    const [product, fields] = await database.query(sqlQuery, [product_id])
    return product
}
exports.getProductsAndImages = getProductsAndImages
// getProductsAndImages(76).then(console.log)



//works for local database
async function addNewProduct(store_id, product_name, product_category, product_description, product_price, product_delivery_fee) {
    let query = `INSERT INTO product(store_id,product_name, product_category, product_description, product_price, product_delivery_fee) VALUE (?, ?, ?, ?, ?, ?)`
    const [newproductInfo] = await database.query(query, [store_id, product_name, product_category, product_description, product_price, product_delivery_fee])
    return +newproductInfo.insertId

}
exports.addNewProduct = addNewProduct
// addNewProduct(2,"pp", "food", "olive", 20, 10).then(console.log)















async function getCartItemsByBuyer(buyerId){

    let query = `SELECT cart.cart_id, cart.buyer_id, 

          JSON_ARRAYAGG(cart.product_id) AS "items"

            FROM cart 
            LEFT JOIN product
            ON product.product_id = cart.product_id
            WHERE buyer_id = ?
            group by cart.buyer_id
             `;

    const [buyerOrders, fields] = await database.query(query, [buyerId]);
    return buyerOrders[0].items.filter(a => a)


}
exports.getCartItemsByBuyer = getCartItemsByBuyer
getCartItemsByBuyer(1).then(console.log)





async function getCartItemsLength(buyerId){
    let itemsArray =  await getCartItemsByBuyer(buyerId)
    return itemsArray.length
}


exports.getCartItemsLength = getCartItemsLength
// getCartItemsLength(1).then(console.log)




async function getCartItems(){

    let query = `SELECT * FROM cart`
     let [cartItems,fields] = await database.query(query)
    return cartItems
}
exports.getCartItems = getCartItems




async function addToCart(buyerId, productId) {

    let query = `INSERT INTO cart(buyer_id, product_id) VALUE (?, ?)`

    await database.query(query, [buyerId, productId])
    // return getCartItemsByBuyer(buyerId)
    return getCartItems()

}

exports.addToCart = addToCart
// addToCart(1, 2).then(console.log)



// exports.addNewProductPhoto = addNewProductPhoto

// addNewProductPhoto(2,"dfgvdfvd444").then(console.log)




