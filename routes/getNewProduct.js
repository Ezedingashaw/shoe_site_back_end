const express = require('express');
const dbConnection = require('../services/database');

const newProduct = express.Router();

newProduct.get('/', (req, res) => {
    let sql = 'SELECT * FROM products ORDER BY date DESC LIMIT 1';
    
    dbConnection.query(sql, (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        console.log(result)
        const product = result.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            offerPrice: product.offer_price,
            imageOne: `http://localhost:3004/${product.image_one}`,
            imageTwo: `http://localhost:3004/${product.image_two}`,
            imageThree: `http://localhost:3004/${product.image_three}`,
            imageFour: `http://localhost:3004/${product.image_four}`
        }));
        res.status(200).send(product);
    });
});

module.exports = newProduct;