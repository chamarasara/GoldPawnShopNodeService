const DailyReport = require("../models/dailyreport");
const mongoose = require('mongoose');

exports.daily_report = (req, res, next) => {
    console.log("Daily report*******", req.body);
    const DailyReportSchema = new DailyReport({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        articleId: req.body.article_number,
        amount: req.body.amount,
        additional_amount: req.body.additional_amount,
        interest_paid: req.body.interest_paid,
        released_amount: req.body.released_amount
    });
    DailyReportSchema.save()
        .then(docs => {
            console.log("Report save********", docs);
            next();
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}