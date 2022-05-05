// const database = inc('./databaseConnection');
// import * as database from "./databaseConnection.js";

//=====Sam suggest we use async await rather than call back=====

import mysql from 'mysql2'
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

// const dbConfigLocal = {
// 	host: "localhost",
// 	user: "root",
// 	password: "root",
// 	database: "localscoop",
// 	port: 3306,
// 	multipleStatements: false,
// 	namedPlaceholders: true
// };


//YOYO local database
const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Password",
	database: "localscoop_local",
	port: 3306,
	multipleStatements: false,
	namedPlaceholders: true
};


if (is_heroku) {
	database = mysql.createPool(dbConfigHeroku).promise();
}
else {
	database = mysql.createPool(dbConfigLocal).promise();
}

//=============above is mysql set up =========


export async function getAllBuyers() {
    let sqlQuery = "SELECT buyer_id, buyer_firstname, buyer_lastname, buyer_email, buyer_phone_number, buyer_gender, buyer_date_of_birth, buyer_profile_photo, buyer_address FROM buyer";
    const [AllBuyers] = await database.query(sqlQuery);
    return AllBuyers;
}

getAllBuyers().then(console.log)


export async function getBuyer(buyer_id) {
    let sqlQuery = "SELECT buyer_id, buyer_firstname, buyer_lastname, buyer_email, buyer_phone_number, buyer_gender, buyer_date_of_birth, buyer_profile_photo, buyer_address FROM buyer WHERE buyer_id = ? ";
    const [AllBuyers] = await database.query(sqlQuery,[buyer_id]);
    const buyer = AllBuyers[0];
    return buyer;
}



// export async function addTask(title) {
//     let query = `INSERT INTO tasks(title) VALUE (?)`
//     const [data] = await pool.query(query, [title])
//     const id = data.insertId
//     return await getTask(id)
//   }



export async function addNewProduct(store_id, product_name, product_category, product_description, product_price, product_delivery_fee, product_timestamp) { 
    let query = `INSERT INTO product(store_id, product_name, product_category, product_description, product_price, product_delivery_fee, product_timestamp) VALUE (?, ?, ?, ?, ?, ?, ?)`
    const [newproductInfo] = await pool.query(query, [store_id, product_name, product_category, product_description, product_price, product_delivery_fee, product_timestamp])
    const id = newproductInfo.insertId
    return await getProduct(id)
}





//kevin:
export async function getProductsByStoreId(store_id) { //get all the products of the store by the store id in the product table

}

//kevin

export async function getOrdersByStoreId(store_id) { //get all the orders by the giving store id in the order table

}


//yasmina
export async function getStoreInfoByStoreId(store_id) { //get the store info by the giving store id in the store table

}

//yasmina
// export async function getStoreInfoByStoreId(store_id) { 
    
// }




export async function getAllProductPhotosByStoreId() {} //don't need to implement it because we don't have a edit shop page 









//==========copy from Patrick's lab"========


// function getAllUsers(callback) {
//     let sqlQuery = "SELECT web_user_id, first_name, last_name, email FROM web_user";
//     database.query(sqlQuery, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         }
//         else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }

// const passwordPepper = "SeCretPeppa4MySal+";

// function addUser(postData, callback) {
//     let sqlInsertSalt = "INSERT INTO web_user (first_name, last_name, email, password_salt) VALUES(:first_name, :last_name, :email, sha2(UUID(), 512)); ";
//     let params = {
//         first_name: postData.first_name, last_name: postData.last_name,
//         email: postData.email
//     };
//     console.log(sqlInsertSalt);

//     database.query(sqlInsertSalt, params, (err, results, fields) => {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//         } else {
//             let insertedID = results.insertId;
//             let updatePasswordHash = "UPDATE web_user SET password_hash = sha2(concat(:password,:pepper,password_salt),512) WHERE web_user_id = :userId;"
//             let params2 = {
//                 password: postData.password,
//                 pepper: passwordPepper,
//                 userId: insertedID
//             }
//             console.log(updatePasswordHash);
//             database.query(updatePasswordHash, params2, (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     callback(err, null);
//                 } else {
//                     console.log(results);
//                     callback(null, results);
//                 }
//             });
//         }
//     });
// }

// function deleteUser(webUserId, callback) {
//     let sqlDeleteUser = "DELETE FROM web_user WHERE web_user_id = :userID";
//     let params = {
//         userID: webUserId
//     };
//     console.log(sqlDeleteUser);
//     database.query(sqlDeleteUser, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }



// function getAllRestaurants(callback) {
//     let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant";
//     database.query(sqlQuery, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }


// function addRestaurants(postData, callback) {
//     let sqlInsertRestaurant = "INSERT INTO restaurant (name, description) VALUES(:name, :description); ";
//     let params = {
//         name: postData.name,
//         description: postData.description
//     };
//     database.query(sqlInsertRestaurant, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
//     console.log(sqlInsertRestaurant);
// }

// function deleteRestaurants(restaurant_id, callback) {
//     let sqlDeleteRestaurant = "DELETE FROM restaurant WHERE restaurant_id = :restaurant_id";
//     let params = {
//         restaurant_id: restaurant_id
//     };
//     console.log(sqlDeleteRestaurant);
//     database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }


// function getReview(restaurant_id, callback) {
//     let reviewQuery = "SELECT review_id, restaurant_id, reviewer_name, details, rating FROM review";
//     let params = {
//         restaurant_id: restaurant_id
//     };
//     database.query(reviewQuery, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }


// function getRestaurantName(restaurant_id, callback) {
//     let reviewQuery = "SELECT * FROM restaurant WHERE restaurant_id = :restaurant_id";
//     let params = {
//         restaurant_id: restaurant_id
//     };
//     database.query(reviewQuery, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }

// function addReview(postData, callback) {
//     let sqlInsertReview = "INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES(:restaurant_id, :reviewer_name, :details, :rating); ";
//     let params = {
//         restaurant_id: postData.restaurant_id,
//         reviewer_name: postData.reviewer_name,
//         details: postData.details,
//         rating: postData.rating

//     };
//     database.query(sqlInsertReview, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
//     console.log(sqlInsertReview);
// }



// function deleteReview(review_id, callback) {
//     let sqlDeleteReview = "DELETE FROM review WHERE review_id = :review_id";
//     let params = {
//         review_id: review_id
//     };
//     console.log(sqlDeleteReview);
//     database.query(sqlDeleteReview, params, (err, results, fields) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(results);
//             callback(null, results);
//         }
//     });
// }


// module.exports = { getAllRestaurants, addRestaurants, deleteRestaurants, getReview, getRestaurantName, addReview, deleteReview }