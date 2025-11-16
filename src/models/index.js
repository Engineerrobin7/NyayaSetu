const User = require('./User');
const Lawyer = require('./Lawyer');
const Booking = require('./Booking');
const Chat = require('./Chat');
const Review = require('./Review');
const Availability = require('./Availability');
const Notification = require('./Notification');
const Admin = require('./Admin');
const Document = require('./Document');

// Define relationships
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Lawyer.hasMany(Booking, { foreignKey: 'lawyerId' });
Booking.belongsTo(Lawyer, { foreignKey: 'lawyerId' });

User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

Lawyer.hasMany(Chat, { foreignKey: 'lawyerId' });
Chat.belongsTo(Lawyer, { foreignKey: 'lawyerId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Lawyer.hasMany(Review, { foreignKey: 'lawyerId' });
Review.belongsTo(Lawyer, { foreignKey: 'lawyerId' });

Booking.hasOne(Review, { foreignKey: 'bookingId' });
Review.belongsTo(Booking, { foreignKey: 'bookingId' });

Lawyer.hasMany(Availability, { foreignKey: 'lawyerId' });
Availability.belongsTo(Lawyer, { foreignKey: 'lawyerId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Document, { foreignKey: 'userId' });
Document.belongsTo(User, { foreignKey: 'userId' });

Booking.hasMany(Document, { foreignKey: 'bookingId' });
Document.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = {
    User,
    Lawyer,
    Booking,
    Chat,
    Review,
    Availability,
    Notification,
    Admin,
    Document
};
