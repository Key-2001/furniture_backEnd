const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const {getAllOrder, createOrder, getOrderByIdUser, deleteOrder, editOrder,
        updateStatusOrder, getOrderById} = require('../controllers/order')
const multer = require('multer');
const upload = multer()

router.route('/').get(getAllOrder).post(upload.none(), createOrder);
router.route('/:id').get(getOrderByIdUser).patch(editOrder).delete(deleteOrder);
router.route('/status').patch(updateStatusOrder);
router.route('/:idOrder/order').get(getOrderById);

module.exports = router;
