const express = require("express");
const multer = require("multer");
const store = require("../middleware/multer");
const { route } = require("./user");
const router = express.Router();
const upload = multer();

const {
  createProduct,
  getImage,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  deleteMultiProduct
} = require("../controllers/product");
const { requireAuth } = require("../middleware/authMiddleware");

router.route("/").get(getAllProducts);
router.route("/create").post(upload.none(), requireAuth, createProduct);
router.route("/multiple").delete(requireAuth, deleteMultiProduct)
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .post(store.array("products", 5), updateProduct);
router.route("/image/:id/:subID").get(getImage);

module.exports = router;
