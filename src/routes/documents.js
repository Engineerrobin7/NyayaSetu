const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { userAuth } = require('../middleware/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `documents/${Date.now()}_${file.originalname}`);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/upload', userAuth, upload.single('document'), documentController.uploadDocument);
router.get('/user', userAuth, documentController.getUserDocuments);
router.get('/booking/:bookingId', userAuth, documentController.getBookingDocuments);
router.delete('/:id', userAuth, documentController.deleteDocument);
router.post('/generate', userAuth, documentController.generateDocument);

module.exports = router;
