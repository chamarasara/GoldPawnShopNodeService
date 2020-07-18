const mongoose = require('mongoose');
const DailyReportSchema = require('../models/dailyreport');
const _ = require('lodash');

exports.daily_report = (req, res, next) => {
    DailyReportSchema.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}
//search reports by date
exports.search_report = (req, res, next) => {
    const searchQuery = {}
    console.log("req", req.body)
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;


    if (startDate != null && endDate != null) {
        var dateQuery = {
            createdAt: { $gt: startDate, $lt: endDate }
        }
        _.assign(searchQuery, dateQuery);
    }

    console.log("searchQuery****", searchQuery);

    DailyReportSchema.find(searchQuery)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({                
                error: err
            })
        });
}