const express = require('express');
const router = express.Router();
const {requireAuth} =require('../middleware/authMiddleware')

const {getAllUsers,createUser,getSingleUser,updateUser,deleteUser,loginUser,
        sendMailUser,resetPassword,loginWithToken,logoutUser, editUser, changePassword} = require('../controllers/user')

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/send-mail').post(sendMailUser);
router.route('/reset-password').post(requireAuth,resetPassword)
router.route('/login-with-token').post(requireAuth,loginWithToken)
router.route('/logout').post(requireAuth,logoutUser);
router.route('/edit').put(requireAuth, editUser)
router.route('/change-password').put(requireAuth, changePassword);

module.exports = router;