const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const {
  getAllAdmin,
  createAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  loginAdminToken,
  getProductAdmin,
  getUserAdmin,
  getOrderAdmin,
  getOrderAdminDetail
} = require("../controllers/admin");

router.route("/").get(getAllAdmin).post(createAdmin);
router.route("/product").get(requireAuth, getProductAdmin);
router.route("/user").get(requireAuth, getUserAdmin);
router.route("/order").get(requireAuth, getOrderAdmin);
router.route('/order/:id').get(requireAuth, getOrderAdminDetail)
router.route("/:id").get(getSingleAdmin).patch(updateAdmin).delete(deleteAdmin);
router.route("/login").post(loginAdmin);
router.route("/login-with-token").post(requireAuth, loginAdminToken);
module.exports = router;
