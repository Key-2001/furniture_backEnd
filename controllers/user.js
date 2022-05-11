const mongoose = require('mongoose');
const User = require('../models/User')

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(200).json({errCode:1,msg:'User is empty!!'})
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const createUser = () => {

}
const getSingleUser = () => {

}
const updateUser = () => {

}
const deleteUser = () => {

}
module.exports = {getAllUsers,createUser,getSingleUser,updateUser,deleteUser}