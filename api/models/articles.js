const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    //articleId: mongoose.Schema.Types.ObjectId,
    userId: { type: String },
    articleId: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    address: { type: String },
    id_number: { type: String },
    phone_number: { type: Number },
    amount: { type: Number },
    additional_amount: { type: Number },
    amountChangedDate : { type: String},
    total_amount: { type: Number },
    weight: { type: Number },
    duration: { type: String },
    addtional_details: { type: String },
    interest_paid: { type: Number, default: 0 },
    interestPaidDate: { type: String },
    speacial_circumstances: { type: String, default: " - " },
    released_date: { type: String, default: "-" },
    released_amount: { type: Number, default: 0 },
    released_final_date: { type: String},
    date: String,
    color: { type: Number },
    final_date: { type: String },
    article_status: { type: String, default: "Active" },
    previous_article_id: {type: String,default: "-"},
    interest: { type: String}
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Articles', articleSchema);