const router = require("express").Router();
const FeedbackController = require("../controller/FeedbackController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post("/feedback/all", FeedbackController.all);
router.post("/feedback/add", FeedbackController.add);
router.get("/feedback/:id/view", auth, FeedbackController.view);

module.exports = router;
