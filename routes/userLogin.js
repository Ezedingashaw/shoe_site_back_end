require('dotenv').config({ path: '../.env' });
const express = require('express');
const dbConnection = require('../services/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { upload } = require('../services/multer');

const userLogin = express.Router();

userLogin.post('/', upload.none(), (req, res) => {
    const { userName: email, password } = req.body;

    let sql = "SELECT * FROM customer INNER JOIN profile ON customer.id = profile.id WHERE email = ?";
    
    dbConnection.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        if (result.length === 0) return res.status(400).send("User not found");
        const hashed = result[0].password;
        const id = result[0].id;
        const userName = result[0].userName;
        const email = result[0].email;
        const image = result[0].image;
        const imagePath = `http://localhost:3004/${image}`

        const validatePassword = await bcrypt.compare(password, hashed)
        if (!validatePassword) return res.status(400).send("Wrong password or email")
        
        const token = jwt.sign({ id: id, userName: userName, email: email, image: imagePath }, process.env.JWT_KEY);
        return res.status(200).send(token);
    });
});

module.exports = userLogin;