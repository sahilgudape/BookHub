const { resolve } = require("path");
const db = require("../../db.js");

//create Category
exports.createCategory = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into categories (category_name) values (?)",
      [name],
      (err, result) => {
        if (err) {
          reject("Category Not Save...? " + err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
// 2. List Categories
exports.getAllCategory = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from categories", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from categories where category_id = ?",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

//4. Update category
exports.updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update categories set category_name=? where category_id=?",
      [name, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from categories where category_id=?",
      [id],
      (err, result) => {
        if (err) {
          reject("Error deleting category: " + err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
