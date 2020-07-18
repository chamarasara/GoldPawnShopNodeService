const mongoose = require('mongoose');
const userActivitySchema = require('../models/user_activities');


exports.activity_log = (req, res, next) => {
    userActivitySchema.find()
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

