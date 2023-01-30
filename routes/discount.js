const express = require('express');
const router = express.Router();

const {getAllDiscount, getDiscountId, createDiscount, createDiscountEmail, getDiscountWithCode} = require('../controllers/discount')

router.route('/').get(getAllDiscount).post(createDiscount);
router.route('/:id').get(getDiscountId);
router.route('/code/:discountCode').get(getDiscountWithCode)
router.route('/email').post(createDiscountEmail)

module.exports = router;