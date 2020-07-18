const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const checkAuth = require('../middleware/check-auth');
const userActivity = require("../middleware/user-activity");


const UserActivities = require ('../controllers/activitylog');

router.get('/', UserActivities.activity_log);

module.exports = router;