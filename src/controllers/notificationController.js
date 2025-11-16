const { getUnreadNotifications, markAsRead } = require('../services/notificationService');
const Notification = require('../models/Notification');

// Get User Notifications
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.findAll({
            where: { userId },
            order: [['created_at', 'DESC']],
            limit: 50
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Unread Notifications
exports.getUnreadNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await getUnreadNotifications(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark Notification as Read
exports.markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        await markAsRead(id);
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark All as Read
exports.markAllRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await Notification.update(
            { isRead: true },
            { where: { userId, isRead: false } }
        );
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
