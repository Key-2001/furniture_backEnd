const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const {getAllOrder, createOrder, deleteOrder, editOrder,
        updateStatusOrder, getOrderById, getOrderDetail} = require('../controllers/order')
const multer = require('multer');
const upload = multer()

router.route('/').get(requireAuth,getAllOrder).post(upload.none(), requireAuth, createOrder);
router.route('/:id').get(requireAuth,getOrderDetail).patch(editOrder).delete(deleteOrder);
router.route('/status/:id').patch(updateStatusOrder);
router.route('/:idOrder/order').get(getOrderById);

module.exports = router;
