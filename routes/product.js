const express = require('express');
const store = require('../middleware/multer')
const { route } = require('./user');
const router = express.Router();
const {createProduct,getImage,getAllProducts,getSingleProduct,deleteProduct, updateProduct} = require('../controllers/product')

router.route('/').get(getAllProducts)
router.route('/create').post(store.array('products',5), createProduct);
router.route('/:id').get(getSingleProduct).delete(deleteProduct).post(store.array('products',5),updateProduct);
router.route('/image/:id/:subID').get(getImage)

module.exports = router