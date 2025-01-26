const express = require('express');
const dbConnection = require('../services/database');
const { uploadFields } = require('../services/multer');

const addProduct = express.Router();

addProduct.post('/', uploadFields, (req, res) => {
    const { title, price, offerPrice } = req.body;
    const imageOnePath = `uploads/${req.files['imageOne'][0].filename}`;
    const imageTwoPath = `uploads/${req.files['imageTwo'][0].filename}`;
    const imageThreePath = `uploads/${req.files['imageThree'][0].filename}`;
    const imageFourPath = `uploads/${req.files['imageFour'][0].filename}`;

    let sql = 'INSERT INTO products(title, price, offer_price, image_one, image_two, image_three, image_four) VALUES(?, ?, ?, ?, ?, ?, ?)';

    dbConnection.query(sql, [title, price, offerPrice, imageOnePath, imageTwoPath, imageThreePath, imageFourPath], async function (err, result) {
        if (err) return res.status(500).send("Internal Server Error");

        try {
            await main();

        } catch (error) {
            
        }
        res.status(200).send("Product created");
       
    });
});

module.exports = addProduct;