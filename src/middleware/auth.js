const jwt = require('jsonwebtoken');
const { User, Lawyer, Admin } = require('../models');

// User Authentication
exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

// Lawyer Authentication
exports.lawyerAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'lawyer') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        const lawyer = await Lawyer.findByPk(decoded.id);
        
        if (!lawyer) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        req.user = lawyer;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

// Admin Authentication
exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        const admin = await Admin.findByPk(decoded.id);
        
        if (!admin) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        req.user = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

// Combined Auth (User or Lawyer)
exports.combinedAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        let user;
        if (decoded.role === 'lawyer') {
            user = await Lawyer.findByPk(decoded.id);
        } else {
            user = await User.findByPk(decoded.id);
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        req.user = user;
        req.userRole = decoded.role || 'user';
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};
