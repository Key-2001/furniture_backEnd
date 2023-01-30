const mongoose = require("mongoose");
const Product = require("../models/Product");
const Image = require("../models/Image");
const fs = require("fs");
const getDirnameImg = require('../middleware/getDirnameImg')
require("dotenv").config();

const getImage = async (req, res) => {
  const { id, subID } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ errCode: 1, msg: "Product is not exist!" });
    }
    const images = product.images;
    const img = images.filter((img, index) => subID === img.filename)[0];
    res.contentType(img.contentType);
    res.send(img.urlImg);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createProduct = async (req, res) => {
  const imgProducts = req.files;
  const stock = JSON.parse(req.body.stock);
  const data = { ...req.body, stock };
  try {
    const imgs = imgProducts.map((item, index) => {
      return process.env.URL_BACKEND + item.filename;
    });

    const product = await Product.create({ ...data, images: imgs });
    return res.status(200).json({ msg: "success", product });
    // return res.status(200).json({msg:'success'})
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error });
  }
};

const getAllProducts = async (req, res) => {
  const { name, sort, category, company, color, price, shipping } = req.query;
  try {
    const products = await Product.find();
    let listProduct = products;
    // const responseCityData = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    // const data = await responseCityData.json();
    // console.log("dataCity", data);
    if (name) {
      listProduct = listProduct.filter((el) => {
        return el?.name?.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });
      console.log("name", listProduct);
    }
    if (category) {
      listProduct = listProduct.filter((el, index) => {
        return el?.category === category;
      });
    }
    if (company) {
      listProduct = listProduct.filter((el) => {
        return el?.company.toLowerCase().indexOf(company.toLowerCase()) !== -1;
      });
      console.log("company", listProduct);
    }
    if (price) {
      listProduct = listProduct.filter((el) => {
        return el?.price <= parseInt(price);
      });
      // console.log("price",listProduct);
    }
    // console.log(JSON.parse(shipping),'isHip');
    // if(JSON.parse(shipping)){
    //     listProduct = listProduct.filter((el) => {
    //         return el.shipping === JSON.parse(shipping);
    //     })

    // }
    if (color) {
      listProduct = listProduct.filter((el) => {
        const isCheck = el.stock.some((el) => el.color === color);
        if (isCheck) {
          return el;
        }
      });
      console.log("color", listProduct);
    }
    if (listProduct.length === 0) {
      return res
        .status(200)
        .json({ statusCode: 204, msg: "Do not have products!!!" });
    }

    if (sort === "priceLowest") {
      listProduct = listProduct.sort((a, b) => a.price - b.price);
    }
    if (sort === "priceHighest") {
      listProduct = listProduct.sort((a, b) => b.price - a.price);
    }
    if (sort === "nameA") {
      listProduct = listProduct.sort((a, b) => {
        if (a.name < b.name) return -1;
        return 0;
      });
    }
    if (sort === "nameZ") {
      listProduct = listProduct.sort((a, b) => {
        if (a.name > b.name) return -1;
        return 0;
      });
    }

    return res.status(200).json({ msg: "success", products: listProduct });
    // return res.status(200).json({msg: 'success',products})
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ errCode: 1, msg: "Product is not exist!" });
    }
    return res.status(200).json({ msg: "success", product });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const dirnameImg = getDirnameImg();
  try {
    const productData = await Product.findByIdAndRemove(id);
    console.log(productData,"productData");
    const imgPaths = productData?.images.map((el) => {
        const path = el.split("/");
        return path[path.length - 1]
    });
    console.log("imgPaths",imgPaths, dirnameImg);
    if (!productData) {
      return res.status(404).json({ errCode: 1, msg: "Product is not exist!" });
    }
    if(imgPaths) {
      imgPaths?.forEach((el) => {
        fs.unlinkSync(`${dirnameImg}${el}`);
        console.log(`${dirnameImg}${el}`);
      })
    }
    return res.status(200).json({ msg: "Delete successful!", productData });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const imgProducts = req.files;
  const stock = JSON.parse(req.body.stock);
  const data = { ...req.body, stock };
  const dirnameImg = getDirnameImg();

  try {
    const productCheck = await Product.findById(productId);
    if(!productCheck) {
      return res
        .status(200)
        .json({ statusCode: 404, msg: "Product is not existed!!!" });
    }
    else{
      const imgs = imgProducts.map((item, index) => {
        return process.env.URL_BACKEND + item.filename;
      });
      productCheck?.images.map((el) => {
        const path = el.split("/");
        return path[path.length - 1]
      }).forEach((el) => {
        fs.unlinkSync(`${dirnameImg}${el}`)
      })
      const productUpdated = await Product.findByIdAndUpdate(productId,{...data, images: imgs});
      return res.status(200).json({ statusCode: 200, msg: "Success!", productUpdated });

    }
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error });
  }
};

module.exports = {
  getImage,
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
