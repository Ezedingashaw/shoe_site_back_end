// accessing environment variables
require('dotenv').config({ path: '../.env' });

// Modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const main = require('./sendMail');
const products = require('../routes/displayProduct');
const product = require('../routes/displayProductsById');
const newProduct = require('../routes/getNewProduct');
const customers = require('../routes/customers');
const addProduct = require('../routes/createProduct');
const registerUser = require('../routes/userRegister');
const userLogin = require('../routes/userLogin');
const changeProfile = require('../routes/changeProfile');
const changePassword = require('../routes/changePassword');

const app = express();
const port = process.env.PORT || 3004;

// setting up static files

app.use('/uploads', express.static(path.join(__dirname, "../images")));
app.use('/profilePicture', express.static(path.join(__dirname, "../profileImage")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes 
app.use('/products', products);
app.use('/product', product);
app.use('/newProduct', newProduct);
app.use('/api/customers', customers);
app.use('/addProduct', addProduct);
app.use('/register', registerUser);
app.use('/login', userLogin);
app.use('/api/changeProfilePicture', changeProfile);
app.use('/api/changePassword', changePassword);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});