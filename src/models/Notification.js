const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }, // booking, payment, message, reminder
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    relatedId: { type: DataTypes.UUID, allowNull: true }, // booking id, payment id, etc.
}, {
    timestamps: true,
    underscored: true
});

module.exports = Notification;
