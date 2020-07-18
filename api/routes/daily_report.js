const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const checkAuth = require('../middleware/check-auth');
const dailyReport = require("../middleware/dailyreport");



const DailyReports = require('../controllers/dailyreport');

router.get('/', DailyReports.daily_report);
router.post('/searchReports', DailyReports.search_report);
module.exports = router;