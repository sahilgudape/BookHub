const db = require("../../db.js");

exports.saveRegister = (name, email, pass, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into users (user_name, user_email, password, role) values(?,?,?,?)",
      [name, email, pass, role],
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

exports.getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from users", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getUserByIdFromDB = (id) => {
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

exports.updateUser = (...user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update users set user_name=?, user_email=?, password=?, role=? where user_id=?",
      [...user],
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

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("delete from users where user_id=?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from users where user_name like '%" + name + "%'",
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

//========================================================
//View all pendings
