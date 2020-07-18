const Articles = require('../models/articles');
const async = require('async');

exports.articles_get_one = (req, res, next) => {
    Articles.findById(req.params._id)
        .exec()
        .then(doc => {
            req.articleDetails = doc;
            next();
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}