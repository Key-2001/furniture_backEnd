const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const {getAllCity, createCity, getAllWards, createWard} = require('../controllers/cityVietNam')

router.route('/').get(getAllCity).post(upload.none(), createCity);
router.route('/ward').get(getAllWards).post(upload.none(), createWard);

module.exports = router;