const adminModel = require("../models/adminModel");

//Create user
exports.saveRegister = (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const promise = adminModel.saveRegister(name, email, password, role);

  promise
    .then((result) => {
      res.status(200).json({ message: "User added successfully", result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to add user", error: err.message });
    });
};

exports.getAllUser = (req, res) => {
  const promise = adminModel.getAllUser();

  promise
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something happend getting all users",
        error: err.message,
      });
    });
};

//Update user by Id
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;
  const promise = adminModel.updateUser(name, email, password, role, id);

  promise
    .then((result) => {
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or not updated" });
      }
      return res.status(200).json({ message: "User updated successfully" });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Error occured while updating user",
        error: err.message,
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const promise = adminModel.deleteUser(id);

  promise
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `User of ${id} not found` });
      }
      return res.status(200).json({ message: "User deleted successfully...!" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "User Not deleted...?", error: err.message });
    });
};

exports.getUserByName = (req, res) => {
  const name = req.query.name;

  const promise = adminModel.getUserByName(name);

  promise
    .then((result) => {
      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: `No users found with name ${name}` });
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to get user", error: err.message });
    });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;

  const promise = adminModel.getUserByIdFromDB(id);

  promise
    .then((result) => {
      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: `No users found with id ${id}` });
      }
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to get user", error: err.message });
    });
};

// exports.searchBooksByCategory = (req, res) => {
//   const category = req.query.category;

//   bookModel
//     .searchBooksByCategory(category)
//     .then((result) => {
//       if (result.length > 0) {
//         res.status(200).json({
//           message: `Books searched successfully for category '${category}'`,
//           books: result,
//         });
//       } else {
//         res.send(`No books found in '${category}' category.`);
//       }
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };

// exports.searchBooksByCategory = (req, res) => {
//   const category = req.query.category;

//   if (!category) {
//     return res.status(400).json({ message: "Category required...!" });
//   }
//   bookModel
//     .searchBooksByCategory(category)
//     .then((result) => {
//       if (result.length === 0) {
//         return res
//           .status(404)
//           .json({ message: `No books found in category '${category}'` });
//       }
//       res.status(200).json({
//         message: `Books searched successfully for category '${category}'`,
//         books: result,
//       });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "Error in searchBooksByCategory: " + err });
//     });
// };

// exports.searchBooksByAuthor = (req, res) => {
//   const author = req.params.author.trim();

//   if (!author) {
//     return res.status(400).json({ message: "Author required...!" });
//   }

//   const promise = bookModel.searchBooksByAuthor(author);

//   promise
//     .then((result) => {
//       if (result.length > 0) {
//         res.status(200).json({
//           message: `Books searched successfully for author '${author}'`,
//           books: result,
//         });
//       } else {
//         res.send(`No books found in '${author}' Author.`);
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "Error in search Books By Author :  " + err });
//     });
// };
