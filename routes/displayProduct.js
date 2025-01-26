const express = require('express');
const dbConnection = require('../services/database');

const products = express.Router()

products.get('/', (req, res) => {
    let sql = 'SELECT * FROM products'

    dbConnection.query(sql, (err, result) => {
        if (err) throw err;

        const products = result.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            offerPrice: product.offer_price,
            imageOne: `http://localhost:3004/${product.image_one}`,
            imageTwo: `http://localhost:3004/${product.image_two}`,
            imageThree: `http://localhost:3004/${product.image_three}`,
            imageFour: `http://localhost:3004/${product.image_four}`
        }));

        res.send(products);

    });
});

module.exports = products;