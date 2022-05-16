const express = require('express');
const router = express.Router();
const {getAllAdmin,createAdmin,getSingleAdmin,updateAdmin,deleteAdmin,loginAdmin} = require('../controllers/admin')

router.route('/').get(getAllAdmin).post(createAdmin);
router.route('/:id').get(getSingleAdmin).patch(updateAdmin).delete(deleteAdmin)
router.route('/login').post(loginAdmin)
module.exports = router;