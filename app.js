const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const articleRoutes = require('./api/routes/articles');
const userRoutes = require('./api/routes/users');
const ratesRoutes = require('./api/routes/rates');
const userActivities = require('./api/routes/useractivity')
const dailyReports = require('./api/routes/daily_report')

mongoose.connect('mongodb+srv://chamara_data:casperbuster@chamara-a25mo.gcp.mongodb.net/gold_shop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);
app.use('/rates', ratesRoutes);
app.use('/activitylog', userActivities);
app.use('/reports', dailyReports);

app.use((req, res, next) =>{
    const error = new Error('Something went wrong');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    })
});


module.exports = app;