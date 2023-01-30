const express = require('express');
const router = express.Router();

const {getAllAddressPersonal, getSingleAddressPersonal, createAddressPersonal, deleteAddressPersonal, updateAddressPersonal} = require('../controllers/addressPersonal')

router.route('/').get(getAllAddressPersonal);
router.route('/:id').post(createAddressPersonal).get(getSingleAddressPersonal).patch(updateAddressPersonal).delete(deleteAddressPersonal)


module.exports = router;