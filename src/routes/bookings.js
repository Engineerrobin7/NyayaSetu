const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { userAuth, lawyerAuth, combinedAuth } = require('../middleware/auth');

router.post('/', userAuth, bookingController.createBooking);
router.get('/user', userAuth, bookingController.getUserBookings);
router.get('/lawyer', lawyerAuth, bookingController.getLawyerBookings);
router.put('/:id/status', combinedAuth, bookingController.updateBookingStatus);
router.put('/:id/cancel', userAuth, bookingController.cancelBooking);

module.exports = router;
