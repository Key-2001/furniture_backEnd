const mongoose = require("mongoose");
const OrderSchema = require("../models/Order");
const ProductSchema = require("../models/Product");
const User = require("../models/User");
const Product = require("../models/Product");

const getAllOrder = async (req, res) => {
  const { id: idUser } = res.locals.token;
  const perPage = req.query.perPage || 10;
  const page = req.query.page || 1;
  const email = req.query.email || "";
  try {
    const orders = await OrderSchema.find({
      idUser: idUser,
      email: { $regex: email },
    })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await OrderSchema.find({
      idUser: idUser,
      email: { $regex: email },
    }).count();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: orders,
      page: {
        totalPage: Math.ceil(count / Number(perPage)),
        currentPage: page,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong" });
  }
};

const createOrder = async (req, res) => {
  const data = req.body;
  const { id: userID } = res.locals.token;
  console.log("data", data, userID);
  console.log("products", JSON.parse(data.products));
  // const products = (data?.products || []).map(el => JSON.parse(el));
  // const paymentType = JSON.parse(data?.paymentType);
  // const discount = JSON.parse(data?.discount)
  // const dataOrder = {...data, products, paymentType, discount}
  const totalPrice = JSON.parse(data.products).reduce((result, current) => {
    if (current.amount <= current.maxAmount) {
      return result + current.amount * current.price;
    } else {
      return result + current.maxAmount * current.price;
    }
  }, 0);
  const totalDiscount = data.valueDiscount.toString().includes("%")
    ? ((totalPrice / 100) * Number(data.valueDiscount?.split("%")[0])).toFixed(
        2
      )
    : Number(data.valueDiscount);
  try {
    // const order = await OrderSchema.create(dataOrder)
    const order = await OrderSchema.create({
      idUser: userID,
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      note: data.note,
      discount: {
        discountCode: data.discountCode,
        discountValue: data.valueDiscount,
      },
      products: JSON.parse(data.products).map((el) => {
        return {
          idProduct: el?.id,
          amount: el?.amount <= el?.maxAmount ? el?.amount : el?.maxAmount,
          color: el?.color,
          price: el?.price,
          img: el?.image,
          name: el?.name,
        };
      }),
      totalDiscount: totalDiscount,
      totalPrice: totalPrice,
      totalCurrentPrice: totalPrice - totalDiscount,
    });
    return res
      .status(200)
      .json({ success: true, message: "Success", order: order });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong" });
  }
};

const getOrderByIdUser = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderSchema.find({ idUser: id });
    // if(order.length === 0){
    //     return res.status(400).json({statusCode: 200, msg: 'Order is not existed!!!'});
    // }
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Success!!", orderData: order });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOrderById = async (req, res) => {
  const { idOrder } = req.params;
  try {
    const order = await OrderSchema.findById(idOrder);
    console.log("bsjhjadjk", order);
    if (!order) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Order is not existed!!!" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Success!", data: order });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const editOrder = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const orderEdited = await OrderSchema.findByIdAndUpdate(id, { ...data });
    if (!orderEdited) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Order is not founded!" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: orderEdited, msg: "Edited successful!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDeleted = await OrderSchema.findByIdAndRemove(id);
    if (!orderDeleted) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Order is not existed!!" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: orderDeleted,
      msg: "Delete order is successful!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateStatusOrder = async (req, res) => {
  const { id } = req.body;
  const data = req.body;
  try {
    const orderUpdated = await OrderSchema.findByIdAndUpdate(id, {
      status: data?.status,
      paymentStatus: data?.paymentStatus,
    });
    if (!orderUpdated) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Order not founded!!!" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: orderUpdated,
      msg: "Update status order successful!!!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  getOrderByIdUser,
  editOrder,
  deleteOrder,
  updateStatusOrder,
  getOrderById,
};
