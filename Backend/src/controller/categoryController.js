const catModel = require("../models/categoryModel.js");

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }
  const promise = catModel.createCategory(name);

  promise
    .then((result) => {
      return res.status(200).json({ message: "Category saved successfully" });
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Category already exists" });
      }
      return res.status(400).json({ error: err });
    });
};

exports.getAllCategory = (req, res) => {
  let promise = catModel.getAllCategory();

  promise
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(404).json({ message: err });
    });
};

exports.getCategoryById = (req, res) => {
  const id = req.params.bid;

  const promise = catModel.getCategoryById(id);

  promise
    .then((result) => {
      if (result.length === 0) {
        res.json({ message: "Category not found" });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.json({ error: "Error fetching category by ID", details: err });
    });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  catModel
    .updateCategory(id, name)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category updated successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to update category", error: err.message });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  const promise = catModel.deleteCategory(id);

  promise
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found " });
      }

      return res
        .status(200)
        .json({ message: "Category deleted successfully...!" });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Failed to delete category", error: err.message });
    });
};
