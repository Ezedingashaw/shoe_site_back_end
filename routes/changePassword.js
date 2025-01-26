const express = require('express');
const dbConnection = require('../services/database');
const { upload } = require('../services/multer');
const bcrypt = require('bcrypt');

const changePassword = express.Router();

changePassword.put('/', upload.none(), (req, res) => {
    const { oldPassword, newPassword, email } = req.body;

    let sql = "SELECT * FROM customer WHERE email = ?";

    dbConnection.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");

        const hashed = result[0].password;

        const verify = await bcrypt.compare(oldPassword, hashed);
        console.log(verify);
        if (!verify) return res.status(400).send("Wrong password");

        const salt = await bcrypt.genSalt(10);
        const newHashed = await bcrypt.hash(newPassword, salt);
        console.log(newHashed)
        sql = "UPDATE customer SET password = ? WHERE email = ?";

        dbConnection.query(sql, [newHashed, email], (err, result) => {
            if (err) return res.status(500).send("Internal Server Error");
            
            return res.status(200).send("Password changed");
        })
    })
});

module.exports = changePassword;