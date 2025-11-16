const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin, User, Lawyer, Booking, Review } = require('../models');
const { Op } = require('sequelize');

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });
        
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalLawyers = await Lawyer.count();
        const totalBookings = await Booking.count();
        const pendingBookings = await Booking.count({ where: { status: 'pending' } });
        const completedBookings = await Booking.count({ where: { status: 'completed' } });
        const totalRevenue = await Booking.sum('amount', { where: { paymentStatus: 'paid' } });
        
        res.json({
            totalUsers,
            totalLawyers,
            totalBookings,
            pendingBookings,
            completedBookings,
            totalRevenue: totalRevenue || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Lawyers
exports.getAllLawyers = async (req, res) => {
    try {
        const lawyers = await Lawyer.findAll({
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });
        res.json(lawyers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify Lawyer
exports.verifyLawyer = async (req, res) => {
    try {
        const { id } = req.params;
        await Lawyer.update({ isVerified: true }, { where: { id } });
        res.json({ message: 'Lawyer verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Toggle Lawyer Active Status
exports.toggleLawyerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const lawyer = await Lawyer.findByPk(id);
        await lawyer.update({ isActive: !lawyer.isActive });
        res.json({ message: 'Lawyer status updated', isActive: lawyer.isActive });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] },
                { model: Lawyer, attributes: ['name', 'specialization'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Lawyer
exports.deleteLawyer = async (req, res) => {
    try {
        const { id } = req.params;
        await Lawyer.destroy({ where: { id } });
        res.json({ message: 'Lawyer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
