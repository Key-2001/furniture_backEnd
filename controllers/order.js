const mongoose = require('mongoose');
const OrderSchema = require('../models/Order');
const ProductSchema = require('../models/Product')
const User = require('../models/User');
const Product = require('../models/Product');

const getAllOrder = async (req,res) => {
    const {name, email, phoneNumber} = req.query;
    try {
        let orderList = await OrderSchema.find();
        orderList = orderList?.filter((el) => {
            return el?.name?.toLowerCase().indexOf(name?.toLowerCase()) !== -1;
        })
        orderList = orderList?.filter((el) => {
            return el?.email?.toLowerCase().indexOf(email?.toLowerCase()) !== -1;
        })
        orderList = orderList?.filter((el) => {
            return el?.phoneNumber?.indexOf(phoneNumber) !== -1
        })
        return res.status(200).json({msg: 'success!',orderList});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const createOrder = async (req,res) => {
    const data = req.body;
    const products = (data?.products || []).map(el => JSON.parse(el));
    const paymentType = JSON.parse(data?.paymentType);
    const discount = JSON.parse(data?.discount)
    const dataOrder = {...data, products, paymentType, discount}
    try {
        const order = await OrderSchema.create(dataOrder)
        return res.status(200).json({statusCode: 200, msg: "Success!", order})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const getOrderByIdUser = async (req,res) => {
    const {id} = req.params;
     try {
        const order = await OrderSchema.find({idUser: id});
        // if(order.length === 0){
        //     return res.status(400).json({statusCode: 200, msg: 'Order is not existed!!!'});
        // }
        return res.status(200).json({statusCode: 200, msg: "Success!!", orderData: order})

    } catch (error) {
        return res.status(500).json({error})
    }
}

const getOrderById = async (req, res) => {
    const {idOrder} = req.params;
    try {
        const order = await OrderSchema.findById(idOrder);
        console.log("bsjhjadjk",order);
        if(!order){
            return res.status(400).json({statusCode: 400, msg: 'Order is not existed!!!'});
        }
        return res.status(200).json({statusCode: 200, msg: 'Success!', data: order});
    } catch (error) {
        return res.status(500).json({error})
    }
}

const editOrder = async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const orderEdited = await OrderSchema.findByIdAndUpdate(id, {...data});
        if(!orderEdited){
            return res.status(400).json({statusCode: 400, msg: 'Order is not founded!'});
        }
        return res.status(200).json({statusCode: 200, data: orderEdited, msg: 'Edited successful!'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const deleteOrder = async (req,res) => {
    const {id} = req.params;
    try {
        const orderDeleted = await OrderSchema.findByIdAndRemove(id);
        if(!orderDeleted){
            return res.status(400).json({statusCode: 400, msg: 'Order is not existed!!'});
        }
        return res.status(200).json({statusCode: 200, data: orderDeleted, msg: 'Delete order is successful!'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const updateStatusOrder = async (req, res) => {
    const {id} = req.body;
    const data = req.body;
    try {
        const orderUpdated = await OrderSchema.findByIdAndUpdate(id, {status: data?.status, paymentStatus: data?.paymentStatus});
        if(!orderUpdated){
            return res.status(400).json({statusCode: 400, msg: 'Order not founded!!!'});
        }
        return res.status(200).json({statusCode: 200, data: orderUpdated, msg: 'Update status order successful!!!'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {getAllOrder, createOrder, getOrderByIdUser, editOrder, deleteOrder, updateStatusOrder, getOrderById}