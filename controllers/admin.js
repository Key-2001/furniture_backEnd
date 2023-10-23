const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const createToken = require("../middleware/createToken");
const Product = require("../models/Product");
const User = require("../models/User");

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) {
      return res.status(200).json({ errCode: 1, msg: "Admins is empty" });
    }
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const data = req.body;
    const admin = await Admin.create({
      ...data,
      password:
        data.password.length > 5
          ? bcrypt.hashSync(data.password, salt)
          : data.password,
    });
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSingleAdmin = async (req, res) => {};

const updateAdmin = async (req, res) => {};

const deleteAdmin = async (req, res) => {};

const loginAdmin = async (req, res) => {
  const data = req.body;
  try {
    const admin = await Admin.findOne({ email: data.email });
    const passwordAdmin = admin ? admin.password : "";
    const isCompare = await bcrypt.compare(data.password, passwordAdmin);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "User is not exist!!!" });
    }
    if (!isCompare) {
      return res
        .status(400)
        .json({ success: false, message: "Password is not true!!!" });
    }
    const token = createToken(JSON.stringify(admin._id));
    const { password, ...rest } = admin._doc;
    res.status(200).json({
      success: true,
      message: "Login successfully!",
      admin: { ...rest },
      token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong!" });
  }
};

const loginAdminToken = async (req, res) => {
  const { id: idAdmin } = res.locals.token;

  try {
    const admin = await Admin.findById(idAdmin);
    if (!admin) {
      return res
        .status(404)
        .json({ errCode: 1, msg: "Admin account is not exist!" });
    }
    return res.status(200).json({ admin });
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getProductAdmin = async (req, res) => {
  const perPage = req.query.perPage || 10;
  const page = req.query.page || 1;
  const query = req.query.name || "";
  try {
    const products = await Product.find({ name: { $regex: query } })
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await Product.find({ name: { $regex: query } }).count();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: products,
      page: {
        totalPage: Math.ceil(count / perPage),
        currentPage: page,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong" });
  }
};

const getUserAdmin = async (req, res) => {
  const perPage = req.query.perPage || 10;
  const page = req.query.page || 1;
  const email = req.query.email || "";
  try {
    const users = await User.find({ email: { $regex: email } })
      .select("-password")
      .skip(perPage * page - perPage)
      .limit(perPage);
    const count = await User.find({ email: { $regex: email } }).count();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: users,
      page: {
        totalPage: Math.ceil(count / Number(perPage)),
        currentPage: page,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  getAllAdmin,
  createAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  loginAdminToken,
  getProductAdmin,
  getUserAdmin,
};
