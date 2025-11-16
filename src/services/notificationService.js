const Notification = require('../models/Notification');

const createNotification = async (userId, title, message, type, relatedId = null) => {
    try {
        const notification = await Notification.create({
            userId,
            title,
            message,
            type,
            relatedId
        });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};

const getUnreadNotifications = async (userId) => {
    return await Notification.findAll({
        where: { userId, isRead: false },
        order: [['created_at', 'DESC']]
    });
};

const markAsRead = async (notificationId) => {
    return await Notification.update(
        { isRead: true },
        { where: { id: notificationId } }
    );
};

module.exports = {
    createNotification,
    getUnreadNotifications,
    markAsRead
};
