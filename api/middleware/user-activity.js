const UserActivity = require("../models/user_activities");
const mongoose = require('mongoose');

exports.create_records = (req, res, next) => {
    console.log("userObj*******", req.body);
    const userActivitySchema = new UserActivity({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        articleId: req.body.articleId,
        phone_number: req.body.phone_number,
        amount: req.body.amount,
        additional_amount: req.body.additional_amount,
        interest_paid: req.body.interest_paid,
        article_status: req.body.article_status,
        released_amount: req.body.released_amount
    });
    userActivitySchema.save()
        .then(docs => {
            console.log("docs********", docs);
            next();
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}
