const express = require('express');
const router = express.Router();

const {getStatistic} = require('../controllers/statistic');

router.route('/').get(getStatistic);

module.exports = router;