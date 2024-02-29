// config/db.js
const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_uri
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
);

module.exports = mongoose.connection;
