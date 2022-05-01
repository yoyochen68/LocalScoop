const mysql = require('mysql2');
const db = require('./databaseConnection');

// function getAllRest(callback) {
// 	let sqlQuery = "SELECT * FROM restaurant";
// 	db.query(sqlQuery, (err, results, fields) => {
// 		if (err) {
// 			callback(err, null);
// 		}
// 		else {
// 			callback(null, results);
// 		}		
// 	});
// }
function getAllItems(callback) {
	let sqlQuery = "SELECT * FROM purchase_item";
	db.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, results);
		}		
	});
}

// // function addRest(dataInput, callback) {
// //     let sqlQueryThatIsGoingToAddItem = `insert into restaurant (name, description) values ('${dataInput.name}', '${dataInput.description}');`
// //     db.query(sqlQueryThatIsGoingToAddItem, (err, result, fields) => {
// //         if (err) {
// //             console.log('there is a err in addRest in function');
// //             console.log(err);
// //             callback(err, null);
// //         } else {
// //             console.log("success in functions");
// //             callback(null, result);
// //         }
// //     })
// // }
// function addItem(dataInput, callback) {
//     // let sqlQueryThatIsGoingToAddItem = `
//     //     INSERT into purchase_item (name, description) 
//     //     values ('${dataInput.name}', '${dataInput.description}');`
//     let sqlQueryThatIsGoingToAddItem = `
//         INSERT into purchase_item (name, description) 
//         values ( ? , ? );`
   
   
//     db.query(sqlQueryThatIsGoingToAddItem, dataInput.name, dataInput.description, (err, result, fields) => {
//         if (err) {
//             console.log('there is a err in addRest in function');
//             console.log(err);
//             callback(err, null);
//         } else {
//             console.log("success in functions");
//             callback(null, result);
//         }
//     })
// }

// function plusItem(purchase_item_id, callback){
//     let sqlQueryPlusItem = ``;
// }

// function minusItem(purchase_item_id, callback){
//     let sqlQueryMinusItem = ``
// }

// function deleteRest(theInputId, callback) {
//     let sqlQueryThatIsGoingToDeleteThings = `Delete FROM restaurant WHERE restaurant_id =${theInputId}`;
//     db.query(sqlQueryThatIsGoingToDeleteThings, (err, result, fields) => {
//         if (err) {
//         console.log('there is a err in deleteRest in function');
//         console.log(err);
//         callback(err, null);
//         } else {
//             console.log("success in the deleteRest Function");
//             callback(null, result);
//         }
//     })
// }
// function deleteItem(theInputId, callback) {
//     let sqlQueryThatIsGoingToDeleteThings = `
//         Delete FROM purchase_item 
//         WHERE purchase_item_id = ? `;

//     db.query(sqlQueryThatIsGoingToDeleteThings, theInputId,  (err, result, fields) => {
//         if (err) {
//         console.log('there is a err in deleteItem in function');
//         console.log(err);
//         callback(err, null);
//         } else {
//             console.log("success in the deleteItem Function");
//             callback(null, result);
//         }
//     })
// }



// function deleteReview(theInputId, callback) {
//        //another Thing needs to be added here to delete the FKs
//        let sqlQueryThatIsGoingToDeleteTheReviews = `Delete FROM review WHERE restaurant_id =${theInputId}`;
//     db.query(sqlQueryThatIsGoingToDeleteTheReviews, (err, result, fields) => {
//         if (err) {
//         console.log('there is a err in deleteReview in function');
//         console.log(err);
//         callback(err, null);
//         } else {
//             console.log("success in the deleteReview Function");
//             callback(null, result);
//         }
//     })
// }

// function getAllReview(theInputId, callback) {
// 	let sqlQuery = `SELECT * FROM review WHERE restaurant_id = ${theInputId}`;
// 	db.query(sqlQuery, (err, results, fields) => {
// 		if (err) {
// 			callback(err, null);
// 		}
// 		else {
// 			callback(null, results);
// 		}		
// 	});
// }

// function addReview(dataInput, restaurant_id_Input , callback) {
//     let sqlQueryThatIsGoingToAddItem = `insert into review (reviewer_name, details, rating, restaurant_id) values ('${dataInput.reviewer_name}', '${dataInput.details}', '${dataInput.rating}', '${restaurant_id_Input}');`
//     db.query(sqlQueryThatIsGoingToAddItem, (err, result, fields) => {
//         if (err) {
//             console.log('there is a err in addReview in function');
//             console.log(err);
//             callback(err, null);
//         } else {
//             console.log("success in functions");
//             callback(null, result);
//         }
//     })
// }

// function deleteReviewJustOne(theInputId, callback) {
//     //another Thing needs to be added here to delete the FKs
//     let sqlQueryThatIsGoingToDeleteTheReviews = `Delete FROM review WHERE review_id =${theInputId}`;
//  db.query(sqlQueryThatIsGoingToDeleteTheReviews, (err, result, fields) => {
//      if (err) {
//      console.log('there is a err in deleteReview in function');
//      console.log(err);
//      callback(err, null);
//      } else {
//          console.log("success in the deleteReview Function");
//          callback(null, result);
//      }
//  })
// }

module.exports = { };