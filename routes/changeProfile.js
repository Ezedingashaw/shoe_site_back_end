require('dotenv').config('../.env');
const express = require('express');
const dbConnection = require('../services/database');
const { uploadProfile } = require('../services/multer');
const jwt = require('jsonwebtoken');

const changeProfile = express.Router();

changeProfile.put('/', uploadProfile.single('image'), (req, res) => {
    const imagePath = `profilePicture/${req.file.filename}`;
    const { id } = req.body;

    console.log(imagePath, id);
    let sql = `UPDATE profile SET image = ? WHERE id =${id}`;

    dbConnection.query(sql, [imagePath], (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        sql = "SELECT * FROM customer INNER JOIN profile ON customer.id = profile.id"

        dbConnection.query(sql, (err, result) => {
            if (err) return res.status(500).send("Internal Server Error");

        const id = result[0].id;
        const userName = result[0].userName;
        const email = result[0].email;
        const image = result[0].image;
        const imagePath = `http://localhost:3004/${image}`

            const token = jwt.sign({ id: id, userName: userName, email: email, image: imagePath }, process.env.JWT_KEY);
            return res.status(200).send(token);
        });
    });
});

module.exports = changeProfile;