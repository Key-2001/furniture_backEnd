const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const {getAllOrder, createOrder, getOrderByIdUser, deleteOrder, editOrder,
        updateStatusOrder, getOrderById} = require('../controllers/order')
const multer = require('multer');
const upload = multer()

router.route('/').get(requireAuth,getAllOrder).post(upload.none(), requireAuth, createOrder);
router.route('/:id').get(getOrderByIdUser).patch(editOrder).delete(deleteOrder);
router.route('/status/:id').patch(updateStatusOrder);
router.route('/:idOrder/order').get(getOrderById);

module.exports = router;
