const mongoose = require('mongoose');
const Product = require('../models/Product')
const Image = require('../models/Image')
const fs = require('fs');
const path = require('path')
require('dotenv').config()


const getImage = async (req,res) => {
    const {id,subID} = req.params;
    try {
        const product = await Product.findOne({_id:id});
        if(!product){
            return res.status(404).json({errCode:1,msg:'Product is not exist!'})
        }
        const images = product.images;
        images.map((img,index) => {
            if(subID === img.filename){
                res.contentType(img.contentType);
                res.send(img.urlImg)
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const createProduct = async (req,res) => {
    const imgProducts = req.files;
    console.log(imgProducts);
    const data = req.body;
    try {
        const imgs = imgProducts.map((item,index) => {
            let img = fs.readFileSync(item.path);
            let encode_image = img.toString('base64')
            return{
                filename: item.filename,
                urlImg: new Buffer(encode_image, 'base64'),
                contentType: item.mimetype
            }
        })
        
        // console.log('image',imgs);
        const product = await Product.create({...data,images:imgs})
        
        return res.status(200).json({msg:'success',product})
        // return res.status(200).json({msg:'success'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find();
        // console.log('products',products);
        const listProduct = products.map((item,index) => {
            const listPath = item.images.map((itm,index) => {
                let path = process.env.PATH_IMG + item._id + '/' + itm.filename ;
                return path
            })
            // console.log('listPath',listPath);
            return{
                id: item._id,
                name:item.name,
                price:item.price,
                colors: item.colors,
                company:item.company,
                description: item.description,
                category:item.category,
                shipping:item.shipping,
                urlImg: listPath
            }
        })
        return res.status(200).json({msg:'success',products: listProduct})
    } catch (error) {
        return res.status(500).json({error})
    }
}

const getSingleProduct = async (req,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({errCode:1,msg:'Product is not exist!'})
        }
        const listPath = product.images.map((item,index) => {
            let path = process.env.PATH_IMG + id + '/' + item.filename ;
            return path
        });
        const singleProduct = {
            id: id,
            name:product.name,
            price:product.price,
            colors: product.colors,
            company:product.company,
            description: product.description,
            category:product.category,
            shipping:product.shipping,
            urlImg: listPath
        }
        return res.status(200).json({msg:'success',product:singleProduct})
    } catch (error) {
        return res.status(500).json({error})
    }
}
const deleteProduct = async (req,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndRemove(id);
        if(!product){
            return res.status(404).json({errCode:1,msg:'Product is not exist!'})
        }
        return res.status(200).json({msg:'Delete successful!',product})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {getImage,createProduct,getAllProducts,getSingleProduct,deleteProduct}