const DiscountSchema = require("../models/Discount");
const nodemailer = require("nodemailer");
const { sendMail } = require("../middleware/sendMail");
require("dotenv").config();

const getAllDiscount = async (req, res) => {
  try {
    const result = await DiscountSchema.find();
    if (result.length === 0) {
      return res
        .status(200)
        .json({ statusCode: 200, msg: "Discount is empty!!" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Success!", data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getDiscountId = async (req, res) => {
  const { id } = req.params;
  try {
    return res.status(200).json({ statusCode: 200, msg: "Success!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createDiscount = async (req, res) => {
  const data = req.body;
  try {
    const result = await DiscountSchema.create({ ...data, email: "" });
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Success!", data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createDiscountEmail = async (req, res) => {
  const data = req.body;
  const { email } = data;
  try {
    if (!data?.email) {
      return res
        .status(200)
        .json({
          statusCode: 200,
          message: "Email is not empty!",
          success: false,
        });
    }
    const discountCheck = await DiscountSchema.find({ email: email });
    if (discountCheck.length !== 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already used!!!",
        success: false,
      });
    }
    const discountId = `NEW_MEMBER${new Date().valueOf()}`;

    await sendMail({
      template: "discount",
      email: email,
      subject: "Discount for you <3!!!!",
      templateVars: { discountId: discountId, urlWeb: process.env.URL_CLIENT },
    });

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: process.env.USER_EMAIL,
    //         pass: process.env.PASSWORD_EMAIL
    //     }
    // })
    // (<%= name %>)
    // const mailOptions = {
    //     form: process.env.USER_EMAIL,
    //     to: email,
    //     subject: 'Discount for you <3!!!!',
    //     html: `${discountId}`
    // }

    // transporter.sendMail(mailOptions, function(error, info) {
    //     if(error){
    //         return res.status(500).json({error});
    //     }else{
    //         return res.status(200).json({msg: info.response })
    //     }
    // })

    const result = await DiscountSchema.create({
      idDiscount: discountId,
      valueDiscount: "20%",
      amountUse: 1,
      email: email,
    });

    return res
      .status(200)
      .json({
        statusCode: 200,
        message: "Success!",
        data: result,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error, success: false, message: "Something went wrong" });
  }
};

const getDiscountWithCode = async (req, res) => {
  const { discountCode } = req.params;
  console.log("discountCode", discountCode);
  try {
    const discount = await DiscountSchema.find({ idDiscount: discountCode });
    console.log("discount", discount);
    if (discount.length === 0) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Discount is not existed!" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Success!", data: discount[0] });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllDiscount,
  getDiscountId,
  createDiscount,
  createDiscountEmail,
  getDiscountWithCode,
};
