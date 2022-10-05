const router = require("express").Router();
const ContactController = require("../controller/ContactController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post("/contact/all", ContactController.all);
router.post("/contact/add", ContactController.add);
router.get("/contact/:id/view", auth, ContactController.view);

module.exports = router;
