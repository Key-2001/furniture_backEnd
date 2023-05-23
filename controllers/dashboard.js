const mongoose = require('mongoose');
const ProductSchema = require('../models/Product');
const UserSchema = require('../models/User');
const OrderSchema = require('../models/Order');

const getDashboard = async (req,res) => {
    try {
        const productData = await ProductSchema.find();
        const userData = await UserSchema.find();
        const orderData = await OrderSchema.find();
        let potentialProducts = [];
        orderData.forEach(productList => {
          productList.products.forEach(product => {
            potentialProducts.push(product);
          })
        })
        const productGroup = potentialProducts.reduce((result,cur) => {
          let key = cur['idProduct'];
          if(!result[key]){
            result[key] = []
          }
          result[key].push(cur)
          return result;
        },{})
        let dataChart = [];
        Object.values(productGroup)?.forEach((orderProduct) => {
          const dataConvert = orderProduct.reduce((prev, cur) => {
            let colorList = prev.color;
            colorList.push(cur.color);
            return{
              name: cur.name,
              amount: prev.amount + cur.amount,
              price: cur.price,
              color: colorList,
              idProduct: cur.idProduct
            }
          },{name: '',amount: 0, price: 0, color: [], idProduct: ''})
          dataChart.push(dataConvert);
        })
        return res.status(200).json({msg: 'success', data: {
            productLength: productData?.length,
            userLength: userData?.length,
            orderLength: orderData?.length,
            potentialUser: userData?.splice(0,10),
            productGroup: dataChart
        }})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {getDashboard}