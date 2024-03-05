const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongodb_uri)
    // ,{useNewUrlParser:true,useUnifiedTopology:true})
    .catch((e)=>{
     console.log("connection error "+ e.message)
    })
    
module.exports = mongoose.connection;
