const express = require('express');
const router = express.Router();

const {getAllInfo} = require('../controllers/test')

router.route('/').get(getAllInfo);

module.exports = router;