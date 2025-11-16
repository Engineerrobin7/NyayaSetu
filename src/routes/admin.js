const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', adminController.adminLogin);
router.get('/stats', adminAuth, adminController.getDashboardStats);
router.get('/users', adminAuth, adminController.getAllUsers);
router.get('/lawyers', adminAuth, adminController.getAllLawyers);
router.put('/lawyers/:id/verify', adminAuth, adminController.verifyLawyer);
router.put('/lawyers/:id/toggle-status', adminAuth, adminController.toggleLawyerStatus);
router.get('/bookings', adminAuth, adminController.getAllBookings);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.delete('/lawyers/:id', adminAuth, adminController.deleteLawyer);

module.exports = router;
