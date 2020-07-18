const mongoose = require('mongoose');

const userActivitySchema = mongoose.Schema({
    //articleId: mongoose.Schema.Types.ObjectId,
    user: { type: String },
    articleId: { type: String },
    phone_number: { type: Number},
    amount: { type: Number },
    additional_amount: { type: Number},
    interest_paid: { type: Number  },
    article_status: { type: String  },
    released_amount: { type: Number}
},
{
        timestamps: true
});

module.exports = mongoose.model('userActivity', userActivitySchema);