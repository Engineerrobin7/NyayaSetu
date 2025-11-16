const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { userAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/documents');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Local file storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}_${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!'));
        }
    }
});

router.post('/upload', userAuth, upload.single('document'), documentController.uploadDocument);
router.get('/user', userAuth, documentController.getUserDocuments);
router.get('/booking/:bookingId', userAuth, documentController.getBookingDocuments);
router.delete('/:id', userAuth, documentController.deleteDocument);
router.post('/generate', userAuth, documentController.generateDocument);

module.exports = router;
