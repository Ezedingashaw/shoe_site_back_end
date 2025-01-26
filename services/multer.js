const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../profileimage'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const uploadProfile = multer({ storage: storage2 });
const uploadFields = upload.fields([
    { name: "imageOne", maxCount: 1 },
    { name: "imageTwo", maxCount: 1 },
    { name: "imageThree", maxCount: 1 },
    { name: "imageFour", maxCount: 1 }
]);

module.exports = {
    upload,
    uploadProfile,
    uploadFields
}