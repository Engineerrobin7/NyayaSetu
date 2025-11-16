const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { userAuth } = require('../middleware/auth');

router.get('/', userAuth, notificationController.getNotifications);
router.get('/unread', userAuth, notificationController.getUnreadNotifications);
router.put('/:id/read', userAuth, notificationController.markNotificationRead);
router.put('/read-all', userAuth, notificationController.markAllRead);

module.exports = router;
