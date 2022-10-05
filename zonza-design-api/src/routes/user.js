var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

var UserController = require("../controller/UserController");

router.put("/user/change-password/:id", auth, UserController.changePassword);
module.exports = router;
