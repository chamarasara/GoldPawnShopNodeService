const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    //articleId: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_name: { type: String, required: true, unique:true },
    password: {type: String, required: true},
    user_role: {type : Number, required: true},    
});

module.exports = mongoose.model('Users', usersSchema);