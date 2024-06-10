const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
    try {
        res.send({
            status: 'success',
            message: 'File uploaded successfully',
            filename: req.file.filename
        });
    } catch (err) {
        res.sendStatus(400);
    }
});

module.exports = router