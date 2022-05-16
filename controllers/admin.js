const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const getAllAdmin = async (req,res) => {
    try {
        const admins = await Admin.find();
        if(admins.length === 0){
            return res.status(200).json({errCode:1,msg:'Admins is empty'});
        }
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createAdmin = async (req,res) => {
    try {
        const data = req.body;
        const admin = await Admin.create({...data,password:data.password.length>5 ? bcrypt.hashSync(data.password, salt) : data.password});
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getSingleAdmin = async (req,res) => {

}

const updateAdmin = async (req,res) => {

}

const deleteAdmin = async (req,res) => {

}

const loginAdmin = async (req,res) => {
    const data = req.body;
    try {
        const admin = await Admin.findOne({userName: data.userName});
        const passwordAdmin = admin ? admin.password : '';
        const isCompare = await bcrypt.compare(data.password,passwordAdmin);
        if(!admin){
            return res.status(200).json({errCode:1,msg:'User name không tồn tại!!!'})
        }
        if(!isCompare){
            return res.status(200).json({errCode:2,msg:'Mật khẩu không chính xác!!!'})
        }
        return res.status(200).json(admin)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {getAllAdmin,createAdmin,getSingleAdmin,updateAdmin,deleteAdmin,loginAdmin}