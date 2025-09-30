const db = require("../../db.js");

exports.register = (name, email, password, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into users (user_name, user_email, password, role) values(?,?,?,?)",
      [name, email, password, role],
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

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from users where user_email=?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("select * from users where user_id=?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
