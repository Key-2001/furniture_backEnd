const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

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
const createUser =  async (req,res) => {
    const data = req.body;
    try {
        const user = await User.create({...data,password:data.password.length>5 ? bcrypt.hashSync(data.password, salt) : data.password});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getSingleUser = async (req,res) => {
    const {id:userID} = req.params;
    try {
        const user = await User.findById(userID);
        if(!user){
            return res.status(200).json({errCode:1,msg:'user is not exist!!!'})
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
}
const updateUser = async (req,res) => {
    const {id:userID} = req.params;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userID,data);
        if(!user){
            return res.status(200).json({errCode:1,msg:'user is not exist!!!'})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const deleteUser =  async (req,res) => {
    const {id:userID} = req.params;
    try {
        const user = await User.findByIdAndRemove(userID);
        if(!user){
            return res.status(200).json({errCode:1,msg:'user is not exist!!!'})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    } 
}
module.exports = {getAllUsers,createUser,getSingleUser,updateUser,deleteUser}