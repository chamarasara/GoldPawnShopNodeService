const mongoose = require('mongoose');
const Articles = require('../models/articles');
const moment = require('moment');
const async = require('async');
const _ = require('lodash');


//add new article
exports.articles_add_new = (req, res, next) => {
    //console.log("***************lll", req.body);
    Articles.find({ articleId: req.body.articleId })
        .exec()
        .then(articles => {
            console.log(articles)
            if (articles.length) {
                return res.status(409).json({
                    message: "Article Number Already Exists"
                });
            } else {
                releasedFinalDate = '';
                var additional_amount = 0;
                var total_amount = 0;
                var amount = req.body.amount
                var converted_amount = parseInt(amount, 10)
                getTotalAmount(converted_amount, additional_amount)
                releasedfinaldate(req.body.color);
                console.log(req.body.articleId)
                //console.log(req.body.speacial_circumstances)
                const articles = new Articles({
                    userId: req.body.userId,
                    articleId: req.body.article_number,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    id_number: req.body.id_number,
                    phone_number: req.body.phone_number,
                    amount: req.body.amount,
                    additional_amount: 0,
                    total_amount: total_amount,
                    amountChangedDate: req.body.amountChangedDate,
                    weight: req.body.weight,
                    duration: req.body.duration,
                    addtional_details: req.body.addtional_details,
                    interest_paid: req.body.interest_paid,
                    interestPaidDate: req.body.interestPaidDate,
                    speacial_circumstances: req.body.speacial_circumstances,
                    released_date: req.body.released_date,
                    released_amount: req.body.released_amount,
                    color: req.body.color,
                    date: moment().format('DD/MM/YYYY, h:mm:ss a'),
                    released_final_date: releasedFinalDate,
                    article_status: "Active",
                    previous_article_id: req.body.previous_article,
                    reNewDate: req.body.reNewDate,
                    additional_charges: req.body.additional_charges
                });
                function getTotalAmount(amount, additional_amount) {
                    total_amount = amount + additional_amount;
                    console.log("Total amount", total_amount)
                    return total_amount;
                }
                function releasedfinaldate(color) {
                    const oneyear = moment().add(395, 'days').calendar();
                    const threemonths = moment().add(105, 'days').calendar();
                    if (color == 1 || color == 2) {
                        this.releasedFinalDate = oneyear
                    } else if (color == 3) {
                        this.releasedFinalDate = threemonths
                    }
                }
                articles.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => console.log(err));
                res.status(200).json({
                    message: 'New Article successfully created.',
                    createdArticle: articles
                });
            }
        });
}

//get all articles
exports.articles_get_all = (req, res, next) => {
    Articles.find()
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
//get single article
exports.articles_get_one = (req, res, next) => {
    id = req.params._id;
    console.log(id)
    Articles.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid ID found" })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

//update article
exports.update_article = (req, res, next) => {

    const id = req.params._id;
    console.log("faf", req.body);
    const updateOps = {};

    if (req.body.article_status == "Released") {
        console.log("********test************")
        Articles.update({ _id: id }, { $set: { released_date: moment().format('MM/DD/YYYY'), article_status: "Released" } })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
    }
    else {

        for (const ops in req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Articles.update({ _id: id }, { $set: req.body })
            .exec()
            .then(result => {
                Articles.findById(id)
                    .then(docs => {
                        console.log("docs****", docs)
                        res.status(200).json(docs);
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        });
                    });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
    }

    // for (const ops in req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // //console.log("ops",updateOps)
    // Articles.update({ _id: id }, { $set: req.body })
    //     .exec()
    //     .then(result => {
    //         Articles.findById(id)
    //             .then(docs => {
    //                 console.log("docs****", docs)
    //                 res.status(200).json(docs);
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 res.status(500).json({
    //                     error: err
    //                 });
    //             });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
}
//Delete article
exports.delete_article = (req, res, next) => {
    const id = req.params._id;
    Articles.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

//search article
exports.search_article = (req, res, next) => {
    const searchQuery = {}
    console.log("req", req.body)
    const searchText = req.body.searchText;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    if (searchText != null) {
        var searchTextId = {
            $or: [{ id_number: searchText }, { articleId: searchText }]
        }
        _.assign(searchQuery, searchTextId);
    }

    if (startDate != null && endDate != null) {
        var dateQuery = {
            createdAt: { $gt: startDate, $lt: endDate }
        }
        _.assign(searchQuery, dateQuery);
    }

    console.log("searchQuery****", searchQuery);

    Articles.find(searchQuery)
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