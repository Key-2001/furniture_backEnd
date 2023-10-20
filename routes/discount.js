const express = require('express');
const router = express.Router();

const {getAllDiscount, getDiscountId, createDiscount, createDiscountEmail, getDiscountWithCode, checkDiscountCode} = require('../controllers/discount')

router.route('/').get(getAllDiscount).post(createDiscount);
router.route('/:id').get(getDiscountId);
router.route('/code/:discountCode').get(getDiscountWithCode)
router.route('/code').post(checkDiscountCode)
router.route('/email').post(createDiscountEmail)

module.exports = router;