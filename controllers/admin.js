const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const createToken = require('../middleware/createToken')



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
            return res.status(404).json({errCode:1,msg:'User is not exist!!!'})
        }
        if(!isCompare){
            return res.status(400).json({errCode:2,msg:'Password is not true!!!'})
        }
        const token = createToken(JSON.stringify(admin._id))
        res.status(200).json({admin,accessToken:token})
    } catch (error) {
        return res.status(500).json(error)
    }
}

const loginAdminToken = async (req,res) => {
    const {id: idAdmin} = res.locals.token;
    
    try {
        const admin = await Admin.findById(idAdmin);
        if(!admin){
            return res.status(404).json({errCode:1,msg:'Admin account is not exist!'});
        }
        return res.status(200).json({admin})
        return res.status(200).json({msg:'success'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {getAllAdmin,createAdmin,getSingleAdmin,updateAdmin,deleteAdmin,loginAdmin,loginAdminToken}