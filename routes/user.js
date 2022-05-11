const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getSingleUser,updateUser,deleteUser} = require('../controllers/user')

router.route('/users').get(getAllUsers).post(createUser);
router.route('/users/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;