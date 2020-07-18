const mongoose = require('mongoose');

const ratesSchema = mongoose.Schema({
    oneDay_onetoten : { type: Number },
    oneDay_tentosixtyfive : { type: Number },
    oneDay_abovesixtyfive : { type: Number },
    oneWeek_onetoten : { type: Number },
    oneWeek_tentosixtyfive : { type: Number },
    oneWeek_abovesixtyfive : { type: Number },
    oneMonth_onetoten : { type: Number },
    oneMonth_tentosixtyfive : { type: Number },
    oneMonth_abovesixtyfive : { type: Number },
    min_amount : {type: Number},
    mid_amount : {type: Number},
    max_amount : {type : Number}
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Rates', ratesSchema);