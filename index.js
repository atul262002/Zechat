// app.js
const express = require('express');
const db = require('./config/db');
const userRoute = require('./auth/auth.Route');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to the database'));


app.use('/user', userRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
