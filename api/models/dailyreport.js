const mongoose = require('mongoose');

const DailyReportSchema = mongoose.Schema({
    user: {type: String},
    articleId: { type: String },
    amount: { type: Number, default: 0 },
    additional_amount: { type: Number, default: 0 },
    interest_paid: { type: Number, default: 0 },
    released_amount: { type: Number, default: 0 }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('DailyReportSchema', DailyReportSchema);