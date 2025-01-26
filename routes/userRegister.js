require('dotenv').config('../.env');
const express = require('express');
const dbConnection = require('../services/database');
const { upload } = require('../services/multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = express.Router();

registerUser.post('/', upload.none(), (req, res) => {
    const { userName, name, password, email, terms } = req.body;
    let sql = "SELECT * FROM customer WHERE email = ?";
    const imagePath = "profilePicture/user.jpg";
    
    dbConnection.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        if (result.length > 0) return res.status(400).send("User already registered");

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        sql = "INSERT INTO customer(userName, name, email, password, agrement) VALUES (?, ?, ?, ?, ?)";
        console.log(hashed);
        dbConnection.query(sql, [userName, name, email, hashed, terms], (err, result) => {
            if (err) return res.status(500).send("Internal Server Error");

            sql = "SELECT * FROM customer WHERE email = ?";

            dbConnection.query(sql, [email], (err, result) => {
                if (err) return res.status(500).send("Internal Server Error");
                console.log(result)
                const id = result[0].id;         
                const userName = result[0].userName;
                const email = result[0].email;
                sql = "INSERT INTO profile(id, image) VALUES(?, ?)";

                dbConnection.query(sql, [id, imagePath], (err, result) => {
                    if (err) return res.status(500).send("Internal Server Error");


                const image = `http://localhost:3004/${imagePath}`
                const token = jwt.sign({ id: id, userName: userName, email: email, image: image }, process.env.JWT_KEY);
                console.log(token);
                return res.status(200).header("x-reg-token", token).header("access-control-expose-headers", "x-reg-token").send("Registerd successfully");
              
                })
                
            });
        });
    });
});

module.exports = registerUser;