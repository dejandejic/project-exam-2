var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");
var AuthController = require("../controller/AuthController");
// var AdminController = require("../controller/AdminController");

router.post("/auth/register", upload.single("logo"), AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/logout", auth, AuthController.logout);
router.get("/auth/check", auth, AuthController.check);

module.exports = router;
