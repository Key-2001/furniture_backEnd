const { isEmpty, result } = require("lodash");
const mongoose = require("mongoose");
const orderSchema = require("../models/Order");

const getStatistic = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    return res.status(200).json({ success: true, message: "Success!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  getStatistic,
};
