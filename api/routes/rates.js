const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const checkAuth = require('../middleware/check-auth');
const userActivity = require("../middleware/user-activity");

const Rates = require('../models/rates');

const RatesController = require('../controllers/rates');

//Get all rates
router.get('/:_id', RatesController.get_rates);
router.post('/', RatesController.add_rates);
router.patch('/:_id', RatesController.update_rates);
module.exports = router;