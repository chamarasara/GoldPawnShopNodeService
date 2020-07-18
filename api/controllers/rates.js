const mongoose = require('mongoose');
const Rates = require('../models/rates');

//Get rates
exports.get_rates = (req, res, next) => {
    id ="5ede1d0434c8e4192cc45222";
    Rates.findById(id)
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

//Add rates
exports.add_rates = (req, res, next)=>{
    const rates = new Rates({
        oneDay_onetoten : req.body.oneDay_onetoten,
        oneDay_tentosixtyfive : req.body.oneDay_tentosixtyfive,
        oneDay_abovesixtyfive : req.body.oneDay_abovesixtyfive,
        oneWeek_onetoten : req.body.oneWeek_onetoten,
        oneWeek_tentosixtyfive : req.body.oneWeek_tentosixtyfive,
        oneWeek_abovesixtyfive : req.body.oneWeek_abovesixtyfive,
        oneMonth_onetoten : req.body.oneMonth_onetoten,
        oneMonth_tentosixtyfive : req.body.oneMonth_tentosixtyfive,
        oneMonth_abovesixtyfive : req.body.oneMonth_abovesixtyfive
    });
    rates.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        message: 'Added rates',
        createdRates: rates
    });
}
exports.add_rates = (req, res, next) => {
    const rates = new Rates({
        oneDay_onetoten: req.body.oneDay_onetoten,
        oneDay_tentosixtyfive: req.body.oneDay_tentosixtyfive,
        oneDay_abovesixtyfive: req.body.oneDay_abovesixtyfive,
        oneWeek_onetoten: req.body.oneWeek_onetoten,
        oneWeek_tentosixtyfive: req.body.oneWeek_tentosixtyfive,
        oneWeek_abovesixtyfive: req.body.oneWeek_abovesixtyfive,
        oneMonth_onetoten: req.body.oneMonth_onetoten,
        oneMonth_tentosixtyfive: req.body.oneMonth_tentosixtyfive,
        oneMonth_abovesixtyfive: req.body.oneMonth_abovesixtyfive
    });
    rates.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(200).json({
        message: 'New Article successfully created.',
        createdRates: rates
    });
}
exports.update_rates = (req, res, next) => {

    const id = "5ede1d0434c8e4192cc45222";
    //console.log("faf", req.body);
    const updateOps = {};
    // for (const ops in req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    //console.log("ops",updateOps)
    Rates.update({ $set: req.body })
        .exec()
        .then(result => {
            Rates.findById(id)
                .then(docs => {
                    console.log("docs****", docs)
                    res.status(200).json(docs);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}
``