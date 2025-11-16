const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const { lawyerAuth } = require('../middleware/auth');

router.post('/', lawyerAuth, availabilityController.setAvailability);
router.get('/lawyer/:lawyerId', availabilityController.getAvailability);
router.put('/:id', lawyerAuth, availabilityController.updateAvailability);
router.delete('/:id', lawyerAuth, availabilityController.deleteAvailability);

module.exports = router;
