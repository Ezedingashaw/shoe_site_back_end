const express = require('express');
const dbConnection = require('../services/database');

const product = express.Router();

product.get('/:id', (req, res) => {
    
    const id = req.params.id;
    let sql = 'SELECT * FROM products WHERE id = ? ';

    dbConnection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        if (result.length === 0) return res.status(400).send("No records found");

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
        setTimeout(() => {
            res.status(200).send(product);
        }, 3000);
    });
});

module.exports = product;