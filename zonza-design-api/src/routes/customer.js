const router = require("express").Router();
const CustomerController = require("../controller/CustomerController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post("/get_all_documents", CustomerController.getDocsByCustomerById);

// Docs CRUD
router.post(
    "/customer/add/doc",
    auth,
    upload.fields([{ name: "customer_docs" }]),
    CustomerController.addDocsByUser
);
router.get("/customer/read/docs/:id", auth, CustomerController.readDocById);
router.put(
    "/customer/update/doc/:id",
    auth,
    upload.single("customer_docs"),
    CustomerController.updateDocsById
);
router.delete(
    "/customer/delete/doc/:id",
    auth,
    CustomerController.deleteDocById
);

module.exports = router;
