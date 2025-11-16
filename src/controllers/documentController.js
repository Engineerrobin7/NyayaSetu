const { Document } = require('../models');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Upload Document
exports.uploadDocument = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookingId, documentType } = req.body;
        const file = req.file;
        
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const document = await Document.create({
            userId,
            bookingId: bookingId || null,
            fileName: file.originalname,
            fileUrl: file.location,
            fileType: file.mimetype,
            fileSize: file.size,
            documentType
        });
        
        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Documents
exports.getUserDocuments = async (req, res) => {
    try {
        const userId = req.user.id;
        const documents = await Document.findAll({
            where: { userId },
            order: [['created_at', 'DESC']]
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Booking Documents
exports.getBookingDocuments = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const documents = await Document.findAll({
            where: { bookingId },
            order: [['created_at', 'DESC']]
        });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByPk(id);
        
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        
        // Delete from S3
        const key = document.fileUrl.split('.com/')[1];
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }).promise();
        
        await document.destroy();
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Generate Legal Document (AI)
exports.generateDocument = async (req, res) => {
    try {
        const { documentType, details } = req.body;
        
        // This would integrate with an AI service like OpenAI
        // For now, returning a placeholder
        res.json({
            message: 'Document generation feature coming soon',
            documentType,
            details
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
