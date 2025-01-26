const express = require('express');
const dbConnection = require('../services/database');

const customers = express.Router();

customers.get('/', (req, res) => {
    let sql = "SELECT * FROM customer";

    dbConnection.query(sql, (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        const customers = result.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email
        }));
        res.send(customers);
    });
});

module.exports = customers;