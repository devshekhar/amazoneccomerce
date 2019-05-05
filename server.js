const express = require('express');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const config =require('./config');
const app =express();
const cors = require('cors');
mongoose.connect(config.database,err=>{
    if(err){
        console.log('errrrrrrrrr'+err);
    }else{
        console.log('connected to database');
    }
})
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cors());
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/account');
const sellerRoutes =require('./routes/seller');
app.use('/api',mainRoutes);
app.use('/api/accounts',userRoutes);
app.use('/api/seller',sellerRoutes);
app.listen(config.port,function(){
    console.log('magic happens on port 3030');
})