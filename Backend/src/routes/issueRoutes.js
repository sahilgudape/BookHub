const express = require("express");
const router = express.Router();

const issueCtrl = require("../controller/issuecontroller.js");

router.post("/issues", issueCtrl.issueBook);
router.get("/users/:user_id/issues", issueCtrl.getIssuedBooks);
router.put("/issues/:issue_id/return", issueCtrl.returnBook);
router.get("/users/:user_id/fines", issueCtrl.getPendingFines);

module.exports = router;
