const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config()
const createToken = require('../middleware/createToken')

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const getAllUsers = async (req,res) => {
    const {name} = req.query;
    try {
        let users = await User.find();
        if(!users){
            return res.status(200).json({errCode:1,msg:'User is empty!!'})
        }
        users = users.filter((el) => {
            return el?.name?.toLowerCase().indexOf(name.toLowerCase()) !== -1
        });

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({errCode: 5,msg:"Error sever!!",error})
    }
}
const createUser =  async (req,res) => {
    const data = req.body;
    // console.log('auth',req.headers);
    try {
        const user = await User.create({...data,password:data.password.length>5 ? bcrypt.hashSync(data.password, salt) : data.password});
        return res.status(200).json(user);
    } catch (error) {
        if(error?.keyPattern?.phoneNumber === 1){
            return res.status(401).json({errCode: 2, msg: "Your phone number is existed"})
        }else{
            return res.status(401).json({errCode: 2, msg: "Your email number is existed"})
        }
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
        const user = await User.findByIdAndUpdate(userID,{...data,password: data.password.length>5 ? bcrypt.hashSync(data.password, salt) : data.password});
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
            return res.status(404).json({errCode:1,msg:'user is not exist!!!'})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    } 
}

const loginUser = async (req,res) => {
    const data = req.body;
    try {
        let user = await User.findOne({phoneNumber: data.phoneNumber}).exec();
        
        if(!user){
            return res.status(404).json({errCode:1,msg:'User is not existed!'})
        }
        if(!bcrypt.compareSync(data.password,user.password)){
            return res.status(404).json({errCode:2,msg:'Password is not true!'})
        }
        
        const token = createToken(user._id);
        // console.log('token',token);
        return res.status(200).json({user,accessToken: token});
    } catch (error) {
        return res.status(500).json({errCode: 5,error})
    }
}

const sendMailUser = async (req,res) => {
    const {email} = req.body;
    try {
        const token = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD_EMAIL
            }
        });
        
        let mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Reset your password!!',
            html: `<b>You can reset your password<a href=${process.env.URL_CLIENT}${token}> here!</a></b>`
        };
        let user = await User.findOne({email: email}).exec();
        if(!user){
            return res.status(404).json({errCode:1,msg:'Email is not existed!'})
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            return res.status(400).json(error);
            } else {
            return res.status(200).json({'msg':info.response,'token':token});
            }
        });
    } catch (error) {
        return res.status(500).json({error})
    }
    
}

const resetPassword = async (req,res) => {
    // console.log(res.locals.token);
    const {email} = res.locals.token;
    const {password} = req.body;
    // console.log(password);
    // console.log(email);
    try {
        let user = await User.findOneAndUpdate({email: email},{password: password.length>5 ? bcrypt.hashSync(password, salt) : password})
        // if(user){
        //     jwt.destroy(token);
        // }
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json(error)
    }
}
const loginWithToken = async(req,res) => {
    // console.log(res.locals.token);
    const {id:userID} = res.locals.token;
    try {
        const user = await User.findById(userID);
        if(!user){
            return res.status(404).json({errCode:1,msg:'User is not found!!!'})
        }
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({err})
    }
}

const logoutUser = async(req,res) => {
    const token = res.locals.tokenDestroy
    try {
        return res.status(200).json({msg:'LogoutSuccess!'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {getAllUsers,createUser,getSingleUser,updateUser,deleteUser,loginUser,sendMailUser,resetPassword,loginWithToken,logoutUser}