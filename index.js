// app.js
const express = require('express');
const db = require('./config/db');
const userRoute = require('./authregister/userRoute');
const loginRoute = require("./authlogin/loginRoutes");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to the database'));


  
// Register user routes
app.use('/user', userRoute);
app.use("/",loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
