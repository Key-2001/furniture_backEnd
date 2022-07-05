const express = require('express');
const store = require('../middleware/multer')
const { route } = require('./user');
const router = express.Router();
const {createProduct,getImage,getAllProducts,getSingleProduct,deleteProduct} = require('../controllers/product')

router.route('/').get(getAllProducts)
router.route('/:id').get(getSingleProduct).delete(deleteProduct)
router.route('/create').post(store.array('products',4), createProduct)
router.route('/image/:id/:subID').get(getImage)

module.exports = router