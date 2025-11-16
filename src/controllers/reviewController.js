const { Review, User, Lawyer, Booking } = require('../models');

// Create Review
exports.createReview = async (req, res) => {
    try {
        const { lawyerId, bookingId, rating, comment } = req.body;
        const userId = req.user.id;
        
        // Check if booking exists and belongs to user
        const booking = await Booking.findOne({
            where: { id: bookingId, userId, lawyerId, status: 'completed' }
        });
        
        if (!booking) {
            return res.status(400).json({ message: 'Invalid booking or booking not completed' });
        }
        
        // Check if review already exists
        const existingReview = await Review.findOne({ where: { bookingId } });
        if (existingReview) {
            return res.status(400).json({ message: 'Review already submitted for this booking' });
        }
        
        const review = await Review.create({
            userId,
            lawyerId,
            bookingId,
            rating,
            comment
        });
        
        // Update lawyer rating
        const reviews = await Review.findAll({ where: { lawyerId } });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Lawyer.update(
            { rating: avgRating.toFixed(1), totalReviews: reviews.length },
            { where: { id: lawyerId } }
        );
        
        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Lawyer Reviews
exports.getLawyerReviews = async (req, res) => {
    try {
        const { lawyerId } = req.params;
        const reviews = await Review.findAll({
            where: { lawyerId },
            include: [{ model: User, attributes: ['name'] }],
            order: [['created_at', 'DESC']]
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Reviews
exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviews = await Review.findAll({
            where: { userId },
            include: [{ model: Lawyer, attributes: ['name', 'specialization'] }],
            order: [['created_at', 'DESC']]
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
