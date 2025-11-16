const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { userAuth } = require('../middleware/auth');

router.post('/', userAuth, reviewController.createReview);
router.get('/lawyer/:lawyerId', reviewController.getLawyerReviews);
router.get('/user', userAuth, reviewController.getUserReviews);

module.exports = router;
