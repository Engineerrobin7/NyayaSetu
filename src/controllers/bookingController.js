const { Booking, Lawyer, User } = require('../models');
const { createNotification } = require('../services/notificationService');
const { sendBookingConfirmation } = require('../services/emailService');

exports.createBooking = async (req, res) => {
    try {
        const { lawyerId, date, startTime, endTime, consultationType, notes, amount } = req.body;
        const userId = req.user.id;

        if (!lawyerId || !date || !amount) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newBooking = await Booking.create({
            userId,
            lawyerId,
            date,
            startTime,
            endTime,
            consultationType,
            notes,
            amount,
            status: 'pending',
            paymentStatus: 'pending'
        });

        // Get user and lawyer details
        const user = await User.findByPk(userId);
        const lawyer = await Lawyer.findByPk(lawyerId);

        // Send notification
        await createNotification(
            userId,
            'Booking Created',
            `Your booking with ${lawyer.name} has been created`,
            'booking',
            newBooking.id
        );

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.findAll({
            where: { userId },
            include: [{ model: Lawyer, attributes: ['name', 'specialization', 'profileImage'] }],
            order: [['date', 'DESC']]
        });

        res.json({ bookings });
    } catch (error) {
        console.error("❌ Fetching Bookings Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getLawyerBookings = async (req, res) => {
    try {
        const lawyerId = req.user.id;

        const bookings = await Booking.findAll({
            where: { lawyerId },
            include: [{ model: User, attributes: ['name', 'email', 'phone'] }],
            order: [['date', 'DESC']]
        });

        res.json({ bookings });
    } catch (error) {
        console.error("❌ Fetching Bookings Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.update({ status });

        // Send notification
        await createNotification(
            booking.userId,
            'Booking Status Updated',
            `Your booking status has been updated to ${status}`,
            'booking',
            booking.id
        );

        res.json({ message: 'Booking status updated', booking });
    } catch (error) {
        console.error("❌ Update Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.update({ status: 'cancelled' });

        await createNotification(
            booking.userId,
            'Booking Cancelled',
            'Your booking has been cancelled',
            'booking',
            booking.id
        );

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error("❌ Cancel Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
