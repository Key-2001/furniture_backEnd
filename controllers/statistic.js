const { isEmpty, result } = require('lodash');
const mongoose = require('mongoose');
const orderSchema = require('../models/Order');

const getStatistic = async (req, res) => {
  const {startDate, endDate} = req.query;
    try {
      if(!startDate || !endDate) {
        return res.status(400).json({status: 400, msg: 'Please select two date!'})
      }
      const orderStatistic = await orderSchema.find({
        createdDate: {
          $gte: startDate,
          $lte: endDate
        }
      }).sort({createdDate: 1});
      const productsData = [];
      orderStatistic.forEach(productList => {
        productList.products.forEach(product => {
          productsData.push(product);
        })
      })
      const productGroup = productsData.reduce((result,cur) => {
        let key = cur['idProduct'];
        if(!result[key]){
          result[key] = []
        }
        result[key].push(cur)
        return result;
      },{})
      const dataChart = Object.values(productGroup).map(orderProduct => {
        const dataConvert = orderProduct.reduce((result, current) => {
          const colorList = result.color;
          colorList.push(current.color);
          return {
            name: current.name,
            amount: result.amount + current.amount,
            color: colorList,
            price: current.price,
            idProduct: current.idProduct
          }
        },{name: '', amount: 0, color:[], idProduct: ''})
        return dataConvert
      })
        return res.status(200).json({msg: 'success',data: dataChart})
    } catch (error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    getStatistic
}