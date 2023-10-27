const { isEmpty, result } = require("lodash");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const orderSchema = require("../models/Order");
const User = require("../models/User");

const getStatistic = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const countUser = await User.find({
      createdDate: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    }).count()
    const countOrder = await Order.find({
      createdDate: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    }).count()
    return res.status(200).json({
      success: true,
      message: "Success!",
      dataCount: {
        orders: countOrder,
        users: countUser,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  getStatistic,
};
