const express = require('express');
const router = express.Router();


const {getAllUsers,createUser,getSingleUser,updateUser,deleteUser,loginUser} = require('../controllers/user')

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);
router.route('/login').post(loginUser)

module.exports = router;