const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const checkAuth = require('../middleware/check-auth');
const userActivity = require("../middleware/user-activity");
const dailyReports = require('../middleware/dailyreport')

const Articles = require('../models/articles');

const ArticlesController = require ('../controllers/articles');


//Add new article
router.post('/', checkAuth, dailyReports.daily_report, ArticlesController.articles_add_new);
//Get all articles
router.get('/', checkAuth, ArticlesController.articles_get_all);
//Get single article
router.get('/:_id', ArticlesController.articles_get_one);
//Update single article
router.patch('/:_id', checkAuth, dailyReports.daily_report, userActivity.create_records, ArticlesController.update_article);
//Delete single article
router.delete('/:_id', checkAuth, userActivity.create_records, ArticlesController.delete_article);
//search article
router.post('/searchArticles',  ArticlesController.search_article);
//Search reports by date
//interesr genarator
// router.patch('/interest-genarator/:interestID', ArticlesController.interest_genarator);

module.exports = router;